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
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { GrUserManager } from 'react-icons/gr';

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
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [userDetail, setUserDetail] = useState<any>();
    const profile_items: MenuItem[] = [
        { label: 'My Profile', icon: 'pi pi-fw pi-user' },
        { label: 'Change Password', icon: 'pi pi-fw pi-lock' }
    ];
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
            old_password: Yup.string().required('Old Password is required'),
            new_password: Yup.string().required('New Password is required'),
            confirm_password: Yup.string().required('Confirm Password is required')
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
                            old_password: values.old_password,
                            new_password: values.new_password
                        };
                        let apiFunc = userService.changePassword;
                        callApi(
                            {
                                apiFunc,
                                setLoading,
                                navigateToLogin: () => {
                                    navigate('/login');
                                }
                            },
                            data
                        ).then((res) => {
                            if (res && res?.status) {
                                showSuccessToast(res?.message);
                                formikChangePassword.resetForm();
                            } else {
                                if (!res.showError) {
                                    showErrorToast(res?.message);
                                }
                            }
                        });
                    }
                },
                reject: () => {
                    setLoading(false);
                }
            });

            return;
        }
    });

    useEffect(() => {
        setLoading(true);

        const data = {
            user_id: getToken()?.split('@')[1]
        };

        let apiFunc = userService.getOneUser;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            data
        ).then((res) => {
            if (res && res?.status) {
                setUserDetail(res.data);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    }, []);

    return (
        <div>
            <ConfirmDialog />

            <div>
                <>
                    <TabMenu model={profile_items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                    {activeIndex === 0 && (
                        <div className="card">
                            <div className="grid mb-5">
                                <div className="col-12 md:col-3 mb-5">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className="pi pi pi-user text-4xl text-primary-700"></i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Name</div>
                                        <div>{userDetail?.name}</div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-3 mb-5">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className="pi pi-envelope text-4xl text-primary-700"></i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Email</div>
                                        <div>{userDetail?.email}</div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-3 mb-5">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className="pi pi-id-card text-4xl text-primary-700"></i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Employee ID</div>
                                        <div>{userDetail?.employee_id}</div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-3 mb-5">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className="pi pi-building text-4xl text-primary-700"></i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Department</div>
                                        <div>{userDetail?.department}</div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-3 mb-5">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className="pi pi-sitemap text-4xl text-primary-700"></i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Job Title</div>
                                        <div>{userDetail?.job_title}</div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-3 mb-5">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className="pi pi-briefcase text-4xl text-primary-700"> </i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Section</div>
                                        <div>{userDetail?.section}</div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-3 mb-5 text-center">
                                    <div className="flex flex-column align-items-center">
                                        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-blue-100 mb-5">
                                            <i className=" text-4xl text-primary-700">
                                                <GrUserManager />
                                            </i>
                                        </span>
                                        <div className="text-2xl mb-3 font-medium">Superior</div>
                                        <div>{userDetail?.superior?.name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeIndex === 1 && (
                        <div className="card">
                            <form className="mt-2" onSubmit={formikChangePassword.handleSubmit}>
                                <div className="grid p-fluid">
                                    <div className="col-12 sm:col-12 md:col-12">
                                        <label>Old Password </label>
                                        <div className="p-inputgroup mt-2">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-key"></i>
                                            </span>
                                            <InputText
                                                style={{ background: 'white', border: '1px solid #ccc' }}
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
                                                style={{ background: 'white', border: '1px solid #ccc' }}
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
                                                style={{ background: 'white', border: '1px solid #ccc' }}
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
                    )}
                </>
            </div>
        </div>
    );
};

export default Profile;
