import { LS_STATE, LS_TOKEN, LS_USERNAME } from 'utilities/Constant/LocalStorageName';

export const clearLocalStorage = () => {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_USERNAME);
    localStorage.removeItem(LS_STATE);
};
