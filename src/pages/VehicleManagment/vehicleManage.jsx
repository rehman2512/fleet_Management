import React, { useEffect, useState } from "react";
import Style from './vehicle.module.css'
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
    navigate('/Forms/addVehicle')
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
        VehicleId: "EXG4545FR01",
        Vehicle_Registration_Number: "Kl4 3456",
        Vehicle_Type: "Sedan",
        Manufacturer_And_Model: "Suzuki Sehzor",
        Manufacturer_Year: "2018",
        Engine_Capacity: "4.8L",
        Fuel_Type: "Petrol",
        Current_Odometer_Reading: "98765 km",
        Assigned_Driver: "John Smith",
        Maintance_Status: "Due in 5 years",
        status: "Active"
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
      title: "Vehicle Id",
      dataIndex: "VehicleId",
      key: "VehicleId",
    },
    {
      title: "Vehicle Registration Number",
      dataIndex: "Vehicle_Registration_Number",
      key: "Vehicle_Registration_Number",
    },
    {
      title: "Vehicle Type",
      dataIndex: "Vehicle_Type",
      key: "Vehicle_Type",

    },
    {
      title: "Manufacturer And Model",
      dataIndex: "Manufacturer_And_Model",
      key: "Manufacturer_And_Model",
    },
    {
        title: "Manufacturer Year",
        dataIndex: "Manufacturer_Year",
        key: "Manufacturer_Year",
      },
      {
        title: "Engine Capacity",
        dataIndex: "Engine_Capacity",
        key: "Engine_Capacity",
      },
      {
        title: "Fuel Type",
        dataIndex: "Fuel_Type",
        key: "Fuel_Type",
      },
      {
        title: "Current Odometer Reading",
        dataIndex: "Current_Odometer_Reading",
        key: "Current_Odometer_Reading",
      },
      {
        title: "Assigned Driver",
        dataIndex: "Assigned_Driver",
        key: "Assigned_Driver",
      },
      {
        title: "Maintance Status",
        dataIndex: "Maintance_Status",
        key: "Maintance_Status",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
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
          <h3>Vehicle Management</h3>
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
