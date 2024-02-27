import { toast } from 'react-toastify';

interface ToastMessagesOptions {
    severity: 'success' | 'error' | 'warning';
}

const toastMessages: Record<string, ToastMessagesOptions> = {
    success: {
        severity: 'success'
    },
    error: {
        severity: 'error'
    },
    warning: {
        severity: 'warning'
    }
};

const showToast = (message: string, status: keyof typeof toastMessages, onCloseFunction?: { (): any }, autoClose = 2000) => {
    if (status === 'success') {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: autoClose,
            onClose: onCloseFunction
        });
    } else if (status === 'error') {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: autoClose,
            onClose: onCloseFunction
        });
    } else if (status === 'warning') {
        toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: autoClose,
            onClose: onCloseFunction
        });
    }
};

export const showSuccessToast = (message: string, onCloseFunction?: () => any) => {
    showToast(message?.toString() ? message?.toString() : 'Success', toastMessages.success.severity, onCloseFunction);
};

export const showErrorToast = (message: string, onCloseFunction?: () => any) => {
    showToast(message?.toString() ? message?.toString() : 'Failed', toastMessages.error.severity, onCloseFunction);
};

export const showWarningToast = (message: string, onCloseFunction?: () => any) => {
    showToast(message?.toString() ? message?.toString() : 'Warning', toastMessages.warning.severity, onCloseFunction);
};
