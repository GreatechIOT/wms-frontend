import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';
import { clearLocalStorage } from 'utilities/Function/ClearLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'utilities/Context/UserContext';

const AppInlineMenu = (props: any) => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const { userDetail } = useUser();

    const isSlim = () => {
        return props.menuMode === 'slim';
    };

    const isStatic = () => {
        return props.menuMode === 'static';
    };

    const isSidebar = () => {
        return props.menuMode === 'sidebar';
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    return (
        <>
            {!isMobile() && (isStatic() || isSlim() || isSidebar()) && (
                <div className={classNames('layout-inline-menu', { 'layout-inline-menu-active': props.activeInlineProfile })}>
                    <button className="layout-inline-menu-action p-link" onClick={props.onChangeActiveInlineMenu}>
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${userDetail?.name}`} alt="avatar" style={{ width: '44px', height: '44px' }} />
                        <span
                            className="layout-inline-menu-text"
                            style={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textAlign: 'justify',
                                margin: '0px 10px 0px 10px'
                            }}
                        >
                            {userDetail?.name}
                        </span>{' '}
                        <i className="layout-inline-menu-icon pi pi-angle-down"></i>
                    </button>
                    <CSSTransition nodeRef={menuRef} classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={props.activeInlineProfile} unmountOnExit>
                        <ul ref={menuRef} className="layout-inline-menu-action-panel">
                            <li className="layout-inline-menu-action-item">
                                <button
                                    className="p-link"
                                    onClick={() => {
                                        clearLocalStorage();
                                        navigate('/login');
                                    }}
                                >
                                    <i className="pi pi-power-off pi-fw"></i>
                                    <span>Logout</span>
                                </button>
                            </li>

                            <li className="layout-inline-menu-action-item">
                                <button
                                    className="p-link"
                                    onClick={() => {
                                        navigate('/profile');
                                    }}
                                >
                                    <i className="pi pi-user pi-fw"></i>
                                    <span>Profile</span>
                                </button>
                            </li>
                        </ul>
                    </CSSTransition>
                </div>
            )}
        </>
    );
};

export default AppInlineMenu;
