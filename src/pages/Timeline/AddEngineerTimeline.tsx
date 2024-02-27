import React, { useState } from 'react';
import TimelineForm from './component/TimelineForm';
import { TimelineType } from 'utilities/Interface/TimelineInterface';
import TimelineService from 'services/TimelineService';
import { callApi } from 'utilities/Function/CallAPI';
import { useNavigate } from 'react-router-dom';
import { MemberType } from 'utilities/Interface/MemberInterface';
import { showErrorToast } from 'utilities/Function/CustomToast';

const AddEngineerTimeline = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const timelineService = new TimelineService();
    const navigate = useNavigate();
    const initialValues: TimelineType = {
        project_category: { id: 0, category_type: '' },
        project_id: { id: 0, item_name: '', item_description: '' },
        members: '',
        timeline: null
    };

    const onSubmit = (values: TimelineType) => {
        const userIdArray: number[] = values.members.map((item: MemberType) => item.id);
        console.log(userIdArray);

        if (values?.timeline?.[1] === null) {
            let date = values?.timeline?.[0];
            values.timeline[1] = date;
        }

        let apiFunc = timelineService.addTimeline;

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            { user_id: userIdArray, date_range: values.timeline, item_id: values.project_id.id }
        ).then((res: any) => {
            if (res && res?.status) {
                console.log(res.data)
               
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
        console.log(values.timeline);

        console.log(values);
    };

    return (
        <React.Fragment>
            <TimelineForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} setLoading={setLoading} />
        </React.Fragment>
    );
};

export default AddEngineerTimeline;
