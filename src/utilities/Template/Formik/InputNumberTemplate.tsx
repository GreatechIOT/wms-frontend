import { InputNumber } from 'primereact/inputnumber';

import { H1, H2, H3, H4, H5 } from '../../Constant/ConstantLabelHeading';
import FormError from '../../Form/FormError';

interface InputNumberTemplateProps {
    formik?: any;
    value?: string;
    fieldName?: string;
    label?: string;
    onChangeFunction?: any;
    labelSize?: string;
    disabled?: boolean;
    icon?: string;
}

export const InputNumberTemplate: React.FC<InputNumberTemplateProps> = ({ formik, value, fieldName = '', label = fieldName, onChangeFunction, disabled = false, labelSize, icon = '' }) => {
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

    return (
        <div className="col-12">
            {switchLabelSize()}

            <div className="p-inputgroup mt-1">
                <span className="p-inputgroup-addon">
                    <i className={`pi pi-${icon}`}></i>
                </span>
                <InputNumber
                    name={fieldName}
                    value={formik ? formik.values[fieldName] : value}
                    onValueChange={formik ? (onChangeFunction ? onChangeFunction : formik.handleChange) : onChangeFunction}
                    onBlur={formik ? formik.handleBlur : () => {}}
                    placeholder={`Enter ${label}`}
                    min={0}
                    disabled={disabled}
                />
            </div>

            {formik && <FormError touched={formik.touched[fieldName]} errors={formik.errors[fieldName]} />}
        </div>
    );
};
