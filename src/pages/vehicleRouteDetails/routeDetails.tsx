import React, { useEffect, useState } from "react";
import Style from './Route.module.css';
import AddNewBtn from "../../components/button/addNewBtn";
import { Table, Pagination, Dropdown, Popconfirm } from 'antd';
import { CiMenuKebab } from 'react-icons/ci';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import AddRequisition from '../../Forms/requisitionForm';

const { TextArea } = Input;


interface Requisition {
  key: string;
  startingPoint: string;
  intermediateStops: string;
  destination: string;
  routeDescription: string;
  distance: string;
  estimatedTravelTime: string;
  driver: string;
  vehicle: string;
  purpose: string;
  specialInstructions: string;
  approval: string;
}

const Requisiton: React.FC = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Requisition[]>([]);
  const navigate = useNavigate();


  const handleBack = (): void => setFormVisible(false);
  const hideAddForm = (): void => setFormVisible(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const mockData: Requisition[] = [
        {
          key: "1",
          startingPoint: "Head Office, Karachi",
          intermediateStops: "- Factory 1, Korangi\n- Warehouse, Malir",
          destination: "Client Office, Clifton",
          routeDescription: "Shahrah-e-Faisal to Korangi Link Road, then to Malir and Clifton",
          distance: "50 km",
          estimatedTravelTime: "2 hours",
          driver: "Ahmed Khan (License: ABC123)",
          vehicle: "Toyota Hiace (Plate: XYZ-456)",
          purpose: "Client Meeting and Goods Delivery",
          specialInstructions: "Maintain 60 km/h speed, avoid Toll Road",
          approval: "Approved by Operations Manager",
        },
      ];
      setData(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Starting Point",
      dataIndex: "startingPoint",
      key: "startingPoint",
    },
    {
      title: "Intermediate Stops",
      dataIndex: "intermediateStops",
      key: "intermediateStops",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Route Description",
      dataIndex: "routeDescription",
      key: "routeDescription",
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "Estimated Travel Time",
      dataIndex: "estimatedTravelTime",
      key: "estimatedTravelTime",
    },
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
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
      title: "Special Instructions",
      dataIndex: "specialInstructions",
      key: "specialInstructions",
    },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
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
                onClick={() => console.log("Edit", record.key)}
              >
                Edit
              </div>
              <Popconfirm
                title="Are you sure you want to delete this requisition?"
                onConfirm={() => console.log("Delete", record.key)}
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
            <h3>Route Details</h3>
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
