import { InputText } from 'primereact/inputtext';
import { GlobalFilterProps, onGlobalFilterChange } from 'utilities/Function/OnGlobalFilterChange';

export const RenderHeader = (globalFilterValue: string, { e, filters, setFilters, setGlobalFilterValue }: GlobalFilterProps) => {
    return (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={(e) => onGlobalFilterChange({ e, filters, setFilters, setGlobalFilterValue })} placeholder="Keyword Search" />
            </span>
        </div>
    );
};
