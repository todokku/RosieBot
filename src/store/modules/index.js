const modulesCache = {}
const storeData = { modules: {} }

/**
 * Converts a string to camelCase
 * @param {String} str String to make camel case
 */
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

; (
    /**
     * dynamically loads all Vuex module files in the current folder abd
     * subfolders. Modules must end with `.module.js`.
     * Namespaces are automatically generated based on the name of the file:
     * the .module.js is removed as well as any period, the result is camelcased.
     */
    function updateModules() {

        // Allow us to dynamically require all Vuex module files.
        // https://webpack.js.org/guides/dependency-management/#require-context
        const requireModule = require.context(
            // Search for files in the current directory.
            '.',
            // Search for files in subdirectories.
            true,
            /^((?!index|\.unit\.).)*\.module\.js$/
        )

        // For every Vuex module...
        requireModule.keys().forEach((fileName) => {
            const moduleDefinition =
                requireModule(fileName).default || requireModule(fileName)

            // Skip the module during hot reload if it refers to the
            // same module definition as the one we have cached.
            if (modulesCache[fileName] === moduleDefinition) return

            // Update the module cache, for efficient hot reloading.
            modulesCache[fileName] = moduleDefinition

            // Get the module path as an array.
            const modulePath = fileName
                // Remove the "./" from the beginning.
                .replace(/^\.\//, '')
                // Remove the file extension from the end.
                .replace(/\.\w+$/, '')
                .replace(/\.module$/, '')
                .replace(/\.+/, ' ')
                // Split nested modules into an array path.
                .split(/\//)
                // lowecase all module namespaces and names.
                .map(x => camelize(x));

            // Get the modules object for the current path.
            const { modules } = getNamespace(storeData, modulePath)

            // Add the module to our modules object.
            modules[modulePath.pop()] = {
                // Modules are namespaced by default.
                namespaced: true,
                ...moduleDefinition,
            }
        })

        // If the environment supports hot reloading...
        if (module.hot) {
            // Whenever any Vuex module is updated...
            module.hot.accept(requireModule.id, () => {
                // Update `storeData.modules` with the latest definitions.
                updateModules()
                // Trigger a hot update in the store.
                require('../store').default.hotUpdate({ modules: storeData.modules })
            })
        }
    })()

// Recursively get the namespace of a Vuex module, even if nested.
function getNamespace(subtree, path) {
    if (path.length === 1) return subtree

    const namespace = path.shift()
    subtree.modules[namespace] = {
        modules: {},
        namespaced: true,
        ...subtree.modules[namespace],
    }
    return getNamespace(subtree.modules[namespace], path)
}

export default storeData.modules