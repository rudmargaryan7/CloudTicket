import { createContext, useEffect, useState } from "react";
import AppRoutes from "./routes";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { initLocationApp } from "./utils/initilization";
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material";
import { theme } from "./utils/materialUiTheme";
//toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useQuery from "./utils/query";
import { authUser } from "./api";
import { setUser, UserType } from "./features/auth/authReducer";

//tooltip
import "react-tooltip/dist/react-tooltip.css";

export const LoadingContext = createContext((e: boolean) => {});

function App() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const { onSumbit } = useQuery(authUser, {}, (data) => {
    dispatch(setUser(data.payload as UserType));
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      onSumbit();
    }
    initLocationApp(dispatch);
  }, []);

  const isAdmin = selector.app
    ? selector.app.email === "admin@admin.gmail.com"
    : false;
  return (
    <div className="w-full flex flex-col h-full">
      <ThemeProvider theme={theme}>
        <LoadingContext.Provider value={setLoading}>
          <AppRoutes isAdmin={isAdmin} />
          <ToastContainer />
        </LoadingContext.Provider>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </div>
  );
}

export default App;
