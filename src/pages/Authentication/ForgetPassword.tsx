import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import loginWallpaper from 'assets/images/rrLoginWallppr.jpg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormError from 'utilities/Form/FormError';
import UserService from 'services/UserService';
import { showErrorToast, showSuccessToast } from '../../utilities/Function/CustomToast';
import { ToastContainer } from 'react-toastify';
import { callApi } from '../../utilities/Function/CallAPI';
import { getToken } from '../../utilities/Function/GetLocalStorage';
import { AuthenticationWallpaper } from 'utilities/Template/AuthenticationWallpaper';
import { AuthenticationLogo } from 'utilities/Template/AuthenticationLogo';
import { AuthenticationFooter } from 'utilities/Template/AuthenticationFooter';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';
import backgroundImg from './../../assets/images/wmsLoginWallpaper.png';
import logo from './../../assets//images/wmsLogo.png';
import greatechLogo from './../../assets/images/greatechLogo.png';

export const ForgetPassword = (props: any) => {
    document.title = DOCUMENT_TITLE.Forget_Password;

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const userService = new UserService();

    const formikForgetPassword = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email()
        }),
        onSubmit: async (values: any) => {
            const data = { email: values.email };
            let apiFunc = userService.forgetPassword;

            try {
                const res = await callApi(
                    {
                        apiFunc,
                        setLoading,
                        navigateToLogin: () => {
                            navigate('/login');
                        }
                    },
                    data
                );

                if (res?.status) {
                    navigate('/login');
                    showSuccessToast(res.message);
                } else {
                    showErrorToast(res?.message);
                }
            } catch (error) {
                console.error('Error in onSubmit:', error);
            }
        }
    });

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            setLoading(true);
            if (getToken() !== null) {
                navigate('/WeeklyManpowerOverview');
            } else {
                setLoading(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                margin: 0, // Remove default margin
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="card login-panel p-fluid h-24rem w-30rem" style={{ position: 'relative', backgroundColor: 'white' }}>
                <div className="flex flex-column">
                    <div className="flex align-items-center mb-6 logo-container">
                        <div className="flex align-items-center">
                            <img src={logo} style={{ width: '45px' }} className="login-logo" alt="login-logo" />
                            &nbsp;
                            <h4 style={{ color: 'black', margin: '0' }}>WMS</h4>
                        </div>
                        <div className="flex align-items-center ml-auto">
                            <img src={greatechLogo} style={{ width: '150px', backgroundColor: 'white' }} className="login-logo" alt="another-logo" />
                        </div>
                    </div>
                    <form onSubmit={formikForgetPassword.handleSubmit}>
                        <label style={{ color: 'black' }}>Please key in your email to reset password</label>
                        <div className="form-container text-left">
                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-envelope"></i>
                                    <InputText
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        style={{ color: 'black', background: 'white', border: '1px solid #ccc' }}
                                        onChange={formikForgetPassword.handleChange}
                                        onBlur={formikForgetPassword.handleBlur}
                                        value={formikForgetPassword.values.email}
                                        disabled={loading}
                                    />
                                </span>
                                <FormError touched={formikForgetPassword.touched.email} errors={formikForgetPassword.errors.email} />
                            </div>

                            <button className="flex p-link mb-2">{loading ? <p>Would like to sign in?</p> : <Link to="/login">Would like to sign in?</Link>}</button>
                        </div>
                        <div className="button-container">
                            <Button type="submit" label="Submit" loading={loading}></Button>
                        </div>
                    </form>
                </div>
                <div className="login-footer flex align-items-center" style={{ position: 'absolute', bottom: 0, right: 0, padding: 5 }}>
                    <div className="flex align-items-center login-footer-logo-container">
                        <span style={{ color: 'black' }} className="login-footer-appname">
                            WMS
                        </span>
                    </div>
                    <span className="copyright" style={{ color: 'black' }}>
                        &#169; Greatech Integration (M) Sdn. Bhd. - {new Date().getFullYear()}
                    </span>
                </div>
            </div>
        </div>
    );
};
