import { useNavigate } from "react-router-dom";
import { signOut } from "../store/slices/auth";
import { deleteTokenFromLocalStorage } from "../utils/helper";

const useSignout = () => {
  const navigate = useNavigate();

  const processSignOut = () => {
    deleteTokenFromLocalStorage();
    signOut();
    navigate('/login');
  }

  return {
    processSignOut,
  }
};

export default useSignout;
