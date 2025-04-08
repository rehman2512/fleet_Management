import React, { useState, useEffect } from 'react';
import style from './sider.module.css';
import Logo from '../src/Images/Logo_Image.png';
import { CiGrid41 } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { Menu } from 'antd';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiCarWheel } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FaRoute } from "react-icons/fa6";
import type { MenuProps } from 'antd';
import profile_image from '../src/Images/profile_image.png';
import Routing from './route/Routing';
import { useNavigate } from 'react-router-dom';
import { TbLiveView } from "react-icons/tb";





interface MenuItem {
  key: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'divider';
}
interface MenuItemClose {
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'divider';
}


const App: React.FC = () => {
  const navigate = useNavigate();
  const [isMenu, setMenu] = useState<boolean>(false);
  const [isView, setView] = useState<{ key: string } | string>({ key: 'GPS_Tracking' });
  const [isClient, setClient] = useState(false)

  useEffect(() => {
    setClient(true)
  }, [])


  const handleMenuToggle = () => {
    setMenu(!isMenu);
  };


  const items: MenuProps['items'] = [
    {
      key: 'GPS_Tracking',
      label: 'GPS Tracking',
      onClick: () => navigate('/'),
      icon: <FaMapMarkerAlt style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
    {
      key: 'Live_Tracking',
      label: 'Live Tracking',
      onClick: () => navigate('/LiveTracking/liveTracking'),
      icon: <TbLiveView style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
    {
        type: 'divider',
        key: "",
    },
    {
      key: 'Driver_Management',
      label: 'Driver Management',
      icon: <FaCarSide style={{ fontSize: 24, color: "#e1d7f9" }} />,
      children: [
        {key: 'Manage_Driver', label: 'Manage Driver', onClick: () => navigate('/DriverManagement/ManageDriver')},
        {key: 'Assigned_Driver', label: 'Assign Driver', onClick: () => navigate('/AssignedDriver/AssignDriver')},
        {key: 'Documents', label: 'Documents', onClick: () => navigate('/Documents/documents')},
        
      ],
    },
    {
      key: 'Device_Management',
      label: 'Device Management',
      icon: <BsFillFuelPumpFill style={{ fontSize: 24, color: "#e1d7f9" }} />,
      children: [
        { key: 'Devices', label: 'Devices', onClick: () => navigate('/DeviceManagement/deviceManagement') },
        { key: 'Assigned Devices', label: 'Assigned Devices' , onClick: () => navigate('/AssignDevices/assignDevices')},
      ],
    },

    {
      key: 'Vehicle_Management',
      label: 'Vehicle Management',
      icon: <GiCarWheel style={{ fontSize: 24, color: "#e1d7f9" }} />,
      children: [
        { key: 'Vehcle_Management', label: 'Vehicle Management', onClick: () => navigate('/VehicleManagement/VehiceManage')  },
        { key: 'Vehicle_history', label: 'Vehicle history', onClick: () => navigate('/VehicleManagement/VehiceManage')   },
      ],
    },
    {
      key: 'Vehicle_Requisition',
      label: 'Vehicle Requisition',
      icon: <FaRoute style={{ fontSize: 24, color: "#e1d7f9" }} />,
      children: [
        { key: 'Manage_Vehicle_Requisition', label: 'Manage Vehicle Requisition', onClick: () => navigate('/ManageVehicleRequisition/manageVehicleRequisition')},
        { key: 'Vehicle_Route_Details', label: 'Vehicle Route Details', onClick: () => navigate('/vehicleRouteDetails/routeDetails') },
        
      ],
    },
    {
      key: 'User_Management',
      label: 'User Management',
      icon: <FaUserCircle style={{ fontSize: 24, color: "#e1d7f9" }} />,
      children: [
        { key: 'Role', label: 'Role' },
        { key: 'User', label: 'User' },
      ],
    },
  ];

  const itemsClose: MenuProps['items'] = [
    {
      key: 'GPS_Tracking',
      icon: <FaMapMarkerAlt style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
    {
      type: 'divider',
      key: "",
    },
    {
      key: 'Driver_Management',
      icon: <FaCarSide style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
    {
      key: 'Vehicle_Management',
      icon: <GiCarWheel style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
    {
      key: 'Vehicle_Requisition',
      icon: <FaRoute style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
    {
      key: 'User_Management',
      icon: <FaUserCircle style={{ fontSize: 24, color: "#e1d7f9" }} />,
    },
  ];

  const HandleClick: MenuProps['onClick'] = (info) => {
    setView({ key: info.key });
  };

  return (
    <div className={`container-fluid ${style.containerFluid}`}>
      <div className={`row ${style.row}`}>
        <div className={style.sidersMenus}>
          {isMenu ? (
            <div className={style.ContainerClose}>
              {isClient && (
                <img alt='logo' src={Logo} className={style.LogoClose} width={100} height={100} />
              )}
              <div className={style.sideList}>
                <Menu
                  onClick={HandleClick}
                  items={itemsClose}
                  defaultSelectedKeys={['GPS_Tracking']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  style={{ border: "none", }}
                  className={style.sideListMenu}
                />
              </div>
            </div>
          ) : (
            <div className={style.Container}>
              {isClient && (
                <img alt='logo' src={Logo} className={style.LogoOpen} width={200} height={90} />
              )}
              <div className={style.sideList}>
                <Menu
                  onClick={HandleClick}
                  items={items}
                  defaultSelectedKeys={['GPS_Tracking']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  style={{ border: "none", color: "#626C70", fontSize: "14px" }}
                  className={`${style.sideListMenu} ${style.custommenu}`}
                  theme='light'
                />
              </div>
            </div>
          )}

          <div className={style.contentSide}>
            <div className={style.ContainerHeader}>
              <div className={style.headerSearch}>
                <IoMdMenu size={24} className={style.menuIcon} onClick={handleMenuToggle} />
              </div>
              <div className={style.profile}>
                <CiGrid41 className={style.amdin} size={24} color='#e1d7f9' />
                <IoIosNotificationsOutline className={style.amdin} size={24} color='#e1d7f9' />
                <div className={style.profileContainer}>
                  {isClient && (
                    <img src={profile_image} alt='profile' width={35} height={35} className={style.profileImg} />
                  )}
                </div>
              </div>
            </div>
            <div style={{overflow:'auto',flexGrow:1}}>
              <Routing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
