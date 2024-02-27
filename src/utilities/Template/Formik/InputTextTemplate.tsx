import { InputText } from 'primereact/inputtext';

import { H1, H2, H3, H4, H5 } from '../../Constant/ConstantLabelHeading';
import FormError from '../../Form/FormError';

interface InputTextTemplateProps {
    formik?: any;
    value?: string;
    fieldName?: string;
    label?: string;
    onChangeFunction?: React.Dispatch<React.SetStateAction<string>>;
    disabled?: boolean;
    labelSize?: string;
    classname?: string;
    icon?: string;
}

export const InputTextTemplate: React.FC<InputTextTemplateProps> = ({ formik, value, fieldName = '', label = fieldName, onChangeFunction, disabled = false, labelSize, classname = 'col-12', icon = '' }) => {
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
        <div className={classname}>
            {switchLabelSize()}

            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className={`pi pi-${icon}`}></i>
                </span>
                <InputText
                    name={fieldName}
                    value={formik ? formik.values[fieldName] : value}
                    onChange={formik ? (onChangeFunction ? onChangeFunction : formik.handleChange) : onChangeFunction}
                    onBlur={formik ? formik.handleBlur : () => {}}
                    placeholder={`Enter ${label}`}
                    disabled={disabled}
                />
            </div>

            {formik && <FormError touched={formik.touched[fieldName]} errors={formik.errors[fieldName]} />}
        </div>
    );
};
