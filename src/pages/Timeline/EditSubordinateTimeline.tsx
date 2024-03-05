import React, { useEffect, useState } from 'react';
import TimelineForm from './component/TimelineForm';
import { TimelineType } from 'utilities/Interface/TimelineInterface';
import TimelineService from 'services/TimelineService';
import { callApi } from 'utilities/Function/CallAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from 'utilities/Function/CustomToast';
import moment from 'moment';
const EditEngineerTimeline = () => {
    const selectedTimeline = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const timelineService = new TimelineService();
    const isAddTimeline = false;
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState<TimelineType>({
        project_category: '',
        project_id: '',
        members: '',
        timeline: null
    });
    const [category_id, setCategory_id] = useState<number | undefined>();

    useEffect(() => {
        let apiFunc = timelineService.getOneSubordinatesTimeline;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            { timeline_id: selectedTimeline.id }
        ).then((res: any) => {
            if (res && res?.status) {
                console.log(res.data.user_id);
                console.log(res.data.user.name);
                setCategory_id(res.data.item.category.id);
                let projectCategory = { project_category: { id: res.data.item.category.id, category_type: res.data.item.category.category_type } };
                let projectID = { project_id: { id: res.data.item.id, item_name: res.data.item.item_name, item_description: res.data.item.item_description } };
                let timeline = { timeline: [new Date(res.data.start_date), new Date(res.data.end_date)] };
                let member = { members: [{ id: res.data.user_id, name: res.data.user.name, email: res.data.user.email, employee_id: res.data.user.employee_id }] };
                let values = { ...projectCategory, ...projectID, ...timeline, ...member };
                setInitialValues((prev: any) => ({
                    ...prev,
                    ...values
                }));
                console.log(res.data);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    }, []);

    const onSubmit = (values: TimelineType) => {
        if (values?.timeline?.[1] === null) {
            let date = moment(values?.timeline?.[0]).endOf('W').toDate();
            values.timeline[1] = date;
        }

        let apiFunc = timelineService.editTimeline;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            { timeline_id: selectedTimeline.id, date_range: [moment(values?.timeline?.[0]).format('YYYY-MM-DD'), moment(values?.timeline?.[1]).format('YYYY-MM-DD')], item_id: values.project_id.id }
        ).then((res: any) => {
            if (res && res?.status) {
                showSuccessToast(res?.message);
                navigate('/SubordinateTimelineListing');
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
        console.log(values);
    };
    return <React.Fragment>{category_id && <TimelineForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} setLoading={setLoading} isAddTimeline={isAddTimeline} category_id={category_id} />}</React.Fragment>;
};

export default EditEngineerTimeline;
