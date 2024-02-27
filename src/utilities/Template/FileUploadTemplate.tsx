export const chooseOptions = (chooseLabel: string) => {
    return { icon: `pi pi-fw pi-${chooseLabel}`, iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
};
export const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
export const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
export const emptyTemplate = (label: string) => {
    return (
        <div className="flex align-items-center flex-column">
            <span style={{ fontSize: '1.2em', color: 'grey' }}>
                Drag and Drop <b>{label}</b> Here
            </span>
        </div>
    );
};
