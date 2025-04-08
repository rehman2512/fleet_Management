import React, { useEffect, useState } from "react";
import Style from './requisition.module.css';
import AddNewBtn from "../../components/button/addNewBtn";
import { Table, Pagination, Dropdown, Popconfirm } from 'antd';
import { CiMenuKebab } from 'react-icons/ci';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import AddRequisition from '../../Forms/requisitionForm';

const { TextArea } = Input;

interface Requisition {
  key: string;
  requisitionID: string;
  vehicle: string;
  purpose: string;
  startDate: string;
  endDate: string;
  requester: string;
  status: string;
}

const Requisiton: React.FC = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Requisition[]>([]);
  const navigate = useNavigate();


  const handleBack = (): void => setFormVisible(false);
  const hideAddForm = (): void => {
    navigate('/Forms/requisitionForm');
  }

 useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const mockData: Requisition[] = [
        {
          key: "1",
          requisitionID: "REQ-001",
          vehicle: "Honda Civic",
          purpose: "Business Trip",
          startDate: "2025-01-20",
          endDate: "2025-01-21",
          requester: "John Doe",
          status: "Approved",
        },
        {
          key: "2",
          requisitionID: "REQ-002",
          vehicle: "Toyota Corolla",
          purpose: "Client Visit",
          startDate: "2025-01-22",
          endDate: "2025-01-23",
          requester: "Jane Smith",
          status: "Pending",
        },
      ];
      setData(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Table Columns
  const columns = [
    {
      title: "Requisition ID",
      dataIndex: "requisitionID",
      key: "requisitionID",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Requester",
      dataIndex: "requester",
      key: "requester",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Requisition) => (
        <Dropdown
          overlay={
            <div className={Style.actions}>
              <div
                className={Style.dropdownItem}
                onClick={() => console.log("Edit", record.requisitionID)}
              >
                Edit
              </div>
              <Popconfirm
                title="Are you sure you want to delete this requisition?"
                onConfirm={() => console.log("Delete", record.requisitionID)}
                okText="Yes"
                cancelText="No"
              >
                <div className={Style.dropdownItem}>Delete</div>
              </Popconfirm>
            </div>
          }
          trigger={["click"]}
        >
          <CiMenuKebab className={Style.actionIcon} />
        </Dropdown>
      ),
    },
  ];


  return (
    <>
      
        <div className={Style.Container}>
          <div className={Style.HeaderRow}>
            <h3>Manage Requisitions</h3>
            <AddNewBtn onClick={hideAddForm} text="Add New Requisition"  />
          </div>
          <div className={Style.TableWrapper}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={data}
              pagination={false}
              size="small"
            />
            <Pagination
              current={currentPage}
              total={data.length}
              pageSize={pageSize}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              style={{ marginTop: 16 }}
            />
          </div>
        </div>
    </>
  );
};

export default Requisiton;
