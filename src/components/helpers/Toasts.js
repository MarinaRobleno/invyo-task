import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const loginSuccess = () => {
    toast.success('Successfully logged in!')
}
export const loginError = () => {
    toast.error('Invalid username or password')
}
export const editSuccess = () => {
    toast.success('Successfully edited!')
}
export const editError = () => {
    toast.error('Unable to edit the task')
}
export const deleteSuccess = () => {
    toast.success('Successfully deleted!')
}
export const deleteError = () => {
    toast.error('Unable to delete the task')
}
export const addSuccess = () => {
    toast.success('Successfully added!')
}
export const addError = () => {
    toast.error('Unable to add the task')
}