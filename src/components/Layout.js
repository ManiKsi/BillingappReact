import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItems from "../pages/AddItems";
import Billing from "../pages/Billing";
import Inventory from "../pages/Inventory";
import { Stores } from "../pages/Stores";
import Transfer from "../pages/Transfer";
import Content from "./Content";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className=' h-screen w-screen flex'>
      <BrowserRouter>
        <div className='h-full flex p-4'>
          <Sidebar />
          <Routes>
            {/* <Inventory /> */}

            <Route index element={<Inventory />} />
            <Route path='/additems' element={<AddItems />} />
            <Route path='/billing' element={<Billing />} />
            <Route path='/transfer' element={<Transfer />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
