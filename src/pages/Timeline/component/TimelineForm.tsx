import { useFormik } from 'formik';
import moment from 'moment';
import { addLocale } from 'primereact/api';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from 'services/CategoryService';
import ItemService from 'services/ItemService';
import UserService from 'services/UserService';
import FormError from 'utilities/Form/FormError';
import SubmitFormButton from 'utilities/Form/SubmitFormButton';
import { callApi } from 'utilities/Function/CallAPI';
import { showErrorToast } from 'utilities/Function/CustomToast';
import { CategoryType } from 'utilities/Interface/CategoryInterface';
import { ItemType } from 'utilities/Interface/ItemInterface';
import { MemberType } from 'utilities/Interface/MemberInterface';
import { TimelineType } from 'utilities/Interface/TimelineInterface';
import * as Yup from 'yup';

interface TimelineProps {
    initialValues: TimelineType;
    onSubmit: (values: TimelineType) => void;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isAddTimeline?: boolean;
    category_id?: any;
}
const TimelineForm: React.FC<TimelineProps> = ({ initialValues, onSubmit, loading, setLoading, isAddTimeline, category_id }) => {
    const categoryService = new CategoryService();
    const itemService = new ItemService();
    const userService = new UserService();
    const [categoryOptions, setCategoryOptions] = useState<CategoryType[] | []>([]);
    const [itemOptions, setItemOptions] = useState<ItemType[] | []>([]);
    const [memberOptions, setMemberOptions] = useState<MemberType[] | []>([]);
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        project_category: Yup.object().required('Project Category is required').nullable(),
        project_id: Yup.object().required('Project ID is required').nullable(),
        members: Yup.array().min(1, 'Select at least one member').required('Members is required'),
        timeline: Yup.array().min(2, 'Select start and end date').required('Timeline is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const getActiveCategoryForItem = () => {
        let apiFunc = categoryService.getActiveCategoryForItem;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            {}
        ).then((res: any) => {
            if (res && res?.status) {
                const newCategoryList = res.data.map(({ id, category_type }: any) => ({ id, category_type }));
                setCategoryOptions(newCategoryList);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };

    const getItemByCategory = (category_id: number) => {
        let apiFunc = itemService.getItemByCategory;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            { category_id: category_id }
        ).then((res: any) => {
            if (res && res?.status) {
                const newItemList = res.data.map(({ id, item_name, item_description }: any) => ({ id, item_name, item_description }));
                setItemOptions(newItemList);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };

    const getSubordinates = () => {
        let apiFunc = userService.getSubordinates;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            {}
        ).then((res: any) => {
            if (res && res?.status) {
                const newItemList = res.data.map(({ id, name, email, employee_id }: any) => ({ id, name, email, employee_id }));
                setMemberOptions(newItemList);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };

    const itemDropdownTemplate = (option: ItemType) => {
        if (option) {
            if (option.item_description) {
                return (
                    <div style={{ width: '500px' }} title={`${option.item_name}, ${option.item_description}`}>
                        <div
                            style={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap' as const,
                                overflow: 'hidden',
                                textAlign: 'justify' as const
                            }}
                        >
                            {option?.item_name} ({option.item_description})
                        </div>
                    </div>
                );
            } else {
                return <div title={option.item_name}>{option.item_name}</div>;
            }
        }
    };

    const memberDropdownTemplate = (option: MemberType) => {
        if (option) {
            return (
                <div style={{ width: '500px' }} title={`${option.name}, ${option.email}, ${option.employee_id}`}>
                    <div
                        style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap' as const,
                            overflow: 'hidden',
                            textAlign: 'justify' as const
                        }}
                    >
                        {option?.name} ({option.employee_id}), {option.email}
                    </div>
                </div>
            );
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            getActiveCategoryForItem();
            if (!isAddTimeline) {
                getItemByCategory(category_id);
            }
            getSubordinates();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    addLocale('es', {
        firstDayOfWeek: 1
    });
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid p-fluid">
                            <div className="col-12 sm:col-12 md:col-12">
                                <label className="flex">
                                    Project Category
                                    <div className="font-semibold -mt-1" style={{ color: 'red' }}>
                                        *
                                    </div>
                                </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        style={{ background: 'white', border: '1px solid #ccc' }}
                                        id="project_category"
                                        name="project_category"
                                        optionLabel="category_type"
                                        options={categoryOptions}
                                        onChange={(e) => {
                                            formik.setFieldValue('project_id', '');
                                            formik.handleChange(e);
                                            getItemByCategory(e.value.id);
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.project_category}
                                        placeholder="Select a Project Category"
                                        disabled={loading}
                                        filter
                                    />
                                </div>
                                <FormError touched={formik.touched.project_category} errors={formik.errors.project_category} />
                            </div>
                            <div className="col-12 sm:col-12 md:col-12">
                                <label className="flex">
                                    Project ID
                                    <div className="font-semibold -mt-1" style={{ color: 'red' }}>
                                        *
                                    </div>
                                </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        style={{ background: 'white', border: '1px solid #ccc' }}
                                        id="project_id"
                                        name="project_id"
                                        optionLabel="item_name"
                                        options={itemOptions}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.project_id}
                                        placeholder="Select a Project ID"
                                        disabled={loading}
                                        itemTemplate={itemDropdownTemplate}
                                        filterBy="item_name,item_description"
                                        filter
                                    />
                                </div>
                                <FormError touched={formik.touched.project_id} errors={formik.errors.project_id} />
                            </div>
                            <div className="col-12 sm:col-12 md:col-12">
                                <label className="flex">
                                    Members
                                    <div className="font-semibold -mt-1" style={{ color: 'red' }}>
                                        *
                                    </div>
                                </label>
                                <div className="p-inputgroup mt-2">
                                    <MultiSelect
                                        style={{ background: 'white', border: '1px solid #ccc' }}
                                        id="members"
                                        name="members"
                                        options={memberOptions}
                                        optionLabel="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.members}
                                        itemTemplate={memberDropdownTemplate}
                                        //panelFooterTemplate={panelFooterTemplate}
                                        filter
                                        filterBy="name,employee_id,email"
                                        placeholder="Select Member"
                                        maxSelectedLabels={3}
                                        className="w-full md:w-20rem"
                                        disabled={isAddTimeline ? loading : true}
                                    />
                                </div>
                                <FormError touched={formik.touched.members} errors={formik.errors.members} />
                            </div>

                            <div className="col-12 sm:col-12 md:col-12">
                                <label className="flex">
                                    Timeline
                                    <div className="font-semibold -mt-1" style={{ color: 'red' }}>
                                        *
                                    </div>
                                </label>
                                <div className="p-inputgroup mt-2">
                                    <Calendar
                                        locale="es"
                                        style={{ background: 'white', border: '1px solid #ccc' }}
                                        id="timeline"
                                        name="timeline"
                                        onChange={(e: any) => {
                                            console.log(e.value);
                                            if (e.value) {
                                                formik.setFieldValue('timeline', [e.value ? moment(e.value[0]).startOf('W').toDate() : null, e.value[1] ? moment(e.value[1]).endOf('W').toDate() : null]);
                                                console.log(moment(e.value[0]).startOf('W').toDate());
                                                console.log(moment(e.value[0]).endOf('W').toDate());
                                            } else {
                                                formik.setFieldValue('timeline', null);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.timeline}
                                        placeholder="Select Date Range"
                                        disabled={loading}
                                        selectionMode="range"
                                        readOnlyInput
                                        showButtonBar
                                        showWeek
                                    />
                                </div>
                                <FormError touched={formik.touched.timeline} errors={formik.errors.timeline} />
                            </div>
                            <SubmitFormButton label="Submit" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TimelineForm;
