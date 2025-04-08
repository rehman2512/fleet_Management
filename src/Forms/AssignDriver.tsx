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



// interface PersonalInfoFormProps {
//   Back: () => void;
//   handleback: () => void;
// }


const validationSchema = yup.object().shape({
  Name: yup.string().required('invalid'),
  Email: yup.string().required('Password is required'),
  Contact: yup.string().required('Contact is required'),
});

const PersonalInfoForm: React.FC = ({ }) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState(false);
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  // console.log(Back)
  const HandleBack = () => {
    navigate('/AssignedDriver/AssignDriver')
  }

  useEffect(() => {
    setIsClient(true);
  }, []);



  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      Name: '',
      Email: '',
      Contact: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
      message.open({
        message: 'Login Successful',
        description: 'You have successfully logged in.',
        type: 'success',
        duration: 0,
      })
    }, 2000);
    setTimeout(() => {
      navigate('/home');
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
                    Label='Driver Name'
                    placeholder='Enter Driver Name'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Name'
                    type="Name"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                <FormSelect
                    Label='Assigned Vehicle'
                    control={control}
                    name="AssignedVehicle"
                    options={[
                      { label: 'Suzuki', value: 'US' },
                      { label: 'Honda', value: 'CA' },
                      { label: 'Kia', value: 'UK' },
                      { label: 'Ford', value: 'AU' }
                    ]}
                    placeholder="Assigned Vehicle"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  />

                  {/* <FormInput
                    placeholder='Enter Your Email'
                    Label='Email'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Email'
                    type="Email"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
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
                  {/* <FormInput
                    placeholder='Date Of Birth'
                    Label='Date Of Birth'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='dateOfbirth'
                    type="date"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
              </div>
              <div className={style.formSetting}>
                <div className={style.field}>
                  {/* <FormInput
                    Label='License Number'
                    placeholder='License Number'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='LicenseNumber'
                    type="number"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
                <div className={style.field}>
                  {/* <FormInput
                    placeholder='License Expiry Date'
                    Label='License Expiry Date'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='LicenseExpiryDate'
                    type="date"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
                <div className={style.field}>
                  {/* <FormInput
                    placeholder='Contact Number'
                    Label='Contact Number'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='ContactNumber'
                    type="number"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
              </div>
              <div className={style.formSetting}>
                <div className={style.field}>
                  {/* <FormInput
                    Label='Address'
                    placeholder='Address'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Address'
                    type="text"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
                <div className={style.field}>
                  {/* <FormInput
                    placeholder='Experience'
                    Label='Experience'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Experience'
                    type="text"
                    errors={errors}
                    control={control}
                  /> */}
                </div>
                <div className={style.field}>
                  {/* <FormSelect
                    Label='Assigned Vehicle'
                    control={control}
                    name="AssignedVehicle"
                    options={[
                      { label: 'Suzuki', value: 'US' },
                      { label: 'Honda', value: 'CA' },
                      { label: 'Kia', value: 'UK' },
                      { label: 'Ford', value: 'AU' }
                    ]}
                    placeholder="Assigned Vehicle"
                    errors={errors}
                    errorClass="error-text"
                    showError={true}
                  /> */}
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
