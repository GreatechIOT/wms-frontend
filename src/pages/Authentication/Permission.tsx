import { useNavigate } from 'react-router-dom';

import logo from 'assets/images/wmsLogo.png';
import { Button } from 'primereact/button';
import { ACCESS, ERROR, NOTFOUND } from 'utilities/Constant/ConstantName';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';

interface PermissionProps {
    action: string;
}

export const Permission: React.FC<PermissionProps> = ({ action }) => {
    document.title = DOCUMENT_TITLE.Permission;
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/Dashboard');
    };

    const actionCase = () => {
        switch (action.toLowerCase()) {
            case ACCESS:
                return (
                    <>
                        <h1>ACCESS</h1>
                        <h3>denied</h3>
                        <p>You are not allowed to view this page.</p>
                    </>
                );

            case ERROR:
                return (
                    <>
                        <h1>ERROR</h1>
                        <h3>something's went wrong</h3>
                    </>
                );

            case NOTFOUND:
                return (
                    <>
                        <h1>404</h1>
                        <h3>not found</h3>
                        <p>The page that you are looking for does not exist</p>
                    </>
                );
        }
    };

    return (
        <div className="exception-body accessdenied">
            <div className="exception-panel">
                {actionCase()}
                <Button type="button" label="Go back to home" onClick={goHome}></Button>
            </div>
            <div className="exception-footer">
                <img src={logo} className="exception-logo" alt="exception-logo" />
                <p className="exception-appname" style={{ fontSize: '1.3em' }}>
                WMS
                </p>
            </div>
        </div>
    );
};
