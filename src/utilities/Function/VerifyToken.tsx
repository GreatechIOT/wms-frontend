import Swal from 'sweetalert2';

const swalFire = () => {
    Swal.fire({
        title: 'Your token is expired.',
        text: 'Please login again.',
        icon: 'warning',
        allowOutsideClick: false,
        allowEscapeKey: false
    });
};

export const VerifyToken = () => {
    swalFire();
};
