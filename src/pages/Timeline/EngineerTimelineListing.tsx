import moment from 'moment';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineService from 'services/TimelineService';
import { callApi } from 'utilities/Function/CallAPI';
import { showErrorToast } from 'utilities/Function/CustomToast';
import { onGlobalFilterChange, renderHeader } from 'utilities/Function/DataTableKeywordSearch';
import { TabMenu } from 'primereact/tabmenu';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import CategoryService from 'services/CategoryService';
import { CategoryType } from 'utilities/Interface/CategoryInterface';

const EngineerTimelineListing = () => {
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'item.category.category_type': { value: null, matchMode: FilterMatchMode.IN }
    });
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const menuAction = useRef<Menu>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [timelineList, setTimelineList] = useState<any>([]);
    const [filteredTimelineList, setFilteredTimelineList] = useState<any>([]);
    const [categoryOptions, setCategoryOptions] = useState<CategoryType[] | []>([]);
    const timelineService = new TimelineService();
    const categoryService = new CategoryService();

    const getActiveCategoryForItem = () => {
        let apiFunc = categoryService.getActiveCategoryForItem;

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
                const newCategoryList = res.data.map(({ id, category_type }: any) => ({ id, category_type }));
                setCategoryOptions(newCategoryList);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };

    const getSubordinatesTimeline = () => {
        let apiFunc = timelineService.getSubordinatesTimeline;

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
            console.log(res);
            if (res && res?.status) {
                console.log(res.data1);
                setTimelineList(res.data1);
            } else {
                if (!res.showError) {
                    showErrorToast(res?.message);
                }
            }
        });
    };

    useEffect(() => {
        getSubordinatesTimeline();
        getActiveCategoryForItem();
    }, []);

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

    const timelineBodyTemplate = (rowData: any) => {
        return moment(rowData.start_date).format('DD MMM YYYY') + ' - ' + moment(rowData.end_date).format('DD MMM YYYY');
    };

    const descriptionBodyTemplate = (rowData: any) => {
        if (rowData.item.item_description) {
            return rowData.item.item_description;
        } else {
            return '--';
        }
    };

    const categoryFilterTemplate = (options: any) => {
        console.log(options);
        return <MultiSelect value={options.value} options={categoryOptions} optionLabel="category_type" onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" />;
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
                                //filterDisplay="row"
                                filters={filters}
                                onFilter={(e: any) => setFilters(e.filters)}
                                value={timelineList}
                                globalFilterFields={['item.category.category_type', 'item.item_name', 'user.name']}
                                rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
                                emptyMessage="No project found."
                                loading={loading}
                            >
                                <Column
                                    field="item.category.category_type"
                                    header="Project Category"
                                    filterField="item.category.category_type"
                                    showFilterMatchModes={false}
                                    filterMenuStyle={{ width: '14rem' }}
                                    style={{ minWidth: '14rem' }}
                                    filter
                                    filterElement={categoryFilterTemplate}
                                />
                                <Column field="item.item_name" header="Project ID" />
                                <Column field="item.item_description" header="Project Description" body={descriptionBodyTemplate} />
                                <Column field="user.name" header="Member" />
                                <Column field="end_date" body={timelineBodyTemplate} header="Timeline" sortable />
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