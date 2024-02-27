import { InputText } from 'primereact/inputtext';

export const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>, filters: any, setFilters: any, setGlobalFilterValue: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};

export const renderHeader = (globalFilterValue: string, onGlobalFilterChange: any, filters: any, setFilters: any, setGlobalFilterValue: React.Dispatch<React.SetStateAction<string>>, isBUMDashboard?: boolean) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {isBUMDashboard && (
                <div className="justify-content-start mt-1">
                    <h5>Machine Performance and Support Metrics</h5>
                </div>
            )}

            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={(e) => onGlobalFilterChange(e, filters, setFilters, setGlobalFilterValue)} placeholder="Keyword Search" />
                </span>
            </div>
        </div>
    );
};
