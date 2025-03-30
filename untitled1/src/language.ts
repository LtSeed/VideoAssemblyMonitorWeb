//
// language.tsx
//
// 用于统一管理多语言文本内容
//

export interface TextInterface {
    common: {
        title: string;
        languageSelectLabel: string;
        languageSelectPlaceholder: string;
        restartBackendLabel: string;
        closeBackendLabel: string;
        restartBackendConfirmTitle: string;
        closeBackendConfirmTitle: string;
        confirmOk: string;
        confirmCancel: string;

        // New fields for messages / placeholders:
        languageChangedMessage: string;
        restartingBackendMessage: string;
        closingBackendMessage: string;
        loadingChart: string;
    };

    menu: {
        systemStatus: string;
        database: string;
        workLog: string;
        preset: string;
        settings: string;
    };

    systemStatus: {
        cpuUsage: string;
        systemMemory: string;
        totalMemory: string;
        usedMemory: string;
        diskUsage: string;
        diskTotal: string;
        diskUsed: string;
        jvmHeap: string;
        maxHeapMemory: string;
        usedHeapMemory: string;
        jvmThreads: string;
        activeThreadCount: string;
        peakThreadCount: string;
        jvmClassLoading: string;
        loadedClassCount: string;
        totalLoadedClassCount: string;
        unloadedClassCount: string;
    };

    network: {
        submit: string;
        pageTitle: string;
        managementHostLabel: string;
        managementPortLabel: string;
        eoidHostLabel: string;
        eoidPortLabel: string;
        roboflowHostLabel: string;
        roboflowPortLabel: string;
        testButton: string;
    };

    warningAndQuota: {
        pageTitle: string;
        presetSelectLabel: string;
        presetSelectAll: string;
        calculateStatsButton: string;
        calculateStatsModalTitle: string;
        stepColumn: string;
        averageTimeColumn: string;
        stdDevColumn: string;
        quotaModeSelectLabel: string;
        quotaModeAvgOffset: string;
        quotaModeConfidence: string;
        quotaModeDisabled: string;
        importAvgTimeButton: string;
        importAvgTimeDisabledTip: string;
        upPercentLabel: string;
        downPercentLabel: string;
        setAllUpPercentButton: string;
        setAllDownPercentButton: string;
        upPercentInfo: string;
        downPercentInfo: string;
        confidenceLabel: string;
        confidenceInfo: string;
        setConfidenceButton: string;
        acceptanceUpper: string;
        acceptanceLower: string;
        quotaTime: string;
        upBoundaryTime: string;
        downBoundaryTime: string;
        submitButton: string;
        submitConfirmTitle: string;
        submitConfirmOk: string;
        submitConfirmCancel: string;
        changedPresetName: string;
    };

    model: {
        pageTitle: string;
        selectAllButton: string;
        invertSelectButton: string;
        applyEoidButton: string;
        applyYoloButton: string;
        applyConfirmTitle: string;
        applyConfirmOk: string;
        applyConfirmCancel: string;
        tablePresetName: string;
        tableCurrentModel: string;
        modelEoid: string;
        modelYolo: string;
        changedPresetName: string;
        oldModel: string;
        newModel: string;
        applyModelPrompt: string;
        selectModelPlaceholder: string;
        applyButton: string;
        noPresetSelected: string;
    };

    // New block for the “Review” or “Log” table and timeline
    review: {
        tableHeaders: {
            id: string;
            operator: string;
            preset: string;
            startTime: string;
            endTime: string;
            duration: string;
            observations: string;
            viewInChart: string;
        };
        timeline: {
            titlePrefix: string;     // e.g. "Timeline for "
            rawData: string;
            filteredData: string;
            offsetQuota: string;
            realWork: string;
            standardQuota: string;
            logNoPrefix: string;     // e.g. "Log No."
        };
    };

    presetTable?: {
        columns: {
            presetId: string;
            presetName: string;
            nodeNumber: string;
            nodeName: string;
            realQuota: string;
            rank: string;
            actions: string;
            parents: string;
        };
    };
}

// 示例中文文案
export const ChineseText: TextInterface = {
    presetTable: {
        columns: {
            presetId: "Preset ID",
            presetName: "Preset 名称",
            nodeNumber: "Node 编号",
            nodeName: "Node 名称",
            realQuota: "配额时间",
            rank: "排序等级",
            actions: "可用操作",
            parents: "父节点(Names)",
        }
    },
    common: {
        title: "通用",
        languageSelectLabel: "选择语言",
        languageSelectPlaceholder: "请选择语言",
        restartBackendLabel: "重启后端服务器",
        closeBackendLabel: "关闭后端服务器",
        restartBackendConfirmTitle: "确认要重启后端服务器吗？",
        closeBackendConfirmTitle: "确认要关闭后端服务器吗？",
        confirmOk: "确定",
        confirmCancel: "取消",

        // new
        languageChangedMessage: "语言已切换到: ",
        restartingBackendMessage: "正在重启后端服务器...",
        closingBackendMessage: "正在关闭后端服务器...",
        loadingChart: "图表加载中..."
    },
    systemStatus: {
        cpuUsage: "CPU 使用率",
        systemMemory: "系统内存使用",
        totalMemory: "总内存",
        usedMemory: "已使用内存",
        diskUsage: "磁盘使用",
        diskTotal: "磁盘总容量",
        diskUsed: "已使用磁盘",
        jvmHeap: "JVM Heap 使用",
        maxHeapMemory: "最大堆内存",
        usedHeapMemory: "已使用堆内存",
        jvmThreads: "JVM 线程信息",
        activeThreadCount: "当前活动线程数",
        peakThreadCount: "峰值线程数",
        jvmClassLoading: "JVM 类加载信息",
        loadedClassCount: "当前已加载类总数",
        totalLoadedClassCount: "历史总加载过的类数量",
        unloadedClassCount: "已卸载的类数量",
    },
    menu: {
        systemStatus: "系统状态",
        database: "数据库",
        workLog: "工作日志",
        preset: "预置",
        settings: "设置"
    },
    network: {
        pageTitle: "网络设置",
        managementHostLabel: "管理界面 Host",
        managementPortLabel: "管理界面 Port",
        eoidHostLabel: "Eoid Host",
        eoidPortLabel: "Eoid Port",
        roboflowHostLabel: "Roboflow Host",
        roboflowPortLabel: "Roboflow Port",
        testButton: "测试",
        submit: "应用"
    },
    warningAndQuota: {
        pageTitle: "警告与工时配额设置",
        presetSelectLabel: "选择要配置的 Preset",
        presetSelectAll: "应用到所有 Preset",
        calculateStatsButton: "计算平均时间/标准差",
        calculateStatsModalTitle: "工步平均时间与标准差",
        stepColumn: "工步",
        averageTimeColumn: "平均时间",
        stdDevColumn: "时间标准差",
        quotaModeSelectLabel: "选择 Quota 模式",
        quotaModeAvgOffset: "平均时间指定偏移",
        quotaModeConfidence: "置信度假设检验",
        quotaModeDisabled: "关闭警告",
        importAvgTimeButton: "导入计算的平均时间",
        importAvgTimeDisabledTip: "请先计算平均时间",
        upPercentLabel: "上移百分比",
        downPercentLabel: "下移百分比",
        setAllUpPercentButton: "提交上移百分比",
        setAllDownPercentButton: "提交下移百分比",
        upPercentInfo: "上移百分比用于计算超时上界",
        downPercentInfo: "下移百分比用于计算超时下界",
        confidenceLabel: "设置置信度",
        confidenceInfo: "根据置信度计算工步时间接受区间",
        setConfidenceButton: "提交置信度",
        acceptanceUpper: "接受上界",
        acceptanceLower: "接受下界",
        quotaTime: "配额时间",
        upBoundaryTime: "上界(时间)",
        downBoundaryTime: "下界(时间)",
        submitButton: "提交",
        submitConfirmTitle: "确认提交对以下 Preset 的修改？",
        submitConfirmOk: "确认",
        submitConfirmCancel: "取消",
        changedPresetName: "Preset 名称",
    },
    model: {
        pageTitle: "模型选择设置",
        selectAllButton: "全选",
        invertSelectButton: "反选",
        applyEoidButton: "应用到 Eoid",
        applyYoloButton: "应用到 YOLO",
        applyConfirmTitle: "确认对以下 Preset 修改模型？",
        applyConfirmOk: "确认",
        applyConfirmCancel: "取消",
        tablePresetName: "Preset 名称",
        tableCurrentModel: "当前模型",
        modelEoid: "Eoid",
        modelYolo: "Yolo",
        changedPresetName: "Preset 名称",
        oldModel: "原模型",
        newModel: "新模型",
        applyModelPrompt: "将所有选中的预设使用的模型修改为：",
        selectModelPlaceholder: "选择模型",
        applyButton: "提交",
        noPresetSelected: "未选中预设"
    },
    review: {
        tableHeaders: {
            id: "ID",
            operator: "操作员",
            preset: "预置",
            startTime: "开始时间",
            endTime: "结束时间",
            duration: "持续时间",
            observations: "观察",
            viewInChart: "查看图表"
        },
        timeline: {
            titlePrefix: "时间线 - ",
            rawData: "原始数据",
            filteredData: "过滤后数据",
            offsetQuota: "偏移配额",
            realWork: "真实工作",
            standardQuota: "标准配额",
            logNoPrefix: "日志编号 "
        }
    }
};

// 示例英文文案
export const EnglishText: TextInterface = {
    presetTable: {
        columns: {
            presetId: "Preset ID",
            presetName: "Preset Name",
            nodeNumber: "Node Number",
            nodeName: "Node Name",
            realQuota: "Real Quota",
            rank: "Rank",
            actions: "Actions",
            parents: "Parent Nodes",
        }
    },
    common: {
        title: "General",
        languageSelectLabel: "Language",
        languageSelectPlaceholder: "Select language",
        restartBackendLabel: "Restart Backend",
        closeBackendLabel: "Close Backend",
        restartBackendConfirmTitle: "Confirm to restart the backend?",
        closeBackendConfirmTitle: "Confirm to close the backend?",
        confirmOk: "OK",
        confirmCancel: "Cancel",

        // new
        languageChangedMessage: "Language changed to: ",
        restartingBackendMessage: "Restarting backend server...",
        closingBackendMessage: "Closing backend server...",
        loadingChart: "Loading Chart..."
    },
    systemStatus: {
        cpuUsage: "CPU Usage",
        systemMemory: "System Memory Usage",
        totalMemory: "Total Memory",
        usedMemory: "Used Memory",
        diskUsage: "Disk Usage",
        diskTotal: "Total Disk Capacity",
        diskUsed: "Used Disk",
        jvmHeap: "JVM Heap Usage",
        maxHeapMemory: "Max Heap Memory",
        usedHeapMemory: "Used Heap Memory",
        jvmThreads: "JVM Threads Info",
        activeThreadCount: "Active Thread Count",
        peakThreadCount: "Peak Thread Count",
        jvmClassLoading: "JVM Class Loading Info",
        loadedClassCount: "Loaded Class Count",
        totalLoadedClassCount: "Total Loaded Class Count",
        unloadedClassCount: "Unloaded Class Count",
    },
    menu: {
        systemStatus: "System Status",
        database: "Database",
        workLog: "Work Log",
        preset: "Preset",
        settings: "Settings"
    },
    network: {
        pageTitle: "Network",
        managementHostLabel: "Management Host",
        managementPortLabel: "Management Port",
        eoidHostLabel: "Eoid Host",
        eoidPortLabel: "Eoid Port",
        roboflowHostLabel: "Roboflow Host",
        roboflowPortLabel: "Roboflow Port",
        testButton: "Test",
        submit: "apply",
    },
    warningAndQuota: {
        pageTitle: "Warning & Quota",
        presetSelectLabel: "Select a Preset",
        presetSelectAll: "Apply to All Presets",
        calculateStatsButton: "Calculate Average/StdDev",
        calculateStatsModalTitle: "Steps Average Time & StdDev",
        stepColumn: "Step",
        averageTimeColumn: "Average Time",
        stdDevColumn: "StdDev",
        quotaModeSelectLabel: "Select Quota Mode",
        quotaModeAvgOffset: "Average Time with Offset",
        quotaModeConfidence: "Confidence Hypothesis Test",
        quotaModeDisabled: "Disable Warning",
        importAvgTimeButton: "Import Calculated Average Time",
        importAvgTimeDisabledTip: "Please calculate first",
        upPercentLabel: "Up Shift (%)",
        downPercentLabel: "Down Shift (%)",
        setAllUpPercentButton: "Submit Up Shift",
        setAllDownPercentButton: "Submit Down Shift",
        upPercentInfo: "Up shift percent used to compute upper boundary",
        downPercentInfo: "Down shift percent used to compute lower boundary",
        confidenceLabel: "Set Confidence",
        confidenceInfo: "Compute acceptance interval by confidence",
        setConfidenceButton: "Submit Confidence",
        acceptanceUpper: "Upper Bound",
        acceptanceLower: "Lower Bound",
        quotaTime: "Quota Time",
        upBoundaryTime: "Upper (Time)",
        downBoundaryTime: "Lower (Time)",
        submitButton: "Submit",
        submitConfirmTitle: "Confirm to submit changes to these Presets?",
        submitConfirmOk: "OK",
        submitConfirmCancel: "Cancel",
        changedPresetName: "Preset Name",
    },
    model: {
        pageTitle: "Model",
        selectAllButton: "Select All",
        invertSelectButton: "Invert Selection",
        applyEoidButton: "Apply to Eoid",
        applyYoloButton: "Apply to YOLO",
        applyConfirmTitle: "Confirm to change models for these Presets?",
        applyConfirmOk: "OK",
        applyConfirmCancel: "Cancel",
        tablePresetName: "Preset Name",
        tableCurrentModel: "Current Model",
        modelEoid: "Eoid",
        modelYolo: "Yolo",
        changedPresetName: "Preset Name",
        oldModel: "Old Model",
        newModel: "New Model",
        applyModelPrompt: "Change the model for all selected presets to:",
        selectModelPlaceholder: "Select a model",
        applyButton: "Apply",
        noPresetSelected: "No Preset selected"
    },
    review: {
        tableHeaders: {
            id: "ID",
            operator: "Operator",
            preset: "Preset",
            startTime: "Start Time",
            endTime: "End Time",
            duration: "Duration",
            observations: "Observations",
            viewInChart: "View In Chart"
        },
        timeline: {
            titlePrefix: "Timeline for ",
            rawData: "Raw Data",
            filteredData: "Filtered Data",
            offsetQuota: "Offset Quota",
            realWork: "Real Work",
            standardQuota: "Standard Quota",
            logNoPrefix: "Log No."
        }
    }
};
