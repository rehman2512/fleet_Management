import React, { useEffect, useState } from "react";
import Style from './ManageDriver.module.css';
import AddNewBtn from "../../components/button/addNewBtn";
import { Table, Pagination, Dropdown, Popconfirm } from 'antd';
import { CiMenuKebab } from 'react-icons/ci';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import AddDriverForm from '../../Forms/addDriver';

const { TextArea } = Input;

interface Driver {
  key: string;
  DRIVERID: string;
  licenseNO: string;
  License_Expiry: string;
  Contact_Information: string;
  Assigned_Vehicle: string;
  Performance_Score: string;
  FullName: string;
  Dob: string;
  driverEmail: string;
  experience: string;
  Address: string;
  status: string;
}

const ManageDriver: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [loadingText, setLoadingText] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const showModal = (): void => {
    // setForm(true);
    navigate('/Forms/addDriver')
  };
  const handleback = (): void => {
    setForm(false);
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const dataSource: Driver[] = [
    {
      key: "1",
      DRIVERID: "EXG4545FR01",
      licenseNO: "I-Link",
      License_Expiry: "08/12/2034",
      Contact_Information: "9876544567",
      Assigned_Vehicle: "Kl4 3456",
      Performance_Score: "4.8",
      FullName: "John Smith",
      Dob: "12/12/1990",
      driverEmail: "John@example.com",
      experience: "5 years",
      Address: "New York",
      status: "Active",
    },
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
      title: "DRIVER ID",
      dataIndex: "DRIVERID",
      key: "DRIVERID",
    },
    {
      title: "FULL NAME",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "DATE OF BIRTH",
      dataIndex: "Dob",
      key: "Dob",
    },
    {
      title: "LICENSE NUMBER",
      dataIndex: "licenseNO",
      key: "licenseNO",
    },
    {
      title: "LICENSE EXPIRY",
      dataIndex: "License_Expiry",
      key: "License_Expiry",
    },
    {
      title: "CONTACT NUMBER",
      dataIndex: "Contact_Information",
      key: "Contact_Information",
    },
    {
      title: "DRIVER EMAIL",
      dataIndex: "driverEmail",
      key: "driverEmail",
    },
    {
      title: "ADDRESS",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "EXPERIENCE",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "ASSIGNED VEHICLE",
      dataIndex: "Assigned_Vehicle",
      key: "Assigned_Vehicle",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "PERFORMANCE SCORE",
      dataIndex: "Performance_Score",
      key: "Performance_Score",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right" as const,
      render: () => (
        <Dropdown overlay={actionMenu} trigger={["click"]} placement="bottomRight">
          <CiMenuKebab className={Style.actionIcon} />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    setLoadingText(true);
    const timer = setTimeout(() => {
      setLoadingText(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {form ? (
        <AddDriverForm
          Back={() => console.log("Going back")}
          handleback={handleback}
        />
      ) : ( */}
        <div className={Style.Container}>
          <div className={Style.HeaderRow}>
            <h3>Manage Driver</h3>
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
              showTotal={(total: number) => `Total ${total} items`}
              current={currentPage}
              total={dataSource.length}
              pageSize={pageSize}
              onChange={(page: number, newSize: number) => {
                setCurrentPage(page);
                setPageSize(newSize);
              }}
              style={{ marginTop: 16 }}
            />
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default ManageDriver;
