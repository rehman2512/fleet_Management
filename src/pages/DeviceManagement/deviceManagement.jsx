import React, { useEffect, useState } from "react";
import Style from './devices.module.css'
import AddNewBtn from "../../components/button/addNewBtn";
import { Table, Pagination, Dropdown, Popconfirm, Modal } from 'antd';
import { CiMenuKebab } from 'react-icons/ci';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;



const ManageDriver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [loadingText, setLoadingText] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    // setIsModalOpen(true);
    navigate('/Forms/addDevices')
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource = [
    {
      key: "1",
      DeviceID: "1",
      SerialNumber: "SN-001",
      FirmwareVersion: "V1.0",
    }


  ];

  const actionMenu = (
    <div className={Style.actions}>
      <div className={Style.dropdownItem}>Edit</div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
      >
        <div className={Style.dropdownItem} onClick={() => setOpen(true)}>
          Delete
        </div>
      </Popconfirm>
    </div>
  );

  const allColumns = [
    {
      title: "Device ID",
      dataIndex: "DeviceID",
      key: "DeviceID",
    },
    {
      title: "Serial Number",
      dataIndex: "SerialNumber",
      key: "SerialNumber",
    },
    {
      title: "Firmware Version",
      dataIndex: "FirmwareVersion",
      key: "FirmwareVersion",
    },
  
    


    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: () => (
        <Dropdown overlay={actionMenu} trigger={["click"]} placement="bottomRight">
          <CiMenuKebab className={Style.actionIcon} />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    setLoadingText(true);
    setTimeout(() => {
      setLoadingText(false);
    }, 2000);
  }, []);



  return (
    <>
      <div className={Style.Container}>
        <div className={Style.HeaderRow}>
          <h3>Device Management</h3>
          <div>
            <AddNewBtn onClick={showModal} text={"Add new"} />
          </div>
        </div>


        <div className={Style.TableWrapper}>
          <Table
            loading={loadingText}
            columns={allColumns}
            dataSource={dataSource}
            pagination={false}
            rowSelection={{
              type: 'checkbox',
            }}
            size="small"
          />
          <Pagination
            align="end"
            showTotal={(total) => `Total ${total} items`}
            current={currentPage}
            total={dataSource.length}
            pageSize={pageSize}
            onChange={(page, newSize) => {
              setCurrentPage(page);
              setPageSize(newSize);
            }}
            style={{ marginTop: 16 }}
          />
        </div>
      </div>


    </>
  );
};

export default ManageDriver;
