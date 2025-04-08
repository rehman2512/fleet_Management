import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { FaArrowLeft } from "react-icons/fa";

const validationSchema = yup.object().shape({
  DeviceName: yup.string().required('Device Name is required'),
  DeviceType: yup.string().required('Device Type is required'),
  DeviceModel: yup.string().required('Device Model is required'),
  Manufacturer: yup.string().required('Manufacturer is required'),
  DeviceSerialNumber: yup.string().required('Serial Number is required'),
  FirmwareVersion: yup.string().required('Firmware Version is required'),
  DeviceStatus: yup.string().required('Device Status is required'),
  AssignedVehicle: yup.string().required('Assigned Vehicle is required'),
});

const DeviceForm: React.FC = () => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      DeviceName: '',
      DeviceType: '',
      DeviceModel: '',
      Manufacturer: '',
      DeviceSerialNumber: '',
      FirmwareVersion: '',
      DeviceStatus: '',
      AssignedVehicle:'',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      message.open({
        message: 'Device Added Successfully',
        description: 'The device information has been saved.',
        type: 'success',
        duration: 2,
      });
    }, 2000);
    setTimeout(() => {
      navigate('/DeviceManagement/deviceManagement');
    }, 3000);
  };

  const handleBack = () => {
    navigate('/DeviceManagement/deviceManagement');
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className={`container-fluid ${style.Container}`}>
        <FaArrowLeft size={24} color="#aa91ed" onClick={handleBack} />
        <div className={`row ${style.row}`}>
          <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.formSetting}>
                  <div className={style.field}>
                    <FormInput
                      Label="Device Name"
                      placeholder="Enter Device Name"
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name="DeviceName"
                      type="text"
                      errors={errors}
                      control={control}
                    />
                  </div>
                  <div className={style.field}>
                    <FormSelect
                      Label="Device Type"
                      control={control}
                      name="DeviceType"
                      options={[
                        { label: 'GPS Tracker', value: 'GPS Tracker' },
                        { label: 'Telematics Device', value: 'Telematics Device' },
                        { label: 'IoT Sensor', value: 'IoT Sensor' },
                        { label: 'OBD-II Reader', value: 'OBD-II Reader' },
                      ]}
                      placeholder="Select Device Type"
                      errors={errors}
                      errorClass="error-text"
                      showError={true}
                    />
                  </div>
                  <div className={style.field}>
                    <FormInput
                      Label="Device Model"
                      placeholder="Enter Device Model"
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name="DeviceModel"
                      type="text"
                      errors={errors}
                      control={control}
                    />
                  </div>
               </div> 
              <div className={style.formSetting}>

                <div className={style.field}>
                <FormSelect
                    Label="Assigned Driver"
                    control={control}
                    name="DeviceStatus"
                    options={[
                      { label: 'Jhon', value: 'Jhon' },
                      { label: 'Mark', value: 'Mark' },
                      { label: 'Smith', value: 'Smith' },
                    ]}
                    placeholder="Select Assigned Driver"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  />
                </div>
                <div className={style.field}>
                <FormSelect
                    Label="Assigned Vehicle"
                    control={control}
                    name="AssignedVehicle"
                    options={[
                      { label: 'Civic', value: 'Civic' },
                      { label: 'Truck', value: 'Truck' },
                      { label: 'Ford Truck', value: 'Ford Truck' },
                    ]}
                    placeholder="Select Assigned Vehicle"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  />
                </div>
                <div className={style.field}>
                  {/* <FormInput
                    Label="Firmware Version"
                    placeholder="Enter Firmware Version"
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name="FirmwareVersion"
                    type="text"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
               </div>
              <div className={style.formSetting}>

                <div className={style.field}>
                  {/* <FormSelect
                    Label="Device Status"
                    control={control}
                    name="DeviceStatus"
                    options={[
                      { label: 'Active', value: 'Active' },
                      { label: 'Inactive', value: 'Inactive' },
                      { label: 'Maintenance Mode', value: 'Maintenance Mode' },
                    ]}
                    placeholder="Select Device Status"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  /> */}
                </div>
              </div>
              <Button Text="Save Device" buttonClass={style.buttonSignIn} Disable={spinning} onClick={() => setSpinning} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceForm;
