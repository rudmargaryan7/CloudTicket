import { AppDispatch } from "@/app/store";
import { logOutAction } from "@/features/auth/authReducer";

export const logout = (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch(logOutAction());
  window.location.pathname = "/";
};
