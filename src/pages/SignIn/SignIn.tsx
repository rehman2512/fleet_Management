import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './SignIn.module.css';
import SignInImage from '../../Images/SignIn_Image.png';
import LogoImage from '../../Images/Logo_Image.png';
import { FormInput, FormCheckBox } from '../../components/Basic/FormInput';
import Button from '../../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { Link } from 'react-router-dom';


interface SignInForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}


const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format. Add `@`.').required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean(),
});

const SignIn: React.FC = ({}) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState(false);
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();

  
  
  useEffect(() => {
    setIsClient(true);
  }, []);



  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<SignInForm> = () => {
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
        <div className={`row ${style.row}`}>
          <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            {isClient && (
              <img src={LogoImage} alt='Company Logo' className={style.Logo} width={200} height={100} />
            )}
            <h4>Sign In</h4>
            <p>Sign in to stay connected.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                placeholder='Enter Your Email'
                Label='Email'
                classInput={style.Input}
                className={style.inputContainer}
                labelClass={style.Label}
                classError={style.Error}
                name='email'
                type="email"
                errors={errors}
                control={control}
              />
              <FormInput
                placeholder='Enter Your Password'
                Label='password'
                classInput={style.Input}
                className={style.inputContainer}
                labelClass={style.Label}
                classError={style.Error}
                name='password'
                type="password"
                errors={errors}
                control={control}
              />
              <div className={style.rememberContainer}>
                <FormCheckBox
                  name='rememberMe'
                  labelText='Remember me?'
                  ErrorClass={`${style.ErrorClass}`}
                  isShowError={false}
                  CheckboxClass={`${style.remember}`}
                  errors={errors}
                  control={control}

                />
                <Link to="/">Forgot Password?</Link>
              </div>
              <Button Text='Sign In' buttonClass={style.buttonSignIn} Disable={spinning} onClick={()=>setSpinning} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



export default SignIn;
