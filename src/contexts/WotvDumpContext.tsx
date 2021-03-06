import * as React from 'react';
import {createContext} from 'react';
import * as ArtifactGrow_en from '../../wotvDump/en/ArtifactGrow.json';
import * as ArtifactRandLot from '../../wotvDump/data/ArtifactRandLot.json';
import * as Grow from '../../wotvDump/data/Grow.json';
import * as Buff from '../../wotvDump/data/Buff.json';
import * as Buff_en from '../../wotvDump/en/Buff.json';
import * as Skill from '../../wotvDump/data/Skill.json';
import * as SkillName_en from '../../wotvDump/en/SkillName.json';
import * as ArtifactName_en from '../../wotvDump/en/ArtifactName.json';
import * as Artifact from '../../wotvDump/data/Artifact.json';
import * as ArtifactGrowItem from '../../wotvDump/data/ArtifactGrowItem.json';
import * as ArtifactCategory_en from '../../wotvDump/en/ArtifactCategory.json';
import * as ArtifactRecipe from '../../wotvDump/data/ArtifactRecipe.json';
import * as ArtifactAwake from '../../wotvDump/data/ArtifactAwake.json';
import * as Item from '../../wotvDump/data/Item.json';
import * as ItemName_en from '../../wotvDump/en/ItemName.json';
import * as CustomBuffNames from '../../wotvDump/CustomBuffNames.json';

export interface DumpContext {
    typeMap: object;
    growthMap: object;
    buffMap: object;
    buffNameList: object[];
    skillMap: object;
    skillNameMap: object;
    artifactNameMap: object;
    artifactMap: object;
    artifactListByCat: ArtifactListItem[][];
    sealGrowthMap: object;
    artifactCategoryList: Category[];
    artifactRecipeMap: object;
    artifactAwakeMap: object;
    itemMap: object;
    itemNameMap: object;
    itemBookMap: IngredientMap;
    itemMaterialMap: IngredientMap;
    itemRecipeMap: IngredientMap;
    customBuffNames: object;
};

export interface Ingredient {
    iname: string;
    name: string;
    type?: number;
    rare: number;
    steal?: number;
    coin?: number;
    ac?: number;
    mc?: number;
    buy?: number;
    sell: number;
    icon?: string;
}

export interface IngredientMap {
    [iname: string]: Ingredient;
}

interface Stat {
    label: string;
    value: string;
    passText?: string;
};

interface LotGrowMap {
    grow1: string;
    gwait1: number;
    grow2?: string;
    gwait2?: number;
    grow3?: string;
    gwait3?: string;
};

interface ArtifactRandLotItem {
    iname: string;
    lot: LotGrowMap[];
};

export interface TypeOption {
    label: string;
    value: string;
}

interface TypeMap {
    [iname: string]: TypeOption[];
}

export const stats: Stat[] = [
    {
        label: "HP",
        value: "hp",
        passText: "+15%"
    }, 
    {
        label: "TP",
        value: "mp"
    }, 
    {
        label: "AP",
        value: "ap"
    }, 
    {
        label: "ATK",
        value: "atk",
        passText: "+15%"
    }, 
    {
        label: "DEF",
        value: "def",
        passText: "+3%"
    }, 
    {
        label: "MAG",
        value: "mag",
        passText: "+15%"
    }, 
    {
        label: "SPR",
        value: "mnd",
        passText: "+3%"
    }, 
    {
        label: "ACC",
        value: "hit",
        passText: "+3%"
    }, 
    {
        label: "DEX",
        value: "dex"
    }, 
    {
        label: "AGI",
        value: "spd"
    }, 
    {
        label: "EVA",
        value: "avd",
        passText: "+3%"
    }, 
    {
        label: "CRIT",
        value: "crt",
        passText: "+3%"
    }, 
    {
        label: "CRIT E",
        value: "crta"
    }
];

export const rareMap = {
    0: 'N',
    1: 'R',
    2: 'SR',
    3: 'MR',
    4: 'UR',
};

const getTypeMap = (): TypeMap => {
    const typeMap: TypeMap = {};
    const typeNameMap = {};

    ArtifactGrow_en.infos.forEach((info) => {
        typeNameMap[info.key] = info.value;
    });
    
    ArtifactRandLot.items.forEach((item: ArtifactRandLotItem) => {
        typeMap[item.iname] = [];
    
        if (item.lot[0].grow1) {
            typeMap[item.iname].push({
                label: typeNameMap[item.lot[0].grow1],
                value: item.lot[0].grow1
            });
        }

        if (item.lot[0].grow2) {
            typeMap[item.iname].push({
                label: typeNameMap[item.lot[0].grow2],
                value: item.lot[0].grow2
            });
        }

        if (item.lot[0].grow3) {
            typeMap[item.iname].push({
                label: typeNameMap[item.lot[0].grow3],
                value: item.lot[0].grow3
            });
        }
    });

    return typeMap;
};

const getGrowthMap = () => {
    const growthMap = {};

    Grow.items.forEach((item) => {
        growthMap[item.type] = {
            curve: item.curve,
            rstatus : item.rstatus
        }
    });

    return growthMap;
};

const getBuffMap = () => {
    const buffMap = {};

    Buff.items.forEach((item) => {
        buffMap[item.iname] = item;
    });

    return buffMap;
};

const getBuffNameList = () => {
    const buffNameList = Buff_en.infos;

    // modifications
    // remove first 7
    for (let i = 0; i < 7; i++) {
        buffNameList.splice(0,1);
    }
    // insert 16 dummy
    for (let i = 0; i < 16; i++) {
        buffNameList.splice(5,0,null);
    }
    // insert 12 dummy
    for (let i = 0; i < 11; i++) {
        buffNameList.splice(30,0,null);
    }
    // insert 10 dummy
    for (let i = 0; i < 10; i++) {
        buffNameList.splice(51,0,null);
    }
    // insert 4 dummy
    for (let i = 0; i < 4; i++) {
        buffNameList.splice(66,0,null);
    }
    // insert 10 dummy
    for (let i = 0; i < 10; i++) {
        buffNameList.splice(71,0,null);
    }
    // insert 1 dummy
    for (let i = 0; i < 1; i++) {
        buffNameList.splice(94,0,null);
    }
    // insert 1 dummy
    for (let i = 0; i < 1; i++) {
        buffNameList.splice(118,0,null);
    }
    // insert 10 dummy
    for (let i = 0; i < 10; i++) {
        buffNameList.splice(124,0,null);
    }
    // insert 4 dummy
    for (let i = 0; i < 4; i++) {
        buffNameList.splice(135,0,null);
    }
    // insert 8 dummy
    for (let i = 0; i < 8; i++) {
        buffNameList.splice(143,0,null);
    }
    // insert 10 dummy
    for (let i = 0; i < 10; i++) {
        buffNameList.splice(160,0,null);
    }
    // insert 6 dummy
    for (let i = 0; i < 6; i++) {
        buffNameList.splice(173,0,null);
    }
    // remove 22 Debuff Res
    for (let i = 0; i < 22; i++) {
        buffNameList.splice(183,1);
    }
    // insert 6 dummy
    for (let i = 0; i < 6; i++) {
        buffNameList.splice(184,0,null);
    }

    return buffNameList;
};

const getSkillMap = () => {
    const skillMap = {};

    Skill.items.forEach((item) => {
        skillMap[item.iname] = item;
    });

    return skillMap;
};

const getSkillNameMap = () => {
    const skillNameMap = {};

    SkillName_en.infos.forEach((info) => {
        if (info.value) {
            skillNameMap[info.key] = info.value;
        }
    });

    return skillNameMap;
};

const getArtifactNameMap = () => {
    const artifactNameMap = {};

    ArtifactName_en.infos.forEach((info) => {
        artifactNameMap[info.key] = info.value;
    });

    return artifactNameMap;
};

const getArtifactMap = () => {
    const artifactMap = {};
    const artifactNameMap = getArtifactNameMap();

    Artifact.items.forEach((item) => {
        // blacklisted items
        if (item.iname.match(/AF_\w+_2/) && 
                (artifactNameMap[item.iname] == null || !artifactNameMap[item.iname].match(/.+\+2/))
            ) {
            return;
        }

        if (item.type >= 0) {
            if (artifactNameMap[item.iname]) {
                artifactMap[item.iname] = item;
                artifactMap[item.iname].name = artifactNameMap[item.iname] ? artifactNameMap[item.iname] : item.iname;
            }
        }
    });

    return artifactMap;
};

export interface ArtifactListItem {
    label: string;
    value: string;
};

export const artifactExlusionList = [
    'AF_LW_SPE_003'
];

const getArtifactListByCat = (): ArtifactListItem[][] => {
    const artifactListByCat = [];
    const artifactNameMap = getArtifactNameMap();

    Artifact.items.forEach((item) => {
        // blacklisted items
        if (item.iname.match(/AF_\w+_2/) && 
                (artifactNameMap[item.iname] == null || !artifactNameMap[item.iname].match(/.+\+2/))
            ) {
            return;
        }

        if (artifactExlusionList.includes(item.iname)) {
            return;
        }

        if (item.type >= 0) {
            if (artifactNameMap[item.iname]) {
                let artifactListEntry = {
                    label: artifactNameMap[item.iname],
                    value : item.iname
                };
  
                item.cat.forEach((cat) => {
                    if (artifactListByCat[cat] == null) {
                        artifactListByCat[cat] = [];
                    }

                    artifactListByCat[cat].push(artifactListEntry);
                });
            }
        }
    });

    artifactListByCat.forEach((artifactList, index, list) => {
        artifactList.sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });
    });

    return artifactListByCat;
};

const getSealGrowthMap = () => {
    const sealGrowthMap = {};

    ArtifactGrowItem.items.forEach((item) => {
        let stat = stats[item.grow_up[0].eff_dst];
        sealGrowthMap[stat.value] = item.grow_up[0].val;
      });

    return sealGrowthMap;
};

export interface Category {
    key: string;
    value: string;
    type: string;
};

const categoryExclusionList = [
    'LIGHTSHIELD',
    'HEAVYSHIELD',
    'LIGHTARMOR',
    'HEAVYARMOR',
    'ROBE',
    'SEPARATOR',
    'LARGESWORD',
    'STAFF',
];

const categoryTypeList = {
    accessory: [
        'ACCESSORY',
    ],
    armor: [
        'SHIELD',
        'ARMOR',
        'HAT',
        'HELM',
        'CLOTHES',
    ],
}

const getArtifactCategoryList = (): Category[] => {
    return ArtifactCategory_en.infos.filter((category: Category) => {
        return !categoryExclusionList.includes(category.key);
    }).map((category) => {
        let type = '';

        if (categoryTypeList.accessory.includes(category.key)) {
            type = 'accessory';
        } else if (categoryTypeList.armor.includes(category.key)) {
            type = 'armor';
        } else if (category.key !== 'NONE') {
            type = 'weapon';
        }

        return {
            ...category,
            type
        };
    });
};

const getArtifactRecipeMap = () => {
    const artifactRecipeMap = {};

    ArtifactRecipe.items.forEach((item) => {
        artifactRecipeMap[item.iname] = item;
    });

    return artifactRecipeMap;
};

const getArtifactAwakeMap = () => {
    const artifactAwakeMap = {};

    ArtifactAwake.items.forEach((item) => {
        artifactAwakeMap[item.iname] = item;
    });

    return artifactAwakeMap;
};

const getItemMap = () => {
    const itemMap = {};

    Item.items.forEach((item) => {
        itemMap[item.iname] = item;
    });

    return itemMap;
};

const getItemNameMap = () => {
    const itemNameMap = {};

    ItemName_en.infos.forEach((info) => {
        itemNameMap[info.key] = info.value;
    });

    return itemNameMap;
};

const getItemBookMap = () => {
    const itemNameMap = getItemNameMap();

    const itemMap = Item.items.filter((item) => {
        return item.iname.startsWith('IT_AF_AW_');
    }).reduce((acc: IngredientMap, curr): IngredientMap => {
        const ingredient = {
            ...curr,
            name: itemNameMap[curr.iname],
        };

        acc[curr.iname] = ingredient;

        return acc;
    }, {} as IngredientMap);

    return itemMap;
};

const getItemMaterialMap = (): IngredientMap => {
    const itemNameMap = getItemNameMap();

    const itemMap = Item.items.filter((item) => {
        return item.iname.startsWith('IT_AF_MAT_');
    }).reduce((acc: IngredientMap, curr): IngredientMap => {
        const ingredient = {
            ...curr,
            name: itemNameMap[curr.iname],
        };

        acc[curr.iname] = ingredient;

        return acc;
    }, {} as IngredientMap);

    return itemMap;
};

const getItemRecipeMap = (): IngredientMap => {
    const itemNameMap = getItemNameMap();

    const recipeMap: IngredientMap = Item.items.filter((item) => {
        return item.type === 13;
    }).reduce((acc: IngredientMap, curr): IngredientMap => {
        const ingredient = {
            ...curr,
            name: itemNameMap[curr.iname],
        };

        acc[curr.iname] = ingredient;

        return acc;
    }, {} as IngredientMap);

    return recipeMap;
};

export const defaultContext: DumpContext = {
    typeMap: getTypeMap(),
    growthMap: getGrowthMap(),
    buffMap: getBuffMap(),
    buffNameList: getBuffNameList(),
    skillMap: getSkillMap(),
    skillNameMap: getSkillNameMap(),
    artifactNameMap: getArtifactNameMap(),
    artifactMap: getArtifactMap(),
    artifactListByCat: getArtifactListByCat(),
    sealGrowthMap: getSealGrowthMap(),
    artifactCategoryList: getArtifactCategoryList(),
    artifactRecipeMap: getArtifactRecipeMap(),
    artifactAwakeMap: getArtifactAwakeMap(),
    itemMap: getItemMap(),
    itemNameMap: getItemNameMap(),
    itemBookMap: getItemBookMap(),
    itemMaterialMap: getItemMaterialMap(),
    itemRecipeMap: getItemRecipeMap(),
    customBuffNames: CustomBuffNames,
};

export const WotvDumpContext = createContext(defaultContext);

export const WotvDumpProvider = (props) => {
    return (
        <WotvDumpContext.Provider value={defaultContext}>
            {props.children}
        </WotvDumpContext.Provider>
    );
};