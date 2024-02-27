import { Dropdown } from 'primereact/dropdown';

import { H1, H2, H3, H4, H5 } from '../../Constant/ConstantLabelHeading';
import FormError from '../../Form/FormError';

interface DropdownTemplateProps {
    formik?: any;
    value?: string;
    fieldName?: string;
    label?: string;
    onChangeFunction?: any;
    options?: any[];
    optionLabel?: string;
    disabled?: boolean;
    labelSize?: string;
    filterByName?: string;
    classname?: string;
    icon?: string;
    valueTemplate?: any;
    itemTemplate?: any;
}

export const DropdownTemplate: React.FC<DropdownTemplateProps> = ({
    formik,
    value,
    fieldName = '',
    label = fieldName,
    onChangeFunction,
    options,
    optionLabel = '',
    disabled = false,
    labelSize,
    filterByName = '',
    classname = 'col-12',
    icon = '',
    valueTemplate,
    itemTemplate
}) => {
    const switchLabelSize = () => {
        switch (labelSize) {
            case H1:
                return <h1>{label}</h1>;
            case H2:
                return <h2>{label}</h2>;
            case H3:
                return <h3>{label}</h3>;
            case H4:
                return <h4>{label}</h4>;
            case H5:
                return <h5>{label}</h5>;
            default:
                return <label>{label}</label>;
        }
    };

    const selectedTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div> {optionLabel ? option[optionLabel] : option}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const optionTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <div> {optionLabel ? option[optionLabel] : option}</div>
            </div>
        );
    };

    return (
        <div className={classname}>
            {switchLabelSize()}

            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className={`pi pi-${icon}`}></i>
                </span>
                <Dropdown
                    name={fieldName}
                    value={formik ? formik.values[fieldName] : value}
                    onChange={formik ? (onChangeFunction ? onChangeFunction : formik.handleChange) : onChangeFunction}
                    onBlur={formik ? formik.handleBlur : () => {}}
                    options={options ? options : []}
                    optionLabel={optionLabel}
                    placeholder={`Select ${label}`}
                    filter
                    filterBy={filterByName}
                    valueTemplate={valueTemplate ? valueTemplate : selectedTemplate}
                    itemTemplate={itemTemplate ? itemTemplate : optionTemplate}
                    disabled={disabled}
                />
            </div>

            {formik && <FormError touched={formik.touched[fieldName]} errors={formik.errors[fieldName]} />}
        </div>
    );
};
