import React, { useEffect, useState } from 'react';
import { Card, Statistic, Progress, Row, Col } from 'antd';
import { host } from "../../Share.tsx";
import {useLanguage} from "../../LanguageContext.tsx"; // Adjust the import based on your file structure

// types.ts
export interface SystemInfoDto {
    cpuUsage: number;
    totalMemory: number;
    usedMemory: number;
    committedVirtualMemory: number;
    totalSwapSpace: number;
    freeSwapSpace: number;
    systemLoadAverage: number;
    diskTotal: number;
    diskFree: number;
    diskUsed: number;
}

export interface JvmInfoDto {
    heapUsed: number;
    heapMax: number;
    nonHeapUsed: number;
    threadCount: number;
    peakThreadCount: number;
    loadedClassCount: number;
    totalLoadedClassCount: number;
    unloadedClassCount: number;
}

const SystemMonitoring: React.FC = () => {
    const [systemInfo, setSystemInfo] = useState<SystemInfoDto | null>(null);
    const [jvmInfo, setJvmInfo] = useState<JvmInfoDto | null>(null);
    const languageData = useLanguage(); // Get current language data from context

    const fetchData = () => {
        fetch(host + '/management/system-info')
            .then((res) => res.json())
            .then((data: SystemInfoDto) => {
                setSystemInfo(data);
            })
            .catch((err) => {
                console.error('获取 system-info 失败:', err);
            });

        fetch(host + '/management/jvm-info')
            .then((res) => res.json())
            .then((data: JvmInfoDto) => {
                setJvmInfo(data);
            })
            .catch((err) => {
                console.error('获取 jvm-info 失败:', err);
            });
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 250);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (!systemInfo || !jvmInfo) {
        return <div>{languageData.language.common.loadingChart}</div>;
    }

    const cpuUsagePercent = (systemInfo.cpuUsage * 100).toFixed(2);
    const memoryUsagePercent = ((systemInfo.usedMemory / systemInfo.totalMemory) * 100).toFixed(2);
    const diskUsagePercent = ((systemInfo.diskUsed / systemInfo.diskTotal) * 100).toFixed(2);
    const heapUsagePercent = ((jvmInfo.heapUsed / jvmInfo.heapMax) * 100).toFixed(2);

    return (
        <div style={{ padding: 24, textAlign: 'left' }}>
            <Row gutter={[16, 16]}>
                {/* CPU 使用率 */}
                <Col span={8}>
                    <Card title={languageData.language.systemStatus.cpuUsage}>
                        <Statistic
                            value={cpuUsagePercent}
                            suffix="%"
                            precision={2}
                        />
                        <Progress
                            percent={parseFloat(cpuUsagePercent)}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* 系统内存使用 */}
                <Col span={8}>
                    <Card title={languageData.language.systemStatus.systemMemory}>
                        <Statistic
                            title={languageData.language.systemStatus.totalMemory}
                            value={(systemInfo.totalMemory / 1024 / 1024).toFixed(2)}
                            suffix="MB"
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Statistic
                            title={languageData.language.systemStatus.usedMemory}
                            value={(systemInfo.usedMemory / 1024 / 1024).toFixed(2)}
                            suffix="MB"
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Progress
                            percent={parseFloat(memoryUsagePercent)}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* 磁盘使用 */}
                <Col span={8}>
                    <Card title={languageData.language.systemStatus.diskUsage}>
                        <Statistic
                            title={languageData.language.systemStatus.diskTotal}
                            value={(systemInfo.diskTotal / 1024 / 1024 / 1024).toFixed(2)}
                            suffix="GB"
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Statistic
                            title={languageData.language.systemStatus.diskUsed}
                            value={(systemInfo.diskUsed / 1024 / 1024 / 1024).toFixed(2)}
                            suffix="GB"
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Progress
                            percent={parseFloat(diskUsagePercent)}
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                {/* JVM Heap */}
                <Col span={8}>
                    <Card title={languageData.language.systemStatus.jvmHeap}>
                        <Statistic
                            title={languageData.language.systemStatus.maxHeapMemory}
                            value={(jvmInfo.heapMax / 1024 / 1024).toFixed(2)}
                            suffix="MB"
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Statistic
                            title={languageData.language.systemStatus.usedHeapMemory}
                            value={(jvmInfo.heapUsed / 1024 / 1024).toFixed(2)}
                            suffix="MB"
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Progress
                            percent={parseFloat(heapUsagePercent)}
                            size="small"
                        />
                    </Card>
                </Col>

                {/* JVM 线程信息 */}
                <Col span={8}>
                    <Card title={languageData.language.systemStatus.jvmThreads}>
                        <Statistic
                            style={{
                                marginBottom: 16,
                            }}
                            title={languageData.language.systemStatus.activeThreadCount} value={jvmInfo.threadCount} />
                        <Statistic title={languageData.language.systemStatus.peakThreadCount} value={jvmInfo.peakThreadCount} />
                    </Card>
                </Col>

                {/* JVM 类加载信息 */}
                <Col span={8}>
                    <Card title={languageData.language.systemStatus.jvmClassLoading}>
                        <Statistic
                            title={languageData.language.systemStatus.loadedClassCount}
                            value={jvmInfo.loadedClassCount}
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Statistic
                            title={languageData.language.systemStatus.totalLoadedClassCount}
                            value={jvmInfo.totalLoadedClassCount}
                            style={{
                                marginBottom: 16,
                            }}
                        />
                        <Statistic
                            title={languageData.language.systemStatus.unloadedClassCount}
                            value={jvmInfo.unloadedClassCount}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SystemMonitoring;
