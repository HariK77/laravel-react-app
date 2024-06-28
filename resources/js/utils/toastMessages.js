import { toast } from "react-toastify";


export const notify = (message = 'Success !', type = 'success') => {

    toast[type](message, {
        position: "top-right"
    });
}
