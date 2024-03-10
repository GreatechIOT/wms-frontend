import React from 'react';
import TMDashboard from './component/TMDashboard';
import { useUser } from 'utilities/Context/UserContext';
import LoadingAnimation from 'utilities/Animation/LoadingAnimation';
import { Access } from 'pages/LogFiles/Access';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';
import BUMDashboard from './component/BUMDashboard';

const Dashboard = () => {
    const { privilege } = useUser();
    document.title = DOCUMENT_TITLE.Dashboard;
    return <React.Fragment>{!privilege ? <LoadingAnimation /> : privilege && privilege?.view_dashboard ? <BUMDashboard /> : <Access />}</React.Fragment>;
};

export default Dashboard;
