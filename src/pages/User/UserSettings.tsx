import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TabMenu } from 'primereact/tabmenu';
import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { callApi } from 'utilities/Function/CallAPI';
import { showErrorToast, showSuccessToast } from 'utilities/Function/CustomToast';
import { getToken } from 'utilities/Function/GetLocalStorage';
import { onGlobalFilterChange } from 'utilities/Function/DataTableKeywordSearch';
import UserService from 'services/UserService';
import { useNavigate } from 'react-router-dom';
import { system_name } from 'config/ServerConfig';
import { DOCUMENT_TITLE } from 'utilities/Constant/DocumentTitleName';

const UserSettings = () => {
    document.title = DOCUMENT_TITLE.User_Settings;
    const [username, setUsername] = useState<string>('');
    const [visibleEditUserPrivilege, setVisibleEditUserPrivilege] = useState(false);
    const [user_id, setUser_id] = useState<number | null>(null);
    const [newUserSettingArray, setNewUserSettingArray] = useState<any>([]);
    const [userSettingObject, setUserSettingObject] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [userList, setUserList] = useState<any>();
    const [columns, setColumns] = useState<any>([]);
    const [userSettingArray, setUserSettingArray] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const items = [{ label: 'Engineer' }, { label: 'Management' }];
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const userService = new UserService();
    const navigate = useNavigate();
    const [isEdited, setIsEdited] = useState<boolean>(false);

    const [userSettingList, setUserSettingList] = useState<any>();
    const [oldUserSettingObject, setOldUserSettingObject] = useState<any>([]);

    const capitalizeWords = (input: string) => {
        const words = input.split('_'); // Split the string into words based on underscores
        const capitalizedWords = words.map((word) => {
            // Capitalize the first letter of each word and make the rest lowercase
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return capitalizedWords.join(' '); // Join the words with a space
    };

    const editUserPrivilege = (user_id: number | null) => {
        let oldUserSettingObject = userSettingList.find((role: any) => role.id === user_id).privilege;
        oldUserSettingObject[0].WMS = userSettingObject;
        let newUserSettingObject = oldUserSettingObject;

        const data = {
            user_id: user_id,
            privilege: JSON.stringify(newUserSettingObject),
            system_name: system_name
        };

        let apiFunc = userService.editUserPrivilege;

        callApi(
            {
                setLoading,
                apiFunc,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            data
        ).then((res) => {
            if (res && res?.status) {
                showSuccessToast(res.message);
                setVisibleEditUserPrivilege(false);
                setUser_id(null);
                setIsEdited(!isEdited);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };
    const rowBodyTemplate = (data: any, options: any) => {
        const fieldArray = options.field.split('.');

        if (data[fieldArray[0]][fieldArray[1]] === true) {
            return <div className="pi pi-check text-green-500 font-semibold"></div>;
        } else if (data[fieldArray[0]][fieldArray[1]] === false) {
            return <div className="pi pi-times text-pink-500 font-semibold"></div>;
        } else {
            return;
        }
    };

    const groupUserSettingObject = (array: string[]) => {
        const categorizedActions: { [key: string]: string[] } = {};

        array.forEach((action) => {
            const parts = action.split('_');
            const category = parts.length > 1 ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

            if (!categorizedActions[category]) {
                categorizedActions[category] = [];
            }

            categorizedActions[category].push(action);
        });

        setNewUserSettingArray(categorizedActions);
    };


    const displayEditUserPrivilegeDialog = (rowData: any, c_props: any) => {
        setVisibleEditUserPrivilege(true);
        setUsername(rowData.name);
        setUser_id(rowData.id);
        setUserSettingObject(rowData.privilege);
        setUserSettingArray(Object.keys(rowData.privilege));
        groupUserSettingObject(Object.keys(rowData.privilege));
    };

    const parsePrivilege = (privilege: string) => {
        try {
            const new_privilege = JSON.parse(privilege);

            return new_privilege[0].WMS;
        } catch (error) {
            console.error('Error parsing privilege JSON:', error);
            return null;
        }
    };

    useEffect(() => {
        setLoading(true);

        let apiFunc = userService.getUserPrivilege;
        let cols: any = [];

        callApi(
            {
                apiFunc,
                setLoading,
                navigateToLogin: () => {
                    navigate('/login');
                }
            },
            {}
        ).then((res: any) => {
            if (res && res?.status) {
                const privilege_list = res.data?.map((item: any) => {
                    return {
                        ...item,
                        privilege: JSON.parse(item.privilege)
                    };
                });


                setUserSettingList(privilege_list);

                const newUserList = res.data?.map((item: any) => {
                    return {
                        ...item,
                        privilege: parsePrivilege(item.privilege)
                    };
                });
                setUserList(newUserList);

                const privilege = newUserList[0]?.privilege;


                for (const key in privilege) {
                    if (privilege?.hasOwnProperty(key)) {
                        const words = key.split('_');
                        const firstWord = words[0];
                        const secondWord = words.slice(1).join(' ');
                        const formattedHeader = `${firstWord.charAt(0).toUpperCase()}${firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase()}${secondWord.slice(1)}`;

                        cols.push({
                            field: 'privilege.' + key,
                            header: formattedHeader
                        });
                    }
                }
                setColumns(cols);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    }, [isEdited]);

    const renderHeader = () => {
        return (
            <div className="text-right">
                <div className="p-input-icon-left w-full md:w-20rem">
                    <i className="pi pi-search " />
                    <InputText
                        style={{ background: 'white', border: '1px solid #ccc' }}
                        className="w-full"
                        value={globalFilterValue}
                        onChange={(e) => onGlobalFilterChange(e, filters, setFilters, setGlobalFilterValue)}
                        placeholder="Keyword Search"
                        disabled={loading}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <Dialog
                //style={{width: '300px'}}
                header={username}
                visible={visibleEditUserPrivilege}
                onHide={() => {
                    setVisibleEditUserPrivilege(false);
                    setUser_id(null);
                }}
            >
                {Object.keys(newUserSettingArray).map((group, index) => (
                    <div key={index}>
                        <h5 className="">{group}</h5>
                        <div className="flex flex-wrap align-items-center -mt-3 mb-4">
                            {newUserSettingArray[group].map((item: any, subIndex: any) => (
                                <div className="flex align-items-center mt-2 mr-3" key={subIndex}>
                                    <Checkbox
                                        value={item}
                                        checked={userSettingObject[item]}
                                        disabled={loading}
                                        onChange={(e) => {
                                            setUserSettingObject((prevState: any) => ({
                                                ...prevState,
                                                [item]: e.checked
                                            }));
                                        }}
                                    />
                                    <label htmlFor={item} className="ml-2">
                                        {capitalizeWords(item)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="text-right">
                    <Button label="Save Changes" icon="pi pi-save" onClick={() => editUserPrivilege(user_id)} loading={loading} />
                </div>
            </Dialog>

            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <div style={{ marginBottom: '40px' }}>
                            <DataTable
                                header={renderHeader}
                                paginator
                                rows={10}
                                filters={filters}
                                onFilter={(e: any) => {
                                    setFilters(e.filters);
                                }}
                                value={userList}
                                globalFilterFields={['name']}
                                rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                                emptyMessage="No user found."
                                loading={loading}
                            >
                                <Column
                                    bodyStyle={{
                                        textAlign: 'center',
                                        overflow: 'visible',
                                        alignContent: 'center'
                                    }}
                                    body={(data, c_props) => (
                                        <div className="flex" style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                className="p-button-text bg-blue-500 text-white"
                                                icon="pi pi-pencil"
                                                tooltip="Edit"
                                                tooltipOptions={{ position: 'left' }}
                                                onClick={() => {
                                                    displayEditUserPrivilegeDialog(data, c_props);
                                                }}
                                                aria-controls="popup_menu"
                                                aria-haspopup
                                                loading={loading}
                                            />
                                        </div>
                                    )}
                                />
                                <Column style={{ minWidth: '200px', maxWidth: '200px' }} field="name" header="Employee" frozen></Column>

                                {columns?.map((col: any, i: any) => (
                                    <Column style={{ minWidth: '200px' }} key={col.field} field={col.field} header={col.header} body={rowBodyTemplate}></Column>
                                ))}
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSettings;
