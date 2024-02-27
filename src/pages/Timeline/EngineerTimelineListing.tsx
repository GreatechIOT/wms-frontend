import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onGlobalFilterChange, renderHeader } from 'utilities/Function/DataTableKeywordSearch';

const EngineerTimelineListing = () => {
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const menuAction = useRef<Menu>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [timelineList, setTimelineList] = useState<any>([]);
    const actionItem: MenuItem[] = [
        {
            label: 'Edit',
            icon: 'pi pi-pencil'
            // command: (e) => {
            //     navigate('/EditCategory/' + selectedCategory?.id);
            // }
        },
        {
            label: 'Deactivate',
            icon: 'pi pi-trash',
            command: (e) => {
                // confirmDialog({
                //     header: 'Confirmation',
                //     message: 'Are you sure you want to deactivate this category?',
                //     icon: 'pi pi-exclamation-triangle',
                //     accept: () => {
                //         setLoading(true);
                //         const data = {
                //             category_id: selectedCategory?.id
                //         };
                //         let apiFunc = categoryService.deactivateCategory;
                //         callApi(
                //             {
                //                 apiFunc,
                //                 setLoading,
                //                 navigateToLogin: () => {
                //                     navigate('/login');
                //                 }
                //             },
                //             data
                //         ).then((res) => {
                //             if (res && res?.status) {
                //                 showSuccessToast(res.message);
                //                 getActiveAndDeactiveCategory();
                //             } else {
                //                 if (!res.showError) {
                //                     showErrorToast(res?.message);
                //                 }
                //             }
                //         });
                //     },
                //     reject: () => {}
                // });
            }
        }
    ];
    const actionBodyTemplate = (e: any) => {
        return (
            <div className="flex">
                <Menu model={actionItem} popup ref={menuAction} id="popup_menu" />
                <Button
                    className="p-button-text"
                    icon="pi pi-ellipsis-h"
                    onClick={(event) => {
                        setSelectedCategory(e);
                        menuAction?.current?.toggle(event);
                    }}
                    aria-controls="popup_menu"
                    aria-haspopup
                />
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="text-right">
                <div className="p-input-icon-left w-full md:w-20rem">
                    <i className="pi pi-search " />
                    <InputText style={{ background: 'white', border: '1px solid #ccc' }} className="w-full" value={globalFilterValue} onChange={(e) => onGlobalFilterChange(e, filters, setFilters, setGlobalFilterValue)} placeholder="Keyword Search" />
                </div>
            </div>
        );
    };
    return (
        <React.Fragment>
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <div style={{ marginBottom: '40px' }}>
                            <DataTable
                                header={renderHeader}
                                paginator
                                rows={10}
                                filters={filters}
                                onFilter={(e: any) => setFilters(e.filters)}
                                value={timelineList}
                                globalFilterFields={['category_type']}
                                rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
                                emptyMessage="No category found."
                                loading={loading}
                            >
                                <Column field="category_type" header="Project Category" />
                                <Column field="add_item" header="Project ID" />
                                <Column field="add_item" header="Member" />
                                <Column field="add_item" header="Timeline" />
                                <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default EngineerTimelineListing;
