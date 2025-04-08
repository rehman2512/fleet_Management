import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn/SignIn';
import GPSTrackingScreen from '../pages/GppTracking/gpsTracking';
import ManageDriver from '../pages/ManageDriver/ManageDriver';
import VehiceManage from '../pages/VehicleManagment/vehicleManage'
import FuelManagement from '../pages/DeviceManagement/deviceManagement'
import Requisiton from '../pages/ManageVehicleRequisition/manageVehicleRequisition';
import RouteDetail from '../pages/vehicleRouteDetails/routeDetails'
import DriverHistory from '../pages/AssignedDriver/AssignDriver'
import AddDriver from '../Forms/addDriver'
import AddDevices from '../Forms/addDevices'
import AddVehicle from '../Forms/addVehicle'
import LiveTracking from '../pages/LiveTracking/liveTracking'
import AddRequisition from '../Forms/requisitionForm'
import AssignDriver from '../Forms/AssignDriver'
import AssignDevice from '../pages/AssignDevices/assignDevices'
import AssignDevices from '../Forms/assignedDevices'
import Documents from '../pages/Documents/documents';
import AddFleetRequisitionForm from '../Forms/requisitionForm';



const Routing: React.FC = () => {
  return (
      <Routes>
        {/* Screen Route */}
        <Route path="/" element={<GPSTrackingScreen />} />
        <Route path="/DriverManagement/ManageDriver" element={<ManageDriver />} />
        <Route path="/LiveTracking/liveTracking" element={<LiveTracking />} />
        <Route path="/VehicleManagement/VehiceManage" element={<VehiceManage />} />
        <Route path="/DeviceManagement/deviceManagement" element={<FuelManagement />} />
        <Route path="/ManageVehicleRequisition/manageVehicleRequisition" element={<Requisiton />} />
        <Route path="/vehicleRouteDetails/routeDetails" element={<RouteDetail />} />
        <Route path="/AssignedDriver/AssignDriver" element={<DriverHistory />} />
        <Route path="/AssignDevices/assignDevices" element={<AssignDevice />} />
        <Route path="/Documents/documents" element={<Documents />} />
        {/* Form Route */} 
        <Route path="/Forms/addDriver" element={ <AddDriver  /> } />
        <Route path="/Forms/AssignDriver" element={ <AssignDriver  /> } />
        <Route path="/Forms/addDevices" element={ <AddDevices  /> } />
        <Route path="/Forms/assignedDevices" element={ <AssignDevices  /> } />
        <Route path="/Forms/addVehicle" element={ <AddVehicle  /> } />
        <Route path="/Forms/requisitionForm" element={ <AddFleetRequisitionForm /> } />

      </Routes>
  )
}

export default Routing;


