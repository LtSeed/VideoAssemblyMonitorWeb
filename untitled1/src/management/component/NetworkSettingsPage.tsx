//
// NetworkSettingsPage.tsx
//
// 网络设置页面：包括管理界面Host/Port、Eoid Host/Port、Roboflow Host/Port
// 提供测试按钮
//

import React, {useEffect} from "react";
import { Input, InputNumber, Button, Form, message } from "antd";
import { useLanguage } from "../../LanguageContext";
import { Typography } from 'antd';
import {getAllConfigs, HostAndPort, updatePythonConfig, updateRoboflowConfig} from "../services/configAPI.ts";

const { Title } = Typography;

export const NetworkSettingsPage: React.FC = () => {
    const { language } = useLanguage();
    const [form] = Form.useForm();

    // 示例：管理界面、Eoid、Roboflow 的 host / port
    interface NetworkFormValues {
        managementHost: string;
        managementPort: number;
        eoidHost: string;
        eoidPort: number;
        roboflowHost: string;
        roboflowPort: number;
    }

    const initialValues: NetworkFormValues = {
        managementHost: "http://localhost",
        managementPort: 8080,
        eoidHost: "http://localhost",
        eoidPort: 5000,
        roboflowHost: "http://localhost",
        roboflowPort: 9001,
    };

    // 演示：从后端 /config/all 拉取当前配置来填充表单
    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const allConfigs = await getAllConfigs();
                // eoidHost 和 eoidPort 对应后端 pythonServerHost / pythonServerMainPort
                // roboflowHost 和 roboflowPort 对应后端 roboflowHost / roboflowPort
                form.setFieldsValue({
                    managementHost: "http://localhost", // 后端无此字段，仅示例
                    managementPort: 8080,               // 后端无此字段，仅示例
                    eoidHost: allConfigs.pythonServerHost,
                    eoidPort: Number(allConfigs.pythonServerMainPort),
                    roboflowHost: allConfigs.roboflowHost,
                    roboflowPort: Number(allConfigs.roboflowPort),
                });
            } catch (error) {
                message.error("Failed to fetch config: " + String(error));
            }
        };
        fetchConfigs();
    }, [form]);

    const handleTest = (field: "management" | "eoid" | "roboflow") => {
        const host = form.getFieldValue(field + "Host");
        const port = form.getFieldValue(field + "Port");
        // 这里可调用后端某个测试接口 /ping?host=&port= ，或者直接在前端做 fetch 试探
        // 演示仅做提示
        message.info(`Testing ${host} for port ${port} ... (示例)`);
    };

    const handleFinish = async (values: NetworkFormValues) => {
        try {
            // 1) 更新 Eoid (Python)
            const eoidRequest: HostAndPort = {
                host: values.eoidHost,
                port: String(values.eoidPort),
            };
            await updatePythonConfig(eoidRequest);

            // 2) 更新 Roboflow
            const roboflowRequest: HostAndPort = {
                host: values.roboflowHost,
                port: String(values.roboflowPort),
            };
            await updateRoboflowConfig(roboflowRequest);

            // managementHost/Port 仅示例，本后端暂未提供相关接口
            message.success("Network settings saved successfully!");
        } catch (error) {
            message.error("Failed to save network settings: " + String(error));
        }
    };

    return (
        <div style={{ marginTop: 36, padding: "24px 60px" }}>
            <Title>{language.network.pageTitle}</Title>

            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={initialValues}
                layout="vertical"
                style={{ marginTop: 36 }}
            >
                <Form.Item
                    label={language.network.managementHostLabel}
                    name="managementHost"
                    rules={[{ required: true, message: "Please input management host" }]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>

                <Form.Item
                    label={language.network.managementPortLabel}
                    name="managementPort"
                    rules={[{ required: true, message: "Please input management port" }]}
                >
                    <InputNumber style={{ width: 300 }} />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ marginRight: 24 }}
                        onClick={() => handleTest("management")}
                    >
                        {language.network.testButton}
                    </Button>
                </Form.Item>

                <Form.Item
                    label={language.network.eoidHostLabel}
                    name="eoidHost"
                    rules={[{ required: true, message: "Please input Eoid host" }]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>

                <Form.Item
                    label={language.network.eoidPortLabel}
                    name="eoidPort"
                    rules={[{ required: true, message: "Please input Eoid port" }]}
                >
                    <InputNumber style={{ width: 300 }} />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ marginRight: 24 }}
                        onClick={() => handleTest("eoid")}
                    >
                        {language.network.testButton}
                    </Button>
                </Form.Item>

                <Form.Item
                    label={language.network.roboflowHostLabel}
                    name="roboflowHost"
                    rules={[{ required: true, message: "Please input Roboflow host" }]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>

                <Form.Item
                    label={language.network.roboflowPortLabel}
                    name="roboflowPort"
                    rules={[{ required: true, message: "Please input Roboflow port" }]}
                >
                    <InputNumber style={{ width: 300 }} />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ marginRight: 24 }}
                        onClick={() => handleTest("roboflow")}
                    >
                        {language.network.testButton}
                    </Button>
                </Form.Item>

                <Form.Item style={{ marginLeft: "auto" }}>
                    <Button type="primary" htmlType="submit">
                        {language.network.submit}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
