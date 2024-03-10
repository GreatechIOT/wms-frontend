import { createContext, useContext, useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { callApi } from '../Function/CallAPI';
import { showErrorToast } from '../Function/CustomToast';
import { getToken } from '../Function/GetLocalStorage';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    department: string;
    email: string;
    employee: string;
    position: string;
    privilege: string;
    role: string;
    section: string;
    token: string;
    job_title: string;
}

interface UserContextType {
    userDetail: User | null;
    setUserDetail: (user: User | null) => void;
    privilege: any; // Modify the type according to the privilege data structure
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userService = new UserService();
    const [loading, setLoading] = useState(false);
    const getUserID = getToken()?.split('@')[1];
    const navigate = useNavigate();

    const [userDetail, setUserDetail] = useState<User | null>(null);
    const [privilege, setPrivilege] = useState<any>(null); // Modify the type according to the privilege data structure

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (getToken()) {
                let apiFunc = userService.getOneUser;

                const data = {
                    user_id: getUserID
                };

                callApi(
                    {
                        apiFunc,
                        setLoading,
                        navigateToLogin: () => {
                            navigate('/login');
                        }
                    },
                    data
                ).then((res) => {
                    if (res && res?.status) {
                        setUserDetail(res.data);
                        const privilege = JSON.parse(res.data?.privilege);
                        setPrivilege(privilege[0]?.WMS);
                    } else {
                        if (!res.showError) {
                            showErrorToast(res?.message);
                        }
                    }
                });
            } else {
                navigate('/login');
            }
        }
    }, []);

    return <UserContext.Provider value={{ userDetail, setUserDetail, privilege }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
