import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowToast(type, message) {
    const options = {
        position: 'top-center', // Corrected position
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        case 'warning':
            toast.warn(message, options);
            break;
        default:
            toast(message, options); // Default toast type if none of the specified types match
            break;
    }
}
