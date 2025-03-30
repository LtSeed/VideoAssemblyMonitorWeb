//
// TimelineModal.tsx
//
import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState} from 'react';
import {Chart} from 'react-google-charts';
import {AxiosResponse} from "axios";
import {PresetNode} from "../entity/PresetNode.ts";
import {Modal, Radio, RadioChangeEvent} from "antd";
import {StateMachineLogStrings} from "./ReviewTable.tsx";
import {useLanguage} from "../../LanguageContext";

interface TimelineEntry {
    node: PresetNode;
    rank: number;
    timestamp: Date;
    quota_of_rank: number;
}

interface TimelineModalProps {
    isOpen: boolean;
    timelineData: [AxiosResponse<Map<number, PresetNode>, unknown>, AxiosResponse<Map<number, PresetNode>, unknown>];
    logName: string;
    loadingLog: StateMachineLogStrings;
    setLoadingLog: Dispatch<StateMachineLogStrings | undefined>;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setTimelineData: Dispatch<SetStateAction<[AxiosResponse<Map<number, PresetNode>, unknown>, AxiosResponse<Map<number, PresetNode>, unknown>] | undefined>>;
}

/**
 * 包含Timeline的Modal
 */
const TimelineModal: React.FC<TimelineModalProps> = ({
                                                         isOpen,
                                                         timelineData,
                                                         logName,
                                                         loadingLog,
                                                         setTimelineData,
                                                         setShowModal,
                                                         setLoadingLog
                                                     }) => {
    const { language } = useLanguage();

    // raw vs filtered
    const [mode, setMode] = useState<'raw' | 'filtered'>('raw');
    const [timelineEntry, setTimelineEntry] = useState<TimelineEntry[]>();

    const handleCloseModal = useCallback(() => {
        setLoadingLog(undefined);
        setShowModal(false);
        setTimelineData(undefined);
    }, [setLoadingLog, setShowModal, setTimelineData]);

    useEffect(() => {
        const [rawData, filteredData] = timelineData;
        const t: TimelineEntry[] = [];

        // pick data by mode
        const chosen = (mode === 'raw') ? rawData.data : filteredData.data;
        const dataMap = new Map(Object.entries(chosen));
        const quotaOfRankMap = new Map<number, number>();
        const quotaAlreadyShown: number[] = [];

        // Summation for each rank
        dataMap.forEach((v: PresetNode) => {
            if (quotaAlreadyShown.includes(v.id.number)) return;
            quotaAlreadyShown.push(v.id.number);
            const oldVal = quotaOfRankMap.get(v.rank) || 0;
            quotaOfRankMap.set(v.rank, oldVal + v.real_quota);
        });

        // Build timeline array
        dataMap.forEach((v: PresetNode, k) => {
            const q = quotaOfRankMap.get(v.rank) || 0;
            let timestampNum = parseInt(k);
            // If the numeric timestamp is too small, assume it is offset from the log's start
            if (timestampNum < 100000) {
                timestampNum += new Date(loadingLog.startTime).getTime();
            }
            t.push({
                node: v,
                rank: v.rank,
                timestamp: new Date(timestampNum),
                quota_of_rank: q
            });
        });
        setTimelineEntry(t);
    }, [mode, timelineData, loadingLog.startTime]);

    const getHigherKey = useCallback((key: number) => {
        if (!timelineEntry) return new Date(key);
        const futureKeys = timelineEntry
            .filter(entry => entry.timestamp.getTime() > key)
            .map(e => e.timestamp.getTime());
        if (futureKeys.length === 0) {
            // fallback to log end: start time + duration
            return new Date(new Date(loadingLog.startTime).getTime() + loadingLog.duration);
        }
        return new Date(Math.min(...futureKeys));
    }, [timelineEntry, loadingLog]);

    const getHighestKeyOfLessRank = useCallback((key: number, rank: number) => {
        if (!timelineEntry) return new Date(key);
        if (rank === 1) return new Date(key);
        const keys = timelineEntry
            .filter(e => e.rank === rank - 1 && e.timestamp.getTime() < key)
            .map(e => e.timestamp.getTime());
        if (keys.length === 0) return new Date(key);
        const maxParent = Math.max(...keys);
        return getHigherKey(maxParent);
    }, [timelineEntry, getHigherKey]);

    // Prepare chart data for google-charts Timeline
    const chartData = useMemo(() => {
        const columns = [
            { type: 'string', id: 'Position' },
            { type: 'string', id: 'Name' },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' }
        ];
        if (!timelineEntry) return columns;

        // Rows for offset-quota segment, real-work segment, standard-quota segment...
        const rows: (string | Date)[][] = [];
        const usedNodes: number[] = [];

        // 1) offset quota block
        timelineEntry.forEach(entry => {
            if (!usedNodes.includes(entry.node.id.number)) {
                usedNodes.push(entry.node.id.number);
                const category = `${entry.node.id.number}. ${entry.node.name}`;
                const stateLabel = language.review.timeline.offsetQuota;
                const start = getHighestKeyOfLessRank(entry.timestamp.getTime(), entry.rank);
                const end = new Date(entry.timestamp.getTime() + entry.quota_of_rank * 1000);
                // Make sure start < end for chart
                const rowStart = (start.getTime() < end.getTime()) ? start : end;
                const rowEnd = (start.getTime() < end.getTime()) ? end : start;
                rows.push([category, stateLabel, rowStart, rowEnd]);
            }
        });

        // 2) real work block
        timelineEntry.forEach(entry => {
            const category = `${entry.node.id.number}. ${entry.node.name}`;
            const stateLabel = language.review.timeline.realWork;
            const start = entry.timestamp;
            const end = getHigherKey(entry.timestamp.getTime());
            const rowStart = (start.getTime() < end.getTime()) ? start : end;
            const rowEnd = (start.getTime() < end.getTime()) ? end : start;
            rows.push([category, stateLabel, rowStart, rowEnd]);
        });

        // 3) standard quota block
        // Sort timeline entries by rank ascending
        const sortedEntries = [...timelineEntry].sort((a, b) => a.rank - b.rank);
        let t = new Date(Math.min(...sortedEntries.map(e => e.timestamp.getTime())));
        const usedStdQuota: number[] = [];
        sortedEntries.forEach(entry => {
            if (!usedStdQuota.includes(entry.node.id.number)) {
                usedStdQuota.push(entry.node.id.number);
                const category = `${entry.node.id.number}. ${entry.node.name}`;
                const stateLabel = language.review.timeline.standardQuota;
                const start = new Date(t);
                const end = new Date(t.getTime() + entry.node.real_quota * 1000);
                // Update t
                t = end;
                // Make sure start < end
                const rowStart = (start.getTime() < end.getTime()) ? start : end;
                const rowEnd = (start.getTime() < end.getTime()) ? end : start;
                rows.push([category, stateLabel, rowStart, rowEnd]);
            }
        });

        // Return combined array
        return [columns, ...rows];
    }, [timelineEntry, language, getHighestKeyOfLessRank, getHigherKey]);

    return (
        <Modal
            open={isOpen}
            onOk={handleCloseModal}
            onCancel={handleCloseModal}
            width="90%"
            title={`${language.review.timeline.titlePrefix}${logName}`}
        >
            <div style={{ marginBottom: 16 }}>
                <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(e: RadioChangeEvent) => setMode(e.target.value)}
                    value={mode}
                >
                    <Radio.Button value="raw">
                        {language.review.timeline.rawData}
                    </Radio.Button>
                    <Radio.Button value="filtered">
                        {language.review.timeline.filteredData}
                    </Radio.Button>
                </Radio.Group>
            </div>

            <Chart
                chartType="Timeline"
                data={chartData}
                width="100%"
                height="400px"
                loader={<div>{language.common.loadingChart}</div>}
                options={{
                    timeline: { showBarLabels: true }
                }}
            />
        </Modal>
    );
};

export default TimelineModal;
