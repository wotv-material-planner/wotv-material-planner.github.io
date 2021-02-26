import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {CraftingItem, getTotalCraftingIngredients} from '~contexts/UserCraftingItemsContext';
import {WotvDumpContext, stats} from '~contexts/WotvDumpContext';
import {RowBook} from './RowBook';
import {RowMaterials} from './RowMaterials';
import {RowRecipe} from './RowRecipe';
import {RowMovementControls} from './RowMovementControls';
import {RowPlusSelects} from './RowPlusSelects';
import {RowTypeSelect} from './RowTypeSelect';
import './CraftingItemRow.scss';
import {RowDelete} from './RowDelete';

interface Props {
    craftingItem: CraftingItem;
    itemIndex: number;
    moveItemIndex?: number;
    setMoveItemIndex: (moveItemIndex: number) => void;
};

const getItemBuffs = (fullIname: string, wotvDump): string[] => {
    const {artifactMap, skillMap, customBuffNames} = wotvDump;

    let buffs = [];

    if (artifactMap[fullIname].skl5) {
        buffs = artifactMap[fullIname].skl5.reduce((acc, skill) => {
            let sbuffBuffs = [];

            if (skillMap[skill].s_buffs) {
                sbuffBuffs = skillMap[skill].s_buffs.reduce((sbuffAcc, sbuff) => {
                    sbuffAcc = sbuffAcc.concat(customBuffNames[sbuff].split(','));

                    return sbuffAcc;
                }, []);
            }

            acc = acc.concat(sbuffBuffs);

            let tbuffBuffs = [];

            if (skillMap[skill].t_buffs) {
                tbuffBuffs = skillMap[skill].t_buffs.reduce((tbuffAcc, tbuff) => {
                    tbuffAcc = tbuffAcc.concat(customBuffNames[tbuff].split(','));

                    return tbuffAcc;
                }, []);
            }

            acc = acc.concat(tbuffBuffs);

            return acc;
        }, []);
    }

    return buffs;
};

const getArtifactStats = (curve, base) => {
    let artifactStats = {};

    stats.forEach((stat) => {
        if (isNaN(base[stat.value])) {
            base[stat.value] = 0;
        }

        if (curve[stat.value]) {
            artifactStats[stat.value] = (100 + curve[stat.value]) / 100 * base[stat.value];

            let isNeg = artifactStats[stat.value] < 0;

            artifactStats[stat.value] = Math.floor(Math.abs(artifactStats[stat.value]));

            if (isNeg) {
                artifactStats[stat.value] *= -1;
            }
        } else {
            artifactStats[stat.value] = base[stat.value];
        }
    });

    return artifactStats;
};

const getArtifactRates = (adjust, base, seals, passEnabled, wotvDump) => {
    const {sealGrowthMap} = wotvDump;
    let artifactRates = {};

    stats.forEach((stat, i) => {
        if (isNaN(base[stat.value])) {
            base[stat.value] = 0;
        }

        if (adjust[stat.value]) {
            artifactRates[stat.value] = base[stat.value] + adjust[stat.value];
        } else {
            artifactRates[stat.value] = base[stat.value];
        }

        if (seals.includes(stat.value) && sealGrowthMap[stat.value]) {
            artifactRates[stat.value] += sealGrowthMap[stat.value];
        }

        if (passEnabled && sealGrowthMap[stat.value]) {
            artifactRates[stat.value] += sealGrowthMap[stat.value];
        }

        if (artifactRates[stat.value] < 0) {
            artifactRates[stat.value] = 0;
        }
        if (artifactRates[stat.value] > 100) {
            artifactRates[stat.value] = 100;
        }
    });

    return artifactRates;
};

export const CraftingItemRow: FunctionComponent<Props> = (props) => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [seals, setSeals] = useState<string[]>([]);
    const [passEnabled, setPassEnabled] = useState<boolean>(false);

    const wotvDump = useContext(WotvDumpContext);
    const {
        artifactMap,
        typeMap,
        growthMap,
    } = wotvDump;

    let fullIname = props.craftingItem.iname;

    if (props.craftingItem.targetPlus > 0) {
        fullIname += `_${props.craftingItem.targetPlus}`;
    }

    const artifact = artifactMap[fullIname];

    const totalIngredients = getTotalCraftingIngredients([props.craftingItem], wotvDump);

    return (
        <div className="CraftingItemRow">
            <div className="CraftingItemRow-main">
                <RowMovementControls
                    itemIndex={props.itemIndex}
                    moveItemIndex={props.moveItemIndex}
                    setMoveItemIndex={props.setMoveItemIndex}
                />
                <div>
                    <div className="CraftingItemRow-main-head">
                        <div className="CraftingItemRow-main-head-itemName">
                            {artifact.name}
                        </div>
                        <i
                            className="material-icons CraftingItemRow-main-head-itemInfo"
                            onClick={() => {
                                setShowInfo(!showInfo);
                            }}
                        >
                            help_outline
                        </i>
                        <RowTypeSelect
                            itemIndex={props.itemIndex}
                            typeOptions={typeMap[artifact.rtype]}
                        />
                        <RowPlusSelects
                            itemIndex={props.itemIndex}
                            displaySelect={!!artifactMap[`${props.craftingItem.iname}_1`]}
                        />
                    </div>
                    <div className="CraftingItemRow-main-contents">
                        <div className="CraftingItemRow-main-contents-inputs">
                            <RowRecipe
                                totalRecipes={totalIngredients.recipes}
                                asset={`equipment/${artifact.asset}.png`}
                            />
                            <RowBook
                                totalBooks={totalIngredients.books}
                            />
                            <RowMaterials
                                totalMaterials={totalIngredients.materials}
                            />
                        </div>
                    </div>
                </div>
                <RowDelete
                    itemIndex={props.itemIndex}
                    totalIngredients={totalIngredients}
                />
            </div>
            {showInfo &&
                <div className="CraftingItemRow-info">
                    <div className="CraftingItemRow-info-sidebar">
                        <div className="CraftingItemRow-info-sidebar-asset">
                            <img src={`equipment/${artifact.asset}.png`}/>
                        </div>
                        <div className="CraftingItemRow-info-sidebar-bonus">
                            <div className="CraftingItemRow-info-sidebar-bonus-title">
                                Bonus
                            </div>
                            {getItemBuffs(fullIname, wotvDump).map((buff, index) => {
                                return (
                                    <div
                                        className="CraftingItemRow-info-sidebar-bonus-stat"
                                        key={`infoBonus_${index}`}
                                    >
                                        {buff}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="CraftingItemRow-info-stats">
                        <div className="CraftingItemRow-info-stats-table-row">
                            <div className="CraftingItemRow-info-stats-table-row-typeCell">
                                TYPE
                            </div>
                            {stats.map((stat, index) => {
                                return (
                                    <div
                                        className="CraftingItemRow-info-stats-table-row-statCell"
                                        key={`row_${index}`}
                                    >
                                        {stat.label}
                                    </div>
                                )
                            })}
                        </div>
                        {typeMap[artifact.rtype].map((typeOption, index) => {
                            let typeGrowth = growthMap[typeOption.value];
                            let artifactStats = {};
                            let artifactRates = {};
                            let averageStats = {};

                            if (typeOption.value === 'ARTIFACT_TRUST' || typeOption.value === 'ARTIFACT_50') {
                                artifactStats = artifact.status[1];
                                averageStats = artifact.status[1];
                            } else {
                                artifactStats = getArtifactStats(typeGrowth.curve[0], artifact.status[1]);
                                artifactRates = getArtifactRates(
                                    typeGrowth.rstatus[0],
                                    artifact.randr[0],
                                    seals,
                                    passEnabled,
                                    wotvDump
                                );
                                averageStats = Object.assign({}, artifact.status[0]);

                                for (let i = 1; i < 50; i++) {
                                    let pityRate = 1;
                                    let pityStat = null;

                                    stats.forEach((stat) => {
                                        if (!isNaN(artifactRates[stat.value])) {
                                            pityRate *= (1 - (artifactRates[stat.value] / 100));

                                            if (!pityStat || artifactRates[stat.value] > artifactRates[pityStat]) {
                                                pityStat = stat.value;
                                            }
                                        }

                                        if (
                                            !isNaN(artifactStats[stat.value]) &&
                                            !isNaN(artifact.randa[0][stat.value]) &&
                                            !isNaN(artifactRates[stat.value])
                                        ) {
                                            averageStats[stat.value] += artifact.randa[0][stat.value] * artifactRates[stat.value] / 100;

                                            if (averageStats[stat.value] > artifactStats[stat.value]) {
                                                averageStats[stat.value] = artifactStats[stat.value];
                                                artifactRates[stat.value] = 0;
                                            }
                                        }

                                    });

                                    averageStats[pityStat] += pityRate;

                                    if (averageStats[pityStat] > artifactStats[pityStat]) {
                                        averageStats[pityStat] = artifactStats[pityStat];
                                        artifactRates[pityStat] = 0;
                                    }
                                }

                                artifactRates = getArtifactRates(
                                    typeGrowth.rstatus[0],
                                    artifact.randr[0],
                                    seals,
                                    passEnabled,
                                    wotvDump
                                );
                            }

                            return (
                                <div
                                    className="CraftingItemRow-info-stats-table-row"
                                    key={`statsTableRow-${index}`}
                                >
                                    <div className="CraftingItemRow-info-stats-table-row-typeCell">
                                        {typeOption.label || '-'}
                                    </div>
                                    {stats.map((stat, index) => {
                                        let statText = '-';

                                        if (
                                            !isNaN(artifact.status[0][stat.value]) &&
                                            !isNaN(artifact.status[1][stat.value]) &&
                                            (artifact.status[0][stat.value] != 0 || artifact.status[1][stat.value] != 0)
                                        ) {
                                            statText = `${Math.round(averageStats[stat.value])} / ${artifactStats[stat.value]}`
                                        }

                                        return (
                                            <div
                                                className="CraftingItemRow-info-stats-table-row-statCell"
                                                key={`row_${index}`}
                                            >
                                                {statText}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        {typeMap[artifact.rtype][0].value !== 'ARTIFACT_TRUST' && typeMap[artifact.rtype][0].value !== 'ARTIFACT_50' &&
                            <div className="CraftingItemRow-info-stats-table-row">
                                <div className="CraftingItemRow-info-stats-table-row-typeCell">
                                    Growth
                                </div>
                                {stats.map((stat, index) => {
                                    let growthText = '-'

                                    if (artifact.randa[0][stat.value]) {
                                        growthText = `+${artifact.randa[0][stat.value]}`
                                    }

                                    return (
                                        <div
                                            className="CraftingItemRow-info-stats-table-row-statCell"
                                            key={`growthCell_${index}`}
                                        >
                                            {growthText}
                                        </div>
                                    );
                                })}
                            </div>
                        }
                        {typeMap[artifact.rtype][0].value !== 'ARTIFACT_TRUST' && typeMap[artifact.rtype][0].value !== 'ARTIFACT_50' &&
                            <div className="CraftingItemRow-info-stats-table-row">
                                <div className="CraftingItemRow-info-stats-table-row-typeCell">
                                    Seals
                                </div>
                                {stats.map((stat, index) => {
                                    return (
                                        <div
                                            className="CraftingItemRow-info-stats-table-row-statCell"
                                            key={`sealCell_${index}`}
                                        >
                                            {artifact.randa[0][stat.value] && stat.passText ?
                                                <input
                                                    type="checkbox"
                                                    checked={seals.includes(stat.value)}
                                                    onChange={(event) => {
                                                        if (!event.target.checked) {
                                                            const newSeals = seals.filter((seal) => {
                                                                return seal !== stat.value;
                                                            });

                                                            setSeals(newSeals);
                                                        } else if (seals.length < 3) {
                                                            const newSeals = [
                                                                ...seals,
                                                                stat.value,
                                                            ];

                                                            setSeals(newSeals);
                                                        }
                                                    }}
                                                />
                                                :
                                                '-'
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        }
                        {typeMap[artifact.rtype][0].value !== 'ARTIFACT_TRUST' && typeMap[artifact.rtype][0].value !== 'ARTIFACT_50' &&
                            <div className="CraftingItemRow-info-stats-table-row">
                                <div className="CraftingItemRow-info-stats-table-row-typeCell">
                                    Pass
                                    <input
                                        type="checkbox"
                                        checked={passEnabled}
                                        onChange={() => {
                                            setPassEnabled(!passEnabled);
                                        }}
                                    />
                                </div>
                                {stats.map((stat, index) => {
                                    return (
                                        <div
                                            className="CraftingItemRow-info-stats-table-row-statCell"
                                            key={`sealCell_${index}`}
                                        >
                                            {artifact.randa[0][stat.value] && stat.passText || '-'}
                                        </div>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};