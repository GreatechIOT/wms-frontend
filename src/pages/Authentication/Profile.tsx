import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import { showErrorToast, showSuccessToast } from '../../utilities/Function/CustomToast';
import { callApi } from '../../utilities/Function/CallAPI';
import SubmitFormButton from '../../utilities/Form/SubmitFormButton';
import FormError from '../../utilities/Form/FormError';
import { getToken } from '../../utilities/Function/GetLocalStorage';
import { useNavigate } from 'react-router-dom';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';

type TargetType = {
    employee_id: string;
    username: string;
    email: string;
    user_id?: string;
};

const Profile = () => {
    document.title = DOCUMENT_TITLE.Profile;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initials, setInitials] = useState({
        employee_id: '',
        username: '',
        email: ''
    });
    const userService = new UserService();

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            // let apiFunc = userService.getOneUser;
            // callApi({ apiFunc, setLoading }, { token: getToken() })
            //     .then((res) => {
            //         if (res.status) {
            //             setInitials({
            //                 employee_id: res.data.employee_id,
            //                 username: res.data.username,
            //                 email: res.data.email
            //             });
            //         } else {
            //             showErrorToast(res.message);
            //         }
            //     })
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const formikChangeProfile = useFormik({
        enableReinitialize: true,
        initialValues: initials,
        validationSchema: Yup.object({
            employee_id: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            email: Yup.string().required('Required').email()
        }),
        onSubmit: (values: TargetType) => {
            confirmDialog({
                message: `Are you sure you want to make this changes"?`,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (JSON.stringify(values) === JSON.stringify(initials)) {
                        showErrorToast('Nothing changed.');
                        return;
                    } else {
                        setLoading(true);

                        const getUserID = getToken()?.split('@')[1];

                        values = { ...values, user_id: getUserID };

                        const data = {
                            token: getToken(),
                            values
                        };
                    }
                },
                reject: () => {
                    setLoading(false);
                }
            });

            return;
        }
    });

    const formikChangePassword = useFormik({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object({
            old_password: Yup.string().required('Required'),
            new_password: Yup.string().required('Required'),
            confirm_password: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            setLoading(true);

            confirmDialog({
                message: `Are you sure you want to change the password?`,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (values.new_password !== values.confirm_password) {
                        showErrorToast('"New Password" and "Confirm Password" do not match.');
                        setLoading(false);
                    } else {
                        const data = {
                            token: getToken(),
                            old_password: values.old_password,
                            new_password: values.new_password
                        };
                    }
                },
                reject: () => {
                    setLoading(false);
                }
            });

            return;
        }
    });

    return (
        <div>
            <ConfirmDialog />

            <div>
                <>
                    <div className="card mb-5">
                        <form className="mt-2" onSubmit={formikChangeProfile.handleSubmit}>
                            <div className="grid p-fluid">
                                <div className="col-12 sm:col-12 md:col-12">
                                    <label>Employee ID</label>
                                    <div className="p-inputgroup mt-2">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-tag"></i>
                                        </span>
                                        <InputText
                                            id="employee_id"
                                            name="employee_id"
                                            placeholder="Employee ID"
                                            onChange={formikChangeProfile.handleChange}
                                            onBlur={formikChangeProfile.handleBlur}
                                            value={formikChangeProfile.values.employee_id}
                                            disabled={loading}
                                        />
                                    </div>
                                    <FormError touched={formikChangeProfile.touched.employee_id} errors={formikChangeProfile.errors.employee_id} />
                                </div>

                                <div className="col-12 sm:col-12 md:col-12">
                                    <label>Username</label>
                                    <div className="p-inputgroup mt-2">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText
                                            id="username"
                                            name="username"
                                            placeholder="Username"
                                            onChange={formikChangeProfile.handleChange}
                                            onBlur={formikChangeProfile.handleBlur}
                                            value={formikChangeProfile.values.username}
                                            disabled={loading}
                                        />
                                    </div>
                                    <FormError touched={formikChangeProfile.touched.username} errors={formikChangeProfile.errors.username} />
                                </div>

                                <div className="col-12 sm:col-12 md:col-12">
                                    <label>Email </label>
                                    <div className="p-inputgroup mt-2">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-envelope"></i>
                                        </span>
                                        <InputText id="email" name="email" placeholder="Email" onChange={formikChangeProfile.handleChange} onBlur={formikChangeProfile.handleBlur} value={formikChangeProfile.values.email} disabled={loading} />
                                    </div>
                                    <FormError touched={formikChangeProfile.touched.email} errors={formikChangeProfile.errors.email} />
                                </div>

                                <SubmitFormButton label="Change" loading={loading} />
                            </div>
                        </form>
                    </div>

                    <div className="card mt-5">
                        <form className="mt-2" onSubmit={formikChangePassword.handleSubmit}>
                            <div className="grid p-fluid">
                                <div className="col-12 sm:col-12 md:col-12">
                                    <label>Old Password </label>
                                    <div className="p-inputgroup mt-2">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <InputText
                                            id="old_password"
                                            name="old_password"
                                            type="password"
                                            placeholder="Old Password"
                                            onChange={formikChangePassword.handleChange}
                                            onBlur={formikChangePassword.handleBlur}
                                            value={formikChangePassword.values.old_password}
                                            disabled={loading}
                                        />
                                    </div>
                                    <FormError touched={formikChangePassword.touched.old_password} errors={formikChangePassword.errors.old_password} />
                                </div>

                                <div className="col-12 sm:col-12 md:col-12">
                                    <label>New Password </label>
                                    <div className="p-inputgroup mt-2">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <InputText
                                            id="new_password"
                                            name="new_password"
                                            type="password"
                                            placeholder="Password"
                                            onChange={formikChangePassword.handleChange}
                                            onBlur={formikChangePassword.handleBlur}
                                            value={formikChangePassword.values.new_password}
                                            disabled={loading}
                                        />
                                    </div>
                                    <FormError touched={formikChangePassword.touched.new_password} errors={formikChangePassword.errors.new_password} />
                                </div>

                                <div className="col-12 sm:col-12 md:col-12">
                                    <label>Confirm Password </label>
                                    <div className="p-inputgroup mt-2">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <InputText
                                            id="confirm_password"
                                            name="confirm_password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={formikChangePassword.handleChange}
                                            onBlur={formikChangePassword.handleBlur}
                                            value={formikChangePassword.values.confirm_password}
                                            disabled={loading}
                                        />
                                    </div>
                                    <FormError touched={formikChangePassword.touched.confirm_password} errors={formikChangePassword.errors.confirm_password} />
                                </div>

                                <SubmitFormButton label="Change" loading={loading} />
                            </div>
                        </form>
                    </div>
                </>
            </div>
        </div>
    );
};

export default Profile;
