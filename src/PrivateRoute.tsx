import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { getToken } from './utilities/Function/GetLocalStorage';
import { Permission } from 'pages/Authentication/Permission';
import { ACCESS } from 'utilities/Constant/ConstantName';

interface Props {
    element: JSX.Element;
    path?: string;
}

interface DecodedToken {
    role: string;
}
const PrivateRoute: React.FC<Props> = ({ element, path }) => {
    const splitToken = getToken()?.split('@')[0];
    if (!getToken()) {
        return <Navigate to="/login" />;
    }
    return element;
};
export { PrivateRoute };
