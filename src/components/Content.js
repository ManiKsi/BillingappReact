import React from "react";
import AddItems from "../pages/AddItems";
import Billing from "../pages/Billing";
import Inventory from "../pages/Inventory";
import { Stores } from "../pages/Stores";
import Transfer from "../pages/Transfer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Content = () => {
  return (
    <div className='h-full flex p-4'>
      {/* <Inventory /> */}

      <Route index element={<Inventory />} />
      <Route path='/additems' element={<AddItems />} />
      <Route path='/billing' element={<Billing />} />
      <Route path='/transfer' element={<Transfer />} />
    </div>
  );
};

export default Content;
