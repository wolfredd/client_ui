import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const useToast = () => {
  const toastFunc = useContext(ToastContext);

  const toast = ({ message, description, isSuccess = true }) => {
    if (isSuccess) {
      toastFunc.success(message, { description })
    } else {
      toastFunc.error(message, { description })
    }
  }

  return {
    toast,
  }
};

export default useToast;
