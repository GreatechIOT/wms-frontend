import { decodeToken } from 'react-jwt';
import { getToken } from './GetLocalStorage';

interface DecodedToken {
    role: string;
}

export const decodeRole = () => {
    let splitToken = getToken()?.split('@')[0];
    let decodedToken = decodeToken(splitToken ?? '') as DecodedToken;

    return decodedToken.role;
};
