
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/signin.module.scss';
import { BiLeftArrowAlt } from 'react-icons/bi';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoginInput from '@/components/inputs/loginInput';
import { useState } from 'react';
import CircledIconBtn from '../components/button/circledIconBtn'; 
import { getProviders } from "next-auth/react";

const initialValues = {
  login_email: "",
  login_password: "",
  full_name:"",
  email : "",
  password : "",
  conf_password: "",
};

export default function signin({providers}) {
  
  console.log(providers);
  
  const [user,setUser] = useState(initialValues);
  const {login_email,login_password,full_name,email,password,conf_password,} = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);
  
  // Ini Merupakan setting YUP Form Validation

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .email('Invalid email address')
      .required('Email Address Is Required'),
    login_password: Yup.string()
      .required('Password Required')
  });

  const registerValidation = Yup.object({
    full_name: Yup.string()
      .required('Full Name Is Required')
      .min(2,"Full Name Must Be At Least 2 Characters")
      .max(20,"Full Name Must Be At Most 20 Characters")
      .matches(/^[a-zA-Z]+$/,"Full Name Must Contain Only Letters"),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address Is Required')
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Invalid Email Address")
      .min(6,"Email Must Be At Least 6 Characters")
      .max(50,"Email Must Be At Most 50 Characters"),
    password: Yup.string()
      .required('Password Required')
      .min(6,"Password Must Be At Least 6 Characters")
      .max(30,"Password Must Be At Most 30 Characters"),
    conf_password: Yup.string()
      .required('Password Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  return (
    <>
      <Header country="indo"/>
        <div className={styles.login}>
          <div className={styles.login__container}>
            <div className={styles.login__header}>
              <div className={styles.back__svg}>
                <BiLeftArrowAlt/>
              </div>
              <span>
                We'd be happy to join us on this journey <Link href="/">Go To Store</Link>
              </span>
            </div>
            <div className={styles.login__form}>
              <h1>Sign In</h1>
              <p>
                Get access to your account and start shopping with us
              </p>
              <Formik
                enableReinitialize
                initialValues={{
                  login_email,
                  login_password,
                }}
                validationSchema={loginValidation}
              >
                {(form) => (
                    <Form>
                      <LoginInput
                        type="text"
                        name="login_email"
                        icon="email" 
                        placeholder="Email Address"
                        onChange={handleChange}
                      />
                      <LoginInput
                        type="password"
                        name="login_password"
                        icon="password" 
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <CircledIconBtn type="submit" text="Sign In" icon="icon"/>
                      <div className={styles.forgot}>
                        <Link href="/forget">Forgot Password</Link>
                      </div>
                    </Form>
                )}
              </Formik>
              <div className={styles.login__socials}>
                <span className={styles.or}>
                  Or Continue With
                </span>
                <div className={styles.login__socials_wrap}>
                  {
                    providers.map((provider) => (
                      <div key={provider.name}>
                        <button className={styles.social__btn} onClick={() => signIn(provider.id)}>
                          <img src={`../../icons/${provider.name}.png`} alt="" />
                          Sign In With {provider.name}
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login__container}>
            <div className={styles.login__form}>
              <h1>Sign Up</h1>
              <p>
                Get access to your account and start shopping with us
              </p>
              <Formik
                enableReinitialize
                initialValues={{
                  full_name,
                  email,
                  password,
                  conf_password,
                }}
                validationSchema={registerValidation}
              >
                {(form) => (
                    <Form>
                      <LoginInput
                        type="text"
                        name="full_name"
                        icon="user" 
                        placeholder="Full Name"
                        onChange={handleChange}
                      />
                      <LoginInput
                        type="text"
                        name="email"
                        icon="email" 
                        placeholder="Email Address"
                        onChange={handleChange}
                      />
                      <LoginInput
                        type="password"
                        name="password"
                        icon="password" 
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <LoginInput
                        type="password"
                        name="conf_password"
                        icon="password" 
                        placeholder="Re-Type Password"
                        onChange={handleChange}
                      />
                      <CircledIconBtn type="submit" text="Sign Up" icon="icon"/>
                    </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      <Footer country="indo"/>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: {providers},
  };
}