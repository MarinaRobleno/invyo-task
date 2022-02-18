import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const loginSuccess = () => {
    toast.success('Successfully logged in!', {
        theme: "colored"
    })
}
export const loginError = () => {
    toast.error('Invalid username or password', {
        theme: "colored"
    })
}
export const editSuccess = () => {
    toast.success('Successfully edited!', {
        theme: "colored"
    })
}
export const editError = () => {
    toast.error('Unable to edit the task', {
        theme: "colored"
    })
}
export const deleteSuccess = () => {
    toast.success('Successfully deleted!', {
        theme: "colored"
    })
}
export const deleteError = () => {
    toast.error('Unable to delete the task', {
        theme: "colored"
    })
}
export const addSuccess = () => {
    toast.success('Successfully added!', {
        theme: "colored"
    })
}
export const addError = () => {
    toast.error('Unable to add the task', {
        theme: "colored"
    })
}