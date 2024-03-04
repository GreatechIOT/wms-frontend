import React, { useState } from 'react';
import TimelineForm from './component/TimelineForm';
import { TimelineType } from 'utilities/Interface/TimelineInterface';
import TimelineService from 'services/TimelineService';
import { callApi } from 'utilities/Function/CallAPI';
import { useNavigate } from 'react-router-dom';
import { MemberType } from 'utilities/Interface/MemberInterface';
import { showErrorToast, showSuccessToast } from 'utilities/Function/CustomToast';
import moment from 'moment';
import { useUser } from 'utilities/Context/UserContext';
import LoadingAnimation from 'utilities/Animation/LoadingAnimation';
import { Access } from 'pages/LogFiles/Access';

const AddEngineerTimeline = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { privilege } = useUser();
    const timelineService = new TimelineService();
    const navigate = useNavigate();
    const [isAddTimeline, setIsAddTimeline] = useState<boolean>(true);
    const initialValues: TimelineType = {
        project_category: '',
        project_id: '',
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
            { user_id: userIdArray, date_range: [moment(values?.timeline?.[0]).format('YYYY-MM-DD'), moment(values?.timeline?.[1]).format('YYYY-MM-DD')], item_id: values.project_id.id }
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
        console.log(values.timeline);

        console.log(values);
    };

    return (
        <React.Fragment>
            {!privilege ? <LoadingAnimation /> : privilege && privilege?.add_timeline ? <TimelineForm initialValues={initialValues} onSubmit={onSubmit} loading={loading} setLoading={setLoading} isAddTimeline={isAddTimeline} /> : <Access />}
        </React.Fragment>
    );
};

export default AddEngineerTimeline;
