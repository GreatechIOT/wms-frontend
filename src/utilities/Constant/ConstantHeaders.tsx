import { getToken } from 'utilities/Function/GetLocalStorage';

export const HEADERS = {
    headers: {
        token: getToken()
    }
};
