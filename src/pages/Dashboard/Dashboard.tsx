import React from 'react';
import WeeklyManpowerOverview from './component/WeeklyManpowerOverview';
import { useUser } from 'utilities/Context/UserContext';
import LoadingAnimation from 'utilities/Animation/LoadingAnimation';
import { Access } from 'pages/LogFiles/Access';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';
import TeamProjectAllocation from './component/TeamProjectAllocation';

const Dashboard = () => {
    const { privilege } = useUser();
    document.title = DOCUMENT_TITLE.Dashboard;
    return <React.Fragment>{!privilege ? <LoadingAnimation /> : privilege && privilege?.view_dashboard ? <TeamProjectAllocation /> : <Access />}</React.Fragment>;
};

export default Dashboard;
