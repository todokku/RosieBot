const JZZ = require('jzz');

module.exports = {
    sfxBadumts: () => triggerMidiNote(SFX.badumts),
    sfxBingit: () => triggerMidiNote(SFX.bingit),
    sfxFup: () => triggerMidiNote(SFX.fup),
    sfxDoh: () => triggerMidiNote(SFX.doh),
    sfxAllright: () => triggerMidiNote(SFX.allright),
    sfxDuhDuhDuuuh: () => triggerMidiNote(SFX.duhDuhDuuuh),
    sfxBye: () => triggerMidiNote(SFX.bye),
    sfxJustDoIt: () => triggerMidiNote(SFX.justDoIt),
    sfxDunDun: () => triggerMidiNote(SFX.dunDun),
    sfxHeadshot: () => triggerMidiNote(SFX.headshot),
    sfxDrumroll: () => triggerMidiNote(SFX.drumroll),
    sfxInception: () => triggerMidiNote(SFX.inception),
    sfxMCLevelUp: () => triggerMidiNote(SFX.mCLevelUp),
    sfxMCVillager: () => triggerMidiNote(SFX.mCVillager),
    sfxMario1up: () => triggerMidiNote(SFX.mario1up),
    sfxFinishHim: () => triggerMidiNote(SFX.finishHim),
    sfxDoItlive: () => triggerMidiNote(SFX.doItlive),
    sfxApplause: () => triggerMidiNote(SFX.applause),
    sfxAirhorn: () => triggerMidiNote(SFX.airhorn),
    sfxLaugh: () => triggerMidiNote(SFX.laugh),
    sfxDingDong: () => triggerMidiNote(SFX.dingDong),
    sfxSonic: () => triggerMidiNote(SFX.sonic),
    sfxInconceivable: () => triggerMidiNote(SFX.inconceivable),
    sfxMighty: () => triggerMidiNote(SFX.mighty),
    sfxKidding: () => triggerMidiNote(SFX.kidding),
    sfx7Days: () => triggerMidiNote(SFX.thering7days),
    sfxDing: () => triggerMidiNote(SFX.ding),
    sfxPushIt: () => triggerMidiNote(SFX.pushit),
    sfxHowl: () => triggerMidiNote(SFX.howl),
    sfxRewrite: () => triggerMidiNote(SFX.rewrite),
    sfxKickAss: () => triggerMidiNote(SFX.kickass),
    sfxExplode: () => triggerMidiNote(SFX.explode),
    sfxLoveBye: () => triggerMidiNote(SFX.lovebye),
    sfxGoat: () => triggerMidiNote(SFX.goat),
    sfxFindout: () => triggerMidiNote(SFX.findout),
    sfxAsIf: () => triggerMidiNote(SFX.asif),
    sfxUnexceptable: () => triggerMidiNote(SFX.unexceptable),
    sfxBiteMetal: () => triggerMidiNote(SFX.bitemetal),
    sfxNasty: () => triggerMidiNote(SFX.nasty),
    sfxHowDare: () => triggerMidiNote(SFX.howdare),
    sfxAttention: () => triggerMidiNote(SFX.attention),
    sfxFBI:()=> triggerMidiNote(SFX.FBI),
    sfxTyping:()=>triggerMidiNote(SFX.typing),
    sfxWholeLotta:()=>triggerMidiNote(SFX.wholelotta),
    sfxYoureWelcome:()=>triggerMidiNote(SFX.yourewelcome),
    sfxBob:()=>triggerMidiNote(SFX.bob),
    sfxVBIP:()=>triggerMidiNote(SFX.vbip),
    triggerMidi: triggerMidi
}

const SFX = {
    badumts: 57,
    bingit: 58,
    fup: 59,
    doh: 60,
    allright: 61,
    duhDuhDuuuh: 62,
    bye: 63,
    justDoIt: 64,
    dunDun: 65,
    headshot: 66,
    drumroll: 67,
    inception: 68,
    mCLevelUp: 69,
    mCVillager: 70,
    mario1up: 71,
    finishHim: 72,
    doItlive: 73,
    applause: 74,
    airhorn: 75,
    laugh: 76,
    dingDong: 77,
    sonic: 78,
    inconceivable: 79,
    mighty: 80,
    kidding: 81,
    thering7days: 82,
    ding: 83,
    pushit: 84,
    howl: 85,
    rewrite: 86,
    kickass: 87,
    explode: 88,
    lovebye: 89,
    goat: 90,
    findout: 91,
    asif: 92,
    unexceptable: 93,
    bitemetal: 94,
    nasty: 95,
    howdare: 96,
    attention: 97,
    FBI: 98,
    typing: 99,
    wholelotta:100,
    yourewelcome:101,
    bob:102,
    vbip:103
}

function triggerMidiNote(note) {
    triggerMidi(0x90, note, 127);
}

function triggerMidi(...message) {
    JZZ().or('Cannot start MIDI engine!')
        .openMidiOut(1).or('Cannot open MIDI Out port!')
        .send(message);
}
