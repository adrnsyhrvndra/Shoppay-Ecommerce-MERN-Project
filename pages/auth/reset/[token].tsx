import styles from '../../../styles/forgot.module.scss';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import { BiLeftArrowAlt } from 'react-icons/bi';
import CircledIconBtn from '@/components/button/circledIconBtn';
import { Formik, Form } from 'formik';
import LoginInput from '@/components/inputs/loginInput';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import { getSession, signIn } from 'next-auth/react';
import { Router } from 'next/router';

const jwt = require('jsonwebtoken');

export default function reset({user_id}) {

    console.log("user_id",user_id);

    const [password, setPassword] = useState("");
    const [conf_password, setConfPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");

    const passwordValidation = Yup.object({
        password: Yup.string()
            .required(
                "You'll need this when you log in and if you ever need to reset your password."
            ),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords must match."),
    });

    const resetHandler = async () => {

        try {

            setLoading(true);
            const {data} = await axios.put('/api/auth/reset', {
                user_id,
                password,
            });

            let options = {
                redirect: false,
                email: data.email,
                password: password,
            };
            await signIn("credentials", options);
            window.location.reload(true);

        } catch (error) {

            setLoading(false);
            setSuccess("");
            setError(error.message);

        }
    }

    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
            <Header country="indo" />
            <div className={styles.forgot}>
                <div>
                    <div className={styles.forgot__header}>
                        <div className={styles.back__svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>
                            Forgot Your Password? <Link href="/">Login Instead</Link>
                        </span>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            password,
                            conf_password,
                        }}
                        validationSchema={passwordValidation}
                        onSubmit={() => {
                            resetHandler();
                        }}
                    >
                        {(form) => (
                            <Form>
                                <LoginInput
                                    type="password"
                                    name="password"
                                    icon="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <LoginInput
                                    type="password"
                                    name="conf_password"
                                    icon="password"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfPassword(e.target.value)}
                                />
                                <CircledIconBtn type="submit" text="Change Password" icon="icon" />

                                <div style={{ marginTop: "10px" }}>
                                    {error && <span className={styles.error}>{error}</span>}
                                    {success && <span className={styles.success}>{success}</span>}
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer country="indo" />
        </>
    );
}

export async function getServerSideProps(context) {

    const {query,req} = context;
    const session = await getSession(req);
    if(session){
        return {
            redirect: {
                destination: "/",
            },
        }
    }
    const token = query.token;
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

    return {
        props: {
            user_id: user_id.id,
        }
    }
}