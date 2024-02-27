import { clearLocalStorage } from './ClearLocalStorage';
import { VerifyToken } from './VerifyToken';

interface CallApiOptions<T> {
    apiFunc: (...args: any[]) => Promise<T>;
    setLoading?: (loading: boolean) => void;
    navigateToLogin?: () => void;
}

export function callApi<T>({ apiFunc, setLoading, navigateToLogin }: CallApiOptions<T>, ...args: any[]): Promise<T> {
    if (setLoading) {
        setLoading(true);
    }
    return apiFunc(...args)
        .then((res: any) => {
            if (setLoading) {
                setLoading(false);
            }
            if (res.verifyToken === false) {
                VerifyToken();
                clearLocalStorage(); 
                if (navigateToLogin) {
                    navigateToLogin();
                }
            }
            return res;
        })
        .catch((err: Error) => {
            if (setLoading) {
                setLoading(false);
            }

            return { message: err.message, status: false };
        });
}
