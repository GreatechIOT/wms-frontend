import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormError from '../../utilities/Form/FormError';
import UserService from '../../services/UserService';
import { showErrorToast, showSuccessToast } from '../../utilities/Function/CustomToast';
import { ToastContainer } from 'react-toastify';
import { callApi } from '../../utilities/Function/CallAPI';
import { getToken } from '../../utilities/Function/GetLocalStorage';
import { AuthenticationFooter } from 'utilities/Template/AuthenticationFooter';
import { AuthenticationLogo } from 'utilities/Template/AuthenticationLogo';
import { AuthenticationWallpaper } from 'utilities/Template/AuthenticationWallpaper';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';
import logo from 'assets/images/wmsLogo.png';
import greatechLogo from './../../assets/images/greatechLogo.png';
import backgroundImg from './../../assets/images/wmsLoginWallpaper.png';
import { system_name } from 'config/ServerConfig';
import { useUser } from 'utilities/Context/UserContext';

export const Login = (props: any) => {
    document.title = DOCUMENT_TITLE.Login;
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const userService = new UserService();
    const { privilege } = useUser();

    const formikLogin = useFormik({
        initialValues: {
            employee_id: '',
            password: ''
        },
        validationSchema: Yup.object({
            employee_id: Yup.string().required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: async (values: any) => {
            const data = {
                employee_id: values.employee_id,
                password: values.password,
                system_name: system_name
            };

            let apiFunc = userService.login;

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
                    localStorage.setItem('wms_token', res?.data.token + '@' + res?.data.id);
                    if (privilege?.view_dashboard) {
                        navigate('/Dashboard');
                    } else {
                        navigate('/SubordinateTimelineListing');
                    }

                    showSuccessToast(res?.message + '.');
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
                navigate('/Dashboard');
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
                    <form onSubmit={formikLogin.handleSubmit}>
                        <div className="form-container text-left">
                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user"></i>
                                    <InputText
                                        id="employee_id"
                                        name="employee_id"
                                        type="text"
                                        placeholder="Employee ID"
                                        style={{ color: 'black', background: 'white', border: '1px solid #ccc' }}
                                        onChange={formikLogin.handleChange}
                                        onBlur={formikLogin.handleBlur}
                                        value={formikLogin.values.employee_id}
                                    />
                                </span>
                                <FormError touched={formikLogin.touched.employee_id} errors={formikLogin.errors.employee_id} />
                            </div>

                            <div className="mb-3">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-key"></i>
                                    <InputText
                                        id="password"
                                        name="password"
                                        type="password"
                                        style={{ color: 'black', background: 'white', border: '1px solid #ccc' }}
                                        placeholder="Password"
                                        onChange={formikLogin.handleChange}
                                        onBlur={formikLogin.handleBlur}
                                        value={formikLogin.values.password}
                                    />
                                </span>
                                <FormError touched={formikLogin.touched.password} errors={formikLogin.errors.password} />
                            </div>
                            <button className="flex p-link mb-2">
                                <Link to="/forgetPassword">Forgot your password?</Link>
                            </button>
                        </div>
                        <div className="button-container">
                            <Button type="submit" label="Login" loading={loading}></Button>
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
