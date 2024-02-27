import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Authentication/Login';
import { Permission } from './pages/Authentication/Permission';
import { ForgetPassword } from './pages/Authentication/ForgetPassword';
import { ResetPassword } from './pages/Authentication/ResetPassword';

const AppWrapper = (props: any) => {
    const [colorScheme, setColorScheme] = useState('dark');
    const [theme, setTheme] = useState('blue');
    const [componentTheme, setComponentTheme] = useState('blue');

    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const onColorSchemeChange = (scheme: string) => {
        changeStyleSheetUrl('layout-css', 'layout-' + scheme + '.css', 1);
        changeStyleSheetUrl('theme-css', 'theme-' + scheme + '.css', 1);
        setColorScheme(scheme);
    };

    const changeStyleSheetUrl = (id: any, value: any, from: any) => {
        const element = document.getElementById(id) as HTMLInputElement;
        const urlTokens = (element.getAttribute('href') as String).split('/');

        if (from === 1) {
            // which function invoked this function - change scheme
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            // which function invoked this function - change color
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join('/');

        replaceLink(element, newURL);
    };

    const onMenuThemeChange = (theme: string) => {
        const layoutLink = document.getElementById('layout-css');
        const href = 'assets/layout/css/' + theme + '/layout-' + colorScheme + '.css';

        replaceLink(layoutLink, href);
        setTheme(theme);
    };

    const onComponentThemeChange = (theme: string) => {
        const themeLink = document.getElementById('theme-css');
        const href = 'assets/theme/' + theme + '/theme-' + colorScheme + '.css';

        replaceLink(themeLink, href);
        setComponentTheme(theme);
    };

    const replaceLink = (linkElement: any, href: string, callback?: any) => {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            const _linkElement = document.getElementById(id);
            _linkElement && _linkElement.remove();
            cloneLinkElement.setAttribute('id', id);

            if (callback) {
                callback();
            }
        });
    };

    return (
        <Routes>
            <Route path="/login" element={<Login colorScheme={colorScheme} />} />
            <Route path="/forgetPassword" element={<ForgetPassword colorScheme={colorScheme} />} />
            <Route path="/resetPassword/:user_id/:token" element={<ResetPassword colorScheme={colorScheme} />} />
            <Route path="*" element={<App colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange} componentTheme={componentTheme} onComponentThemeChange={onComponentThemeChange} theme={theme} onMenuThemeChange={onMenuThemeChange} />} />
        </Routes>
    );
};

export default AppWrapper;
