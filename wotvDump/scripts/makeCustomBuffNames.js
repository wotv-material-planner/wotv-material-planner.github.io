const fs = require('fs');

const artifacts = require('../data/Artifact.json');
const skills = require('../data/Skill.json');
const buffs = require('../data/Buff.json');
const artifactNames = require('../en/ArtifactName.json');
const customBuffNames = require('../CustomBuffNames.json');

const buffTexts = {
    BUFF_LW_SLASH: 'Slash Att',
    BUFF_LW_BLOW: 'Strike Att',
    BUFF_LW_SPEAR: 'Pierce Att',
    BUFF_LW_SHOOT: 'Missle Att',
    BUFF_LW_MAGIC: 'Magic Att',
    BUFF_LW_DF_SLASH: 'Slash Res',
    BUFF_LW_DF_BLOW: 'Strike Res',
    BUFF_LW_DF_SPEAR: 'Pierce Res',
    BUFF_LW_DF_SHOOT: 'Missile Res',
    BUFF_LW_DF_MAGIC: 'Magic Res',
    BUFF_LW_PIERCESLASH: 'Magic Att Res Piercing',
    BUFF_LW_PIERCEBLOW: 'Magic Att Res Piercing',
    BUFF_LW_PIERCESPEAR: 'Magic Att Res Piercing',
    BUFF_LW_PIERCESHOOT: 'Magic Att Res Piercing',
    BUFF_LW_PIERCEMAGIC: 'Magic Att Res Piercing',
    BUFF_LW_AVOID: 'Evade',
};

const uniqueBuffs = artifacts.items.reduce((allBuffs, artifact) => {
    if (artifact.skl5) {
        artifact.skl5.forEach((skill) => {
            const skillObj = skills.items.find((item) => {
                return item.iname === skill;
            });

            if (skillObj.s_buffs) {
                skillObj.s_buffs.forEach((buff) => {
                    const buffObj = buffs.items.find((item) => {
                        return item.iname === buff;
                    });

                    if (customBuffNames[buff]) {
                        allBuffs[buff] = customBuffNames[buff];
                    } else {
                        const buffText = Object.keys(buffTexts).find((text) => {
                            return buff.startsWith(text);
                        });

                        if (buffText) {
                            allBuffs[buff] = `${buffTexts[buffText]} ${buffObj.val11}`;
                        } else {
                            const artifactNameObj = artifactNames.infos.find((info) => {
                                return artifact.iname === info.key;
                            });
    
                            allBuffs[buff] = '';
    
                            if (artifactNameObj) {
                                if (buffObj.val1) {
                                    allBuffs[buff] += `${artifactNameObj.value} buff 1 ${buffObj.val11}`;
                                } else {
                                    allBuffs[buff] += `${artifactNameObj.value} buff`;
                                }

                                if (buffObj.val2) {
                                    allBuffs[buff] += `,${artifactNameObj.value} buff 2 ${buffObj.val21}`;
                                }

                                if (buffObj.val3) {
                                    allBuffs[buff] += `,${artifactNameObj.value} buff 3 ${buffObj.val31}`;
                                }

                                if (buffObj.val4) {
                                    allBuffs[buff] += `,${artifactNameObj.value} buff 4 ${buffObj.val41}`;
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    return allBuffs;
}, {});

fs.writeFileSync('./CustomBuffNames.json', JSON.stringify(uniqueBuffs));