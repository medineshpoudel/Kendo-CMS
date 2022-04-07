import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import DrawerContainer from "./component/admin/DrawerContainer";
import { BrowserRouter } from "react-router-dom";
import FormInput from "./component/admin/FormInput";
import { Routes, Route } from "react-router-dom";
import DataGrid from "./component/admin/DataGrid";
import Update from "./component/admin/Update";
import SignupForm from "./component/login/SignupForm";
import LoginForm from "./component/login/LoginForm";
import ForgotPassword from "./component/login/ForgotPassword";
import Roles from "./component/roles/Roles";
import { userAuthStore } from "./store/Authstore";
import Footer from "./component/admin/Footer";
function App() {
  const { loggedIn } = userAuthStore();
  return (
    <>
      <BrowserRouter>
        {!loggedIn && (
          <Routes>
            <Route path="/" element={<LoginForm />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/forgot" element={<ForgotPassword />}></Route>
          </Routes>
        )}
        {loggedIn && (
          <>
            <DrawerContainer>
              <Routes>
                <Route path="/create" element={<FormInput />}></Route>
                <Route path="/data-grid" element={<DataGrid />}></Route>
                <Route path="/update/:id" element={<Update />}></Route>
                <Route path="/roles" element={<Roles />}></Route>
              </Routes>
            </DrawerContainer>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
