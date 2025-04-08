import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormCheckBox, FormSelect } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";



interface VehicleForm {
  VehicleID: string;
  VehicleName: string;
  LicensePlateNumber: string;
  VehicleType: string;
  Model: string;
  Manufacturer: string;
  YearOfManufacture: string;
  Status: string;
  FuelType: string;
  Mileage: string;
  AssignedDriver: string;
  InsurancePolicy: string;
  RegistrationDate: string;
  LastServiceDate: string;
  NextServiceDue: string;
  Color: string;
  GPSTrackerID: string;
  Ownership: string;
  Capacity: string;
}




const validationSchema = yup.object().shape({
  VehicleID: yup.string().required('Vehicle ID is required'),
  VehicleName: yup.string().required('Vehicle Name is required'),
  LicensePlateNumber: yup.string().required('License Plate Number is required'),
  VehicleType: yup.string().required('Vehicle Type is required'),
  Model: yup.string().required('Model is required'),
  Manufacturer: yup.string().required('Manufacturer is required'),
  YearOfManufacture: yup.string().required('Year of Manufacture is required'),
  Status: yup.string().required('Status is required'),
  FuelType: yup.string().required('Fuel Type is required'),
  Mileage: yup.string().required('Mileage is required'),
  AssignedDriver: yup.string().required('Assigned Driver is required'),
  InsurancePolicy: yup.string().required('Insurance Policy is required'),
  RegistrationDate: yup.string().required('Registration Date is required'),
  LastServiceDate: yup.string().required('Last Service Date is required'),
  NextServiceDue: yup.string().required('Next Service Due is required'),
  Color: yup.string().required('Color is required'),
  GPSTrackerID: yup.string().required('GPS Tracker ID is required'),
  Ownership: yup.string().required('Ownership is required'),
  Capacity: yup.string().required('Capacity is required'),
});

const PersonalInfoForm: React.FC = ({ }) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setIsClient(true);
  }, []);

  const HandleBack = () => {
    navigate('/VehicleManagement/VehiceManage')
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<VehicleForm>({
    defaultValues: {
      VehicleID: '',
      VehicleName: '',
      LicensePlateNumber: '',
      VehicleType: '',
      Model: '',
      Manufacturer: '',
      YearOfManufacture: '',
      Status: '',
      FuelType: '',
      Mileage: '',
      AssignedDriver: '',
      InsurancePolicy: '',
      RegistrationDate: '',
      LastServiceDate: '',
      NextServiceDue: '',
      Color: '',
      GPSTrackerID: '',
      Ownership: '',
      Capacity: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<VehicleForm> = (data) => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      message.open({
        message: 'Vehicle Added Successfully',
        description: 'Vehicle information has been saved.',
        type: 'success',
        duration: 2,
      });
    }, 2000);
    setTimeout(() => {
      navigate('/vehicle-list');
    }, 3000);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className={`container-fluid ${style.Container}`}>
        <FaArrowLeft size={24} color='#aa91ed' onClick={HandleBack} />
        <div className={`row ${style.row}`}>
          <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormInput
                    Label='VehicleID'
                    placeholder='Enter Your VehicleID'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='VehicleID'
                    type="VehicleID"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormSelect
                    Label='Vehicle'
                    control={control}
                    name="Vehicle"
                    options={[
                      { label: 'Suzuki', value: 'US' },
                      { label: 'Honda', value: 'CA' },
                      { label: 'Kia', value: 'UK' },
                      { label: 'Ford', value: 'AU' }
                    ]}
                    placeholder="Vehicle"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='License PlateNumber'
                    Label='License PlateNumber'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='LicensePlateNumber'
                    type="LicensePlateNumber"
                    errors={errors}
                    control={control}
                  />
                </div>
              </div>
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormSelect
                    Label='Vehicle Type'
                    control={control}
                    name="VehicleType"
                    options={[
                      { label: 'SUV', value: 'SUV' },
                      { label: 'Sedan', value: 'Sedan' },
                      { label: 'Pickup Truck', value: 'Pickup Truck' },
                      { label: 'Ev', value: 'Ev' }
                    ]}
                    placeholder="Assigned Vehicle"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='Enter Your VehicleName'
                    Label='VehicleName'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='VehicleName'
                    type="VehicleName"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='Mileage'
                    Label='Mileage'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Mileage'
                    type="text"
                    errors={errors}
                    control={control}
                  />
                </div>
              </div>
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormSelect
                    Label='Vehicle Type'
                    control={control}
                    name="VehicleType"
                    options={[
                      { label: 'SUV', value: 'SUV' },
                      { label: 'Sedan', value: 'Sedan' },
                      { label: 'Pickup Truck', value: 'Pickup Truck' },
                      { label: 'Ev', value: 'Ev' }
                    ]}
                    placeholder="Assigned Vehicle"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='Capacity'
                    Label='Capacity'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Capacity'
                    type="Capacity"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='Color'
                    Label='Color'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Color'
                    type="text"
                    errors={errors}
                    control={control}
                  />
                </div>
              </div>
              <Button Text='ADD' buttonClass={style.buttonSignIn} Disable={spinning} onClick={() => setSpinning} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



export default PersonalInfoForm;
