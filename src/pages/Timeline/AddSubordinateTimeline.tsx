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
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';

const AddEngineerTimeline = () => {
    document.title = DOCUMENT_TITLE.Add_Timeline;
    const [loading, setLoading] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const { privilege } = useUser();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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

        if (values?.timeline?.[1] === null) {
            let date = moment(values?.timeline?.[0]).endOf('W').toDate();
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
                if (!checked) {
                    navigate('/SubordinateTimelineListing');
                } else {
                    setIsSubmitted(true);
                }
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };

    return (
        <React.Fragment>
            {!privilege ? (
                <LoadingAnimation />
            ) : privilege && privilege?.add_timeline ? (
                <TimelineForm
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    loading={loading}
                    setLoading={setLoading}
                    isAddTimeline={isAddTimeline}
                    checked={checked}
                    setChecked={setChecked}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
            ) : (
                <Access />
            )}
        </React.Fragment>
    );
};

export default AddEngineerTimeline;
