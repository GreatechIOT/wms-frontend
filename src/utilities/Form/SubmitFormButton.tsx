import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

interface submitFormProps {
    label: string;
    loading: boolean
}

const SubmitFormButton = ({ label, loading }: submitFormProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="col-12 sm:col-12">
                <hr />
            </div>
            <div className="col-12 sm:col-12 md:col-3">
                <Button type="submit" label={label} loading={loading}></Button>
            </div>
            <div className="col-12 sm:col-12 md:col-3">
                <Button
                    type="button"
                    label="Back"
                    className="p-button-danger"
                    onClick={() => {
                        navigate(-1);
                    }}
                    loading={loading}
                ></Button>
            </div>
        </>
    );
};

export default SubmitFormButton;
