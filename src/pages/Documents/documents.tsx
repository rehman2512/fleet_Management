import React from "react";
import style from './documents.module.css'
import { Card, Row, Col, Upload, message, Button } from "antd";
import { FileTextOutlined, CameraOutlined, FileDoneOutlined, ScissorOutlined, UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const documentTypes = [
    { key: "bill", title: "National Identity", icon: <FileTextOutlined /> },
    { key: "fuel", title: "Licences", icon: <FileDoneOutlined /> },
    { key: "accident", title: "Driver Photo", icon: <CameraOutlined /> },
    { key: "scale", title: "Vehicle Documents", icon: <FileTextOutlined /> },
    { key: "citation", title: "Citation", icon: <ScissorOutlined /> },
];

const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://httpbin.org/post", 
    onChange(info: any) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const DocumentUploader = () => {
    return (
        <div style={{ padding: 20 }}>
            <div className={style.Header}>
                <h2>Add Document</h2>
                <Button type="primary" style={{ marginTop: 20 }}>
                    Save
                </Button>
            </div>
            <p>Select a document to upload</p>
            <Row gutter={[16, 16]}>
                {documentTypes.map((doc) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={doc.key}>
                        <Card hoverable style={{ textAlign: "center", border: "1px solid #d9d9d9" }}>
                            <Dragger {...uploadProps} style={{ padding: 10 }}>
                                <p className="ant-upload-drag-icon">{doc.icon}</p>
                                <p className="ant-upload-text">{doc.title}</p>
                                <p className="ant-upload-hint">Click or drag file to upload</p>
                            </Dragger>
                        </Card>
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default DocumentUploader;
