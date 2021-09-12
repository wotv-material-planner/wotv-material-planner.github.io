import * as React from 'react';
import {FunctionComponent, useContext, useState} from 'react';
import {WotvDumpContext, stats} from '../../../../../contexts/WotvDumpContext';
import './RowItemInfo.scss';

interface Props {
    iname: string;
    type: string;
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

    stats.forEach((stat) => {
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

const getAverageStats = (artifact, artifactStats, rawRates) => {
    const averageStats = {...artifact.status[0]};
    const artifactRates = {...rawRates};

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

    return averageStats;
};

export const RowItemInfo: FunctionComponent<Props> = (props) => {
    const [seals, setSeals] = useState<string[]>([]);
    const [passEnabled, setPassEnabled] = useState<boolean>(false);

    const wotvDump = useContext(WotvDumpContext);
    const {artifactMap, typeMap, growthMap} = wotvDump;

    const artifact = artifactMap[props.iname];
    
    const itemType = typeMap[artifact.rtype][0].value;
    const isCraftableItem = itemType !== 'ARTIFACT_TRUST' && itemType !== 'ARTIFACT_50';

    return (
        <div className="RowItemInfo">
            <div className="RowItemInfo-sidebar">
                <div className="RowItemInfo-sidebar-asset">
                    <img src={`img/equipment/${artifact.asset}.png`}/>
                </div>
                <div className="RowItemInfo-sidebar-buffs">
                    <div className="RowItemInfo-sidebar-buffs-title">
                        Buffs
                    </div>
                    {getItemBuffs(props.iname, wotvDump).map((buff, index) => {
                        return (
                            <div
                                className="RowItemInfo-sidebar-buffs-stats"
                                key={`infoBuffs_${index}`}
                            >
                                {buff}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="RowItemInfo-stats">
                <div className="RowItemInfo-stats-table-row">
                    <div className="RowItemInfo-stats-table-row-typeCell">
                        TYPE
                    </div>
                    {stats.map((stat, index) => {
                        return (
                            <div
                                className="RowItemInfo-stats-table-row-statCell"
                                key={`row_${index}`}
                            >
                                {stat.label}
                            </div>
                        );
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
                        averageStats = getAverageStats(artifact, artifactStats, artifactRates);
                    }

                    const selected = typeOption.value === props.type ? 'selected' : '';

                    return (
                        <div
                            className={`RowItemInfo-stats-table-row ${selected}`}
                            key={`statsTableRow-${index}`}
                        >
                            <div className="RowItemInfo-stats-table-row-typeCell">
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
                                        className="RowItemInfo-stats-table-row-statCell"
                                        key={`row_${index}`}
                                    >
                                        {statText}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                {isCraftableItem &&
                    <div className="RowItemInfo-stats-table-row">
                        <div className="RowItemInfo-stats-table-row-typeCell">
                            Growth
                        </div>
                        {stats.map((stat, index) => {
                            let growthText = '-'

                            if (artifact.randa[0][stat.value]) {
                                growthText = `+${artifact.randa[0][stat.value]}`
                            }

                            return (
                                <div
                                    className="RowItemInfo-stats-table-row-statCell"
                                    key={`growthCell_${index}`}
                                >
                                    {growthText}
                                </div>
                            );
                        })}
                    </div>
                }
                {isCraftableItem &&
                    <div className="RowItemInfo-stats-table-row">
                        <div className="RowItemInfo-stats-table-row-typeCell">
                            Seals
                        </div>
                        {stats.map((stat, index) => {
                            return (
                                <div
                                    className="RowItemInfo-stats-table-row-statCell"
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
                {isCraftableItem &&
                    <div className="RowItemInfo-stats-table-row">
                        <div className="RowItemInfo-stats-table-row-typeCell">
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
                                    className="RowItemInfo-stats-table-row-statCell"
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
    );
};