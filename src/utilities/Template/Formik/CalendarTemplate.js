import React from 'react';

import { Calendar } from 'primereact/calendar';

import { H1, H2, H3, H4, H5 } from '../../Constant/ConstantLabelHeading';
import FormError from '../../Form/FormError';

export const CalendarTemplate = ({ formik, value, fieldName = '', label = fieldName, onChangeFunction, labelSize, classname = 'col-12', selectionMode = 'range', showIcon = false, disabled = false, showButtonBar = false, icon = '' }) => {
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
            {switchLabelSize(labelSize)}

            <div className="p-inputgroup">
                {' '}
                <span className="p-inputgroup-addon">
                    <i className={`pi pi-${icon}`}></i>
                </span>
                <Calendar
                    name={fieldName}
                    value={formik ? formik.values[fieldName] : value}
                    onChange={formik ? (onChangeFunction ? onChangeFunction : formik.handleChange) : onChangeFunction}
                    placeholder="Select date"
                    onBlur={formik ? formik.handleBlur : () => {}}
                    selectionMode={selectionMode}
                    disabled={disabled}
                    showIcon={showIcon}
                    showButtonBar={showButtonBar}
                />
            </div>

            {formik && <FormError touched={formik.touched[fieldName]} errors={formik.errors[fieldName]} />}
        </div>
    );
};
