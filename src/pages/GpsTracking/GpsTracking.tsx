import React, { useState, useEffect } from 'react';
import style from '../../components/Sider/sider.module.css';
import Logo from '../../Images/Logo_Image.png';
import { CiGrid41 } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { Menu } from 'antd';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FaRoute } from "react-icons/fa6";
import type { MenuProps } from 'antd';
import profile_image from '../../Images/profile_image.png';
import PersonalInfo from '../../components/PersonalInformation/PersonalInformation';
import Tracking from '../../components/GppTracking/gpsTracking';
import LicensesCertifications from '../../components/LicensesCertifications/LicensesCertifications';
import DrivingHistory from '../../components/DrivingHistory/DrivingHistory'
import TrackDetails from '../../components/TrackDetails/TrackDetails';
import VehicleDetails from '../../components/VehicleDetails/VehicleDetails';
import ServiceDetails from '../../components/ServiceDetails/ServiceDetails';
import { useNavigate } from 'react-router-dom';





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


const Sider: React.FC = () => {
    const [isMenu, setMenu] = useState<boolean>(false);
    const [isView, setView] = useState<{ key: string } | string>({ key: 'GPS_Tracking' });
    const [isClient, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])


   

    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setMenu(!isMenu);
    };

    const HandleClick: MenuProps['onClick'] = (info) => {
        switch (info.key) {
            case 'GPS_Tracking':
                navigate('/gps-tracking');
                break;
            case 'Personal_information':
                navigate('/personal-information');
                break;
            case 'Driving_history':
                navigate('/driving-history');
                break;
            case 'Licenses_certifications':
                navigate('/licenses-certifications');
                break;
            case 'Tracks_details':
                navigate('/tracks-details');
                break;
            case 'Vehicle_details':
                navigate('/vehicle-details');
                break;
            case 'Service_history':
                navigate('/service-history');
                break;
            default:
                break;
        }
    };


    const items: MenuProps['items'] = [
        {
            key: 'GPS_Tracking',
            label: 'GPS Tracking',
            icon: <FaMapMarkerAlt style={{ fontSize: 24, color: "#e1d7f9" }} />,
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
                { key: 'Personal_information', label: 'Personal information' },
                { key: 'Licenses_certifications', label: 'Licenses and certifications' },
                { key: 'Driving_history', label: 'Driving history' },
            ],
        },
        {
            key: 'Vehicle_Management',
            label: 'Vehicle Management',
            icon: <GiCarWheel style={{ fontSize: 24, color: "#e1d7f9" }} />,
            children: [
                { key: 'Tracks_details', label: 'Tracks details' },
                { key: 'Vehicle_details', label: 'Vehicle details' },
                { key: 'Service_history', label: 'Service history' },
            ],
        },
        {
            key: 'Route_and_Dispatch_Management',
            label: 'Route and Dispatch Management',
            icon: <FaRoute style={{ fontSize: 24, color: "#e1d7f9" }} />,
            children: [
                { key: 'Route planning and optimization', label: 'Route planning and optimization' },
                { key: 'Dynamic dispatching', label: 'Dynamic dispatching' },
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
            key: 'Route_and_Dispatch_Management',
            icon: <FaRoute style={{ fontSize: 24, color: "#e1d7f9" }} />,
        },
        {
            key: 'User_Management',
            icon: <FaUserCircle style={{ fontSize: 24, color: "#e1d7f9" }} />,
        },
    ];


    return (
        <section>
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
                            <div>
                                {typeof isView === 'object' && isView.key === 'GPS_Tracking' && <Tracking />}
                                {typeof isView === 'object' && isView.key === 'Personal_information' && <PersonalInfo />}
                                {typeof isView === 'object' && isView.key === 'Driving_history' && <DrivingHistory />}
                                {typeof isView === 'object' && isView.key === 'Licenses_certifications' && <LicensesCertifications />}
                                {typeof isView === 'object' && isView.key === 'Tracks_details' && <TrackDetails />}
                                {typeof isView === 'object' && isView.key === 'Vehicle_details' && <VehicleDetails />}
                                {typeof isView === 'object' && isView.key === 'Service_history' && <ServiceDetails />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sider;
