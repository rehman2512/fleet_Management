import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { notification, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface AddFleetRequisitionFormProps {
  handleBack: () => void;
}

const validationSchema = yup.object().shape({
  fleetName: yup.string().required('Fleet name is required'),
  vehicleType: yup.string().required('Vehicle type is required'),
  startDate: yup.date().nullable().required('Start date is required'),
  endDate: yup.date().nullable().required('End date is required'),
  driverName: yup.string().required('Driver name is required'),
  pickupLocation: yup.string().required('Pickup location is required'),
  dropoffLocation: yup.string().required('Drop-off location is required'),
});

const AddFleetRequisitionForm: React.FC<AddFleetRequisitionFormProps> = ({ handleBack }) => {
  const [spinning, setSpinning] = useState(false);
  const [message, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fleetName: '',
      vehicleType: '',
      startDate: undefined,
      endDate: undefined,
      driverName: '',
      pickupLocation: '',
      dropoffLocation: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    setSpinning(true);
    console.log('Requisition Data:', data);

    setTimeout(() => {
      setSpinning(false);
      message.success({
        message: 'Fleet Requisition Added Successfully!',
      });
      navigate('/requisition-list'); // Redirect to the requisition list page
    }, 2000);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className={`container-fluid ${style.Container}`}>
        <div className={style.header}>
          <FaArrowLeft size={24} color="#aa91ed" onClick={handleBack} />
          <h2 className={style.title}>Add Fleet Requisition</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          {/* Fleet Details */}
          <div className={style.formSetting}>
            <FormInput
              Label="Fleet Name"
              placeholder="Enter Fleet Name"
              classInput={style.Input}
              className={style.inputContainer}
              labelClass={style.Label}
              classError={style.Error}
              name="fleetName"
              type="text"
              errors={errors}
              control={control}
            />
            <FormSelect
              Label="Vehicle Type"
              control={control}
              name="vehicleType"
              options={[
                { label: 'Truck', value: 'Truck' },
                { label: 'Van', value: 'Van' },
                { label: 'Car', value: 'Car' },
                { label: 'Bike', value: 'Bike' },
              ]}
              placeholder="Select Vehicle Type"
              errors={errors}
              errorClass={style.Error}
            />
          </div>

          {/* Journey Dates */}
          <div className={style.formSetting}>
            <FormInput
              Label="Start Date"
              placeholder="Enter Start Date"
              classInput={style.Input}
              className={style.inputContainer}
              labelClass={style.Label}
              classError={style.Error}
              name="startDate"
              type="date"
              errors={errors}
              control={control}
            />
            <FormInput
              Label="End Date"
              placeholder="Enter End Date"
              classInput={style.Input}
              className={style.inputContainer}
              labelClass={style.Label}
              classError={style.Error}
              name="endDate"
              type="date"
              errors={errors}
              control={control}
            />
          </div>

          {/* Driver and Location Details */}
          <div className={style.formSetting}>
            <FormInput
              Label="Driver Name"
              placeholder="Enter Driver Name"
              classInput={style.Input}
              className={style.inputContainer}
              labelClass={style.Label}
              classError={style.Error}
              name="driverName"
              type="text"
              errors={errors}
              control={control}
            />
            <FormInput
              Label="Pickup Location"
              placeholder="Enter Pickup Location"
              classInput={style.Input}
              className={style.inputContainer}
              labelClass={style.Label}
              classError={style.Error}
              name="pickupLocation"
              type="text"
              errors={errors}
              control={control}
            />
            <FormInput
              Label="Drop-off Location"
              placeholder="Enter Drop-off Location"
              classInput={style.Input}
              className={style.inputContainer}
              labelClass={style.Label}
              classError={style.Error}
              name="dropoffLocation"
              type="text"
              errors={errors}
              control={control}
            />
          </div>

          {/* Submit Button */}
          <Button
            Text="Add Requisition"
            buttonClass={style.buttonSignIn}
            Disable={spinning}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </>
  );
};

export default AddFleetRequisitionForm;
