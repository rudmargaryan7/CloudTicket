// src/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FC, lazy, memo, Suspense } from "react";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Backdrop, CircularProgress } from "@mui/material";
import FilterPage from "./pages/Filter";
import MyAccount from "./pages/MyAccount";

const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));

type AppRoutesType = {
  isAdmin: boolean;
};

const AppRoutes: FC<AppRoutesType> = ({ isAdmin }) => {
  if (isAdmin) {
    return (
      <Router>
        <Suspense
          fallback={
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
              onClick={() => {}}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          }
        >
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <>
                    <Header />
                    <Admin />
                  </>
                }
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    );
  }
  return (
    <Router>
      <Suspense
        fallback={
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            onClick={() => {}}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <div className="app">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <div className="content">
                    <Header />
                    <Home />
                  </div>
                }
              ></Route>
              <Route
                path="account"
                element={
                  <div className="content">
                    <Header />
                    <MyAccount />
                  </div>
                }
              ></Route>
              <Route
                path="filter"
                element={
                  <div className="content">
                    <Header />
                    <FilterPage />
                  </div>
                }
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
};

export default memo(AppRoutes);
