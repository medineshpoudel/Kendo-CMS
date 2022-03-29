import DrawerContainer from "./DrawerContainer";
import { Routes, Route } from "react-router-dom";
import FormInput from "./FormInput";
import DataGrid from "./DataGrid";
import Update from "./Update";
import Footer from "./Footer";
const DrawerComp = () => {
  return (
    <>
      <DrawerContainer>
        <Routes>
          <Route path="/create" element={<FormInput />}></Route>
          <Route path="/data-grid" element={<DataGrid />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
        </Routes>
      </DrawerContainer>
      <Footer />
    </>
  );
};
export default DrawerComp;
