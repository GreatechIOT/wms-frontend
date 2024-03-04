import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from 'primereact/button';
import { useUser } from 'utilities/Context/UserContext';

export const Access = (props: any) => {
    const { userDetail } = useUser();
    const navigate = useNavigate();

    const goHome = () => {
        if (userDetail?.department === 'Finance') {
            navigate('/Reporting');
        } else {
            navigate('/MyTimelog');
        }
    };

    return (
        <React.Fragment>
            <div className="exception-body">
                <div className="exception-panel">
                    <div style={{ margin: '40px' }}></div>
                    {/* <Player src={accessDenied} className="player" style={{ height: '400px', width: '400px' }} loop autoplay /> */}

                    <h5 className="-mt-4">Error 404</h5>
                    <h1 className="mb-2 -mt-2" style={{ fontSize: 50 }}>
                        Access Denied!
                    </h1>
                    <p style={{ maxWidth: '600px', fontSize: '13px' }}>You don't have permission to access.</p>
                    <div>
                        <Button className="p-button-extra p-button-lg" type="button" label={userDetail?.department === 'Finance' ? 'Go to Reporting' : 'Go to My Timelog'} onClick={goHome} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
