import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppBreadcrumb from './AppBreadcrumb';
import AppMenu from './AppMenu';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './css/App.scss';
import { PrivateRoute } from 'PrivateRoute';
import GanttChart from 'pages/GanttChart/GanttChart';
import { RiTimeLine } from 'react-icons/ri';
import AddSubordinateTimeline from 'pages/Timeline/AddSubordinateTimeline';
import SubordinateTimelineListing from 'pages/Timeline/SubordinateTimelineListing';
import Dashboard from 'pages/Dashboard/Dashboard';
import Profile from 'pages/Authentication/Profile';
import EditSubordinateTimeline from 'pages/Timeline/EditSubordinateTimeline';
import UserSettings from 'pages/User/UserSettings';
import { useUser } from 'utilities/Context/UserContext';
import { UserMenuOptions } from 'utilities/Function/UserMenuOptions';
import { MenuItem } from 'primereact/menuitem';
import { getToken } from 'utilities/Function/GetLocalStorage';
import TeamProjectAllocation from 'pages/Dashboard/component/TeamProjectAllocation';
import WeeklyManpowerOverview from 'pages/Dashboard/component/WeeklyManpowerOverview';
import NewGanttChart from 'pages/GanttChart/NewGanttChart';

const App = (props: any) => {
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [configActive, setConfigActive] = useState(false);
    const [menuMode, setMenuMode] = useState('sidebar');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [ripple, setRipple] = useState(true);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [pinActive, setPinActive] = useState(false);
    const [activeInlineProfile, setActiveInlineProfile] = useState(false);
    const [resetActiveIndex, setResetActiveIndex] = useState<boolean>(false);
    const copyTooltipRef = useRef<any>();
    const location = useLocation();
    const { privilege, userDetail } = useUser();
    const [menu, setMenu] = useState<MenuItem[]>([]);
    PrimeReact.ripple = true;

    useEffect(() => {
        if (privilege) {
            setMenu(UserMenuOptions(privilege, userDetail?.job_title));
        }
    }, [privilege]);

    const routes = [
        // { parent: 'Dashboard', label: 'Dashboard', parent_url: 'Dashboard', label_url: 'Dashboard' },
        { parent: 'Weekly Manpower Overview', label: 'Team Project Allocation', parent_url: 'WeeklyManpowerOverview', label_url: 'TeamProjectAllocation' },
        { parent: 'Weekly Manpower Overview', label: 'Weekly Manpower Overview', parent_url: 'WeeklyManpowerOverview', label_url: 'WeeklyManpowerOverview' },
        { parent: 'Subordinate Timeline Listing', label: 'Add Subordinate Timeline', parent_url: 'SubordinateTimelineListing', label_url: 'AddSubordinateTimeline' },
        { parent: 'Subordinate Timeline Listing', label: 'Edit Subordinate Timeline', parent_url: 'SubordinateTimelineListing', label_url: 'EditSubordinateTimeline' },
        { parent: 'Subordinate Timeline Listing', label: 'Subordinate Timeline Listing', parent_url: 'SubordinateTimelineListing', label_url: 'SubordinateTimelineListing' },
        { parent: 'Dashboard', label: 'Profile', parent_url: 'Dashboard', label_url: 'Profile' },
        { parent: 'User Settings', label: 'User Settings', parent_url: 'UserSettings', label_url: 'UserSettings' }
    ];

    let rightMenuClick: any;
    let configClick: any;
    let menuClick: any;
    let searchClick: boolean = false;
    let topbarItemClick: any;

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        setResetActiveIndex(true);
        setMenuActive(false);
    }, [menuMode]);

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            onSearchHide();
        }

        if (!topbarItemClick) {
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
                setResetActiveIndex(true);
            }

            if (overlayMenuActive || staticMenuMobileActive) {
                setOverlayMenuActive(false);
                setStaticMenuMobileActive(false);
            }

            hideOverlayMenu();
            unblockBodyScroll();
        }

        if (!rightMenuClick) {
            setRightMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        topbarItemClick = false;
        menuClick = false;
        configClick = false;
        rightMenuClick = false;
        searchClick = false;
    };

    const onSearchHide = () => {
        setSearchActive(false);
        searchClick = false;
    };

    const onMenuModeChange = (menuMode: any) => {
        setMenuMode(menuMode);
        setOverlayMenuActive(false);
    };

    const onRightMenuButtonClick = () => {
        rightMenuClick = true;
        setRightMenuActive(true);
    };

    const onRightMenuClick = () => {
        rightMenuClick = true;
    };

    const onRightMenuActiveChange = (active: any) => {
        setRightMenuActive(active);
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = (event: any) => {
        setConfigActive((prevState) => !prevState);
        configClick = true;
        event.preventDefault();
    };

    const onRippleChange = (e: any) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuButtonClick = (event: any) => {
        menuClick = true;

        if (isOverlay()) {
            setOverlayMenuActive((prevState) => !prevState);
        }

        if (isDesktop()) {
            setStaticMenuDesktopInactive((prevState) => !prevState);
        } else {
            setStaticMenuMobileActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const onTopbarItemClick = (event: any) => {
        topbarItemClick = true;
        setTopbarMenuActive((prevState) => !prevState);
        hideOverlayMenu();
        event.preventDefault();
    };

    const onToggleMenu = (event: any) => {
        menuClick = true;

        if (overlayMenuActive) {
            setOverlayMenuActive(false);
        }

        if (sidebarActive) {
            setSidebarStatic((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarMouseOver = () => {
        if (menuMode === 'sidebar' && !sidebarStatic) {
            setSidebarActive(isDesktop());
            setTimeout(() => {
                setPinActive(isDesktop());
            }, 200);
        }
    };

    const onSidebarMouseLeave = () => {
        if (menuMode === 'sidebar' && !sidebarStatic) {
            setTimeout(() => {
                setSidebarActive(false);
                setPinActive(false);
            }, 250);
        }
    };

    const onMenuClick = () => {
        menuClick = true;
    };

    const onChangeActiveInlineMenu = (event: any) => {
        setActiveInlineProfile((prevState) => !prevState);
        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive((prevState) => !prevState);
    };

    const onMenuItemClick = (event: any) => {
        if (!event.item.items) {
            hideOverlayMenu();
            setResetActiveIndex(true);
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const onInputClick = () => {
        searchClick = true;
    };

    const breadcrumbClick = () => {
        searchClick = true;
        setSearchActive(true);
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const layoutClassName = classNames('layout-wrapper', {
        'layout-static': menuMode === 'static',
        'layout-overlay': menuMode === 'overlay',
        'layout-overlay-active': overlayMenuActive,
        'layout-slim': menuMode === 'slim',
        'layout-horizontal': menuMode === 'horizontal',
        'layout-active': menuActive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-sidebar': menuMode === 'sidebar',
        'layout-sidebar-static': menuMode === 'sidebar' && sidebarStatic,
        'layout-static-inactive': staticMenuDesktopInactive && menuMode === 'static',
        'p-ripple-disabled': !ripple
    });

    return (
        <div className={layoutClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <div className="layout-main">
                <AppTopbar
                    items={menu}
                    menuMode={menuMode}
                    colorScheme={props.colorScheme}
                    menuActive={menuActive}
                    topbarMenuActive={topbarMenuActive}
                    activeInlineProfile={activeInlineProfile}
                    onTopbarItemClick={onTopbarItemClick}
                    onMenuButtonClick={onMenuButtonClick}
                    onSidebarMouseOver={onSidebarMouseOver}
                    onSidebarMouseLeave={onSidebarMouseLeave}
                    onToggleMenu={onToggleMenu}
                    onChangeActiveInlineMenu={onChangeActiveInlineMenu}
                    onMenuClick={onMenuClick}
                    onMenuItemClick={onMenuItemClick}
                    onRootMenuItemClick={onRootMenuItemClick}
                    resetActiveIndex={resetActiveIndex}
                />

                <AppMenu
                    model={menu}
                    onRootMenuItemClick={onRootMenuItemClick}
                    onMenuItemClick={onMenuItemClick}
                    onToggleMenu={onToggleMenu}
                    onMenuClick={onMenuClick}
                    menuMode={menuMode}
                    colorScheme={props.colorScheme}
                    menuActive={menuActive}
                    sidebarActive={sidebarActive}
                    sidebarStatic={sidebarStatic}
                    pinActive={pinActive}
                    onSidebarMouseLeave={onSidebarMouseLeave}
                    onSidebarMouseOver={onSidebarMouseOver}
                    activeInlineProfile={activeInlineProfile}
                    onChangeActiveInlineMenu={onChangeActiveInlineMenu}
                    resetActiveIndex={resetActiveIndex}
                />

                <AppBreadcrumb routes={routes} onMenuButtonClick={onMenuButtonClick} menuMode={menuMode} onRightMenuButtonClick={onRightMenuButtonClick} onInputClick={onInputClick} searchActive={searchActive} breadcrumbClick={breadcrumbClick} />

                <div className="layout-main-content">
                    <Routes>
                        {privilege?.view_dashboard ? <Route path="/" element={<Dashboard />} /> : <Route path="/" element={<AddSubordinateTimeline />} />}

                        <Route path="/GanttChart" element={<GanttChart />} />
                        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
                        <Route path="/TeamProjectAllocation" element={<TeamProjectAllocation />} />
                        <Route path="/WeeklyManpowerOverview" element={<Dashboard />} />
                        <Route path="/AddSubordinateTimeline" element={<AddSubordinateTimeline />} />
                        <Route path="/EditSubordinateTimeline/:id" element={<EditSubordinateTimeline />} />
                        <Route path="/SubordinateTimelineListing" element={<SubordinateTimelineListing />} />
                        <Route path="/UserSettings" element={<UserSettings />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>

                <AppFooter colorScheme={props.colorScheme} />
            </div>

            {/* <AppRightMenu rightMenuActive={rightMenuActive} onRightMenuClick={onRightMenuClick} onRightMenuActiveChange={onRightMenuActiveChange} /> */}

            {/* <AppConfig
                configActive={configActive}
                onConfigButtonClick={onConfigButtonClick}
                onConfigClick={onConfigClick}
                menuMode={menuMode}
                changeMenuMode={onMenuModeChange}
                colorScheme={props.colorScheme}
                changeColorScheme={props.onColorSchemeChange}
                theme={props.theme}
                changeTheme={props.onMenuThemeChange}
                componentTheme={props.componentTheme}
                changeComponentTheme={props.onComponentThemeChange}
                ripple={ripple}
                onRippleChange={onRippleChange}
            /> */}

            <ToastContainer />
        </div>
    );
};

export default App;
