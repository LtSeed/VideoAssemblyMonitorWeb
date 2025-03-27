//
// CommonPage.tsx
//
// 通用页面：设置语言、重启后端服务器、关闭后端服务器
//

import React from "react";
import { Button, Modal, Select, message } from "antd";
import { useLanguage } from "../../LanguageContext";
import { Typography } from 'antd';

const { Title } = Typography;

const { confirm } = Modal;
const { Option } = Select;

export const CommonPage: React.FC = () => {
    const { language, currentLangKey, changeLanguage } = useLanguage();

    // 处理选择语言
    const handleChangeLanguage = (value: string) => {
        changeLanguage(value);
        message.success(`Language changed to ${value}`);
    };

    // 重启后端服务器
    const handleRestart = () => {
        confirm({
            title: language.common.restartBackendConfirmTitle,
            okText: language.common.confirmOk,
            cancelText: language.common.confirmCancel,
            onOk: () => {
                // TODO: 调用后端API重启服务器
                message.info("Restarting backend server...");
            },
        });
    };

    // 关闭后端服务器
    const handleClose = () => {
        confirm({
            title: language.common.closeBackendConfirmTitle,
            okText: language.common.confirmOk,
            cancelText: language.common.confirmCancel,
            onOk: () => {
                // TODO: 调用后端API关闭服务器
                message.info("Closing backend server...");
            },
        });
    };

    return (
        <div style={{ marginTop: 36, padding: "24px 60px"}}>
            <Title>{language.common.title}</Title>
            <div style={{ marginBottom: 48, marginTop: 24 }}>
                <label style={{ marginRight: 12 }}>
                    {language.common.languageSelectLabel}:
                </label>
                <Select
                    style={{ width: 200 }}
                    value={currentLangKey}
                    onChange={handleChangeLanguage}
                    placeholder={language.common.languageSelectPlaceholder}
                >
                    <Option value="zh">中文</Option>
                    <Option value="en">English</Option>
                </Select>
            </div>

            <div style={{ marginBottom: 24 }}>
                <Button danger onClick={handleRestart}>
                    {language.common.restartBackendLabel}
                </Button>
            </div>

            <div>
                <Button danger onClick={handleClose}>
                    {language.common.closeBackendLabel}
                </Button>
            </div>
        </div>
    );
};
