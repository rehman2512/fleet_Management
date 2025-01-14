import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormCheckBox } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";



interface Form {
  Name: string;
  Email: string;
  Contact: string;
}

interface PersonalProps {
  Back:() => void;
}


const validationSchema = yup.object().shape({
  Name: yup.string().required('invalid'),
  Email: yup.string().required('Password is required'),
  Contact: yup.string().required('Contact is required'),
});

const PersonalInfoForm: React.FC<PersonalProps> = ({Back}) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState(false);
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
 console.log(Back)


  useEffect(() => {
    setIsClient(true);
  }, []);



  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({
    defaultValues: {
      Name: '',
      Email: '',
      Contact: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Form> = () => {
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
        <FaArrowLeft size={24} color='#aa91ed' onClick={Back} />
        <div className={`row ${style.row}`}>
          <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormInput
                    Label='Name'
                    placeholder='Enter Your Name'
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
                  <FormInput
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
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='Contact'
                    Label='Contact'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Contact'
                    type="Contact"
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
