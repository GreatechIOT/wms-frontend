
interface formErrorProps {
    touched: any,
    errors: any
}

const FormError = ({touched, errors}: formErrorProps) => {
  return (
      <div>
          {touched && errors ? (
              <div className="error-align-left" style={{ color: 'red' }}>
                  {errors}
              </div>
          ) : null}
      </div>
  );
}

export default FormError