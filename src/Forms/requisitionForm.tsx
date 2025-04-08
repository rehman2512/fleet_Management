import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import SubmitButton from '../components/Basic/button';
import { notification, Spin, Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const validationSchema = yup.object().shape({
  fleetName: yup.string().required('Fleet name is required'),
  vehicleType: yup.string().required('Vehicle type is required'),
  startDate: yup.date().nullable().required('Start date is required'),
  endDate: yup.date().nullable().required('End date is required'),
  driverName: yup.string().required('Driver name is required'),
  pickupLocation: yup.string().required('Pickup location is required'),
  dropoffLocation: yup.string().required('Drop-off location is required'),
  MaterialType: yup.string().required('Material Type is required'),
  Quantity: yup.string().required('Quantity is required'),
});

const AddFleetRequisitionForm: React.FC = ({}) => {
  const [spinning, setSpinning] = useState(false);
  const [message, contextHolder] = notification.useNotification();
  const [Material, setMaterial] = useState<{ key: number; materialType: string; Quantity: string }[]>([]);
  const navigate = useNavigate();

  const HandleBack = () => {
    navigate('/ManageVehicleRequisition/manageVehicleRequisition');
  }

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
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
      MaterialType: '',
      Quantity: '',
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
        message: "Fleet Requisition Added Successfully!",
      });
      navigate('/requisition-list');
    }, 2000);
  };

  const MaterialList = () => {
    const MaterialType = getValues('MaterialType');
    const Quantity = getValues('Quantity');
    let generatedRows = [...Material]; // Copy existing rows
    let index = generatedRows.length; // Get the next index

    if (MaterialType && Quantity) {
      generatedRows.push({
        key: index,
        materialType: MaterialType,
        Quantity: Quantity,
      });
    }

    setMaterial(generatedRows);
    setValue('MaterialType', '');
    setValue('Quantity', '');
  }

  const DeleteMaterial = (key: number) => {
    const updatedRows = Material.filter((row) => row.key!== key);
    setMaterial(updatedRows);
  }

  const Column = [
    {
      title: 'Material Type',
      dataIndex: 'materialType',
      key: 'materialType',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <FaTrash
          className={style.deleteIcon}
          onClick={() => DeleteMaterial(record.key)}
          title="Delete Field"
        />
        // <Button type="link" >Delete</Button>
      ),
    }
  ]

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className={`container-fluid ${style.Container}`}>
        <FaArrowLeft size={24} color='#aa91ed' onClick={HandleBack} />
        <h2 className={style.title}>Add Fleet Requisition</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.formSetting}>
            <div className={style.field}>
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
            </div>
            <div className={style.field}>
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
            <div className={style.field}>
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
            </div>
          </div>
          <div className={style.formSetting}>
            <div className={style.field}>
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
            <div className={style.field}>
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
            </div>
            <div className={style.field}>
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
            </div>
          </div>
          <div className={style.formSetting}>
            <div className={style.field}>
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
          </div>
          <form action="">
            <div className={style.formSetting}>
              <div className={style.field}>
                <FormSelect
                  Label="Material Type"
                  control={control}
                  name="MaterialType"
                  options={[
                    { label: 'Lubricant', value: 'Lubricant' },
                    { label: 'Garments', value: 'Garments ' },
                    { label: 'Concrete', value: 'Concrete' },
                  ]}
                  placeholder="Select Material Type"
                  errors={errors}
                  errorClass={style.Error}
                />
              </div>
              <div className={style.field}>
                <FormInput
                  Label="Quantity"
                  placeholder="Enter Quantity"
                  classInput={style.Input}
                  className={style.inputContainer}
                  labelClass={style.Label}
                  classError={style.Error}
                  name="Quantity"
                  type="text"
                  errors={errors}
                  control={control}
                />
              </div>
              <div className={style.field}>
                <Button style={{ width: "150px", height: "40px", marginTop: "39px", color: "white", backgroundColor: "#aa91ed" }} onClick={MaterialList}>Add</Button>
              </div>

            </div>
              {Material.length > 0 && (
                <Table
                  columns={Column}
                  dataSource={Material}
                  size='small'
                  pagination={false}
                />
              )}
          </form>
          <SubmitButton Text="Add Requisition" buttonClass={style.buttonSignIn} Disable={spinning} onClick={handleSubmit(onSubmit)} />
        </form>
        <form action="">
        </form>
      </div>
    </>
  );
};

export default AddFleetRequisitionForm;