import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { VscDashboard, VscPackage } from "react-icons/vsc";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiBillLine } from "react-icons/ri";
import { BiStore } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/Group 2@2x.png";
const Sidebar = () => {
  return (
    <div className='h-full w-40shadow-md bg-gray-50'>
      <section className='py-5  '>
        <img className=' w-24  ml-4' src={logo} />
      </section>
      <nav className='  font-semibold text-sm cursor-pointer text-gray-400'>
        <VStack className='w-full'>
          <Link>
            <VscDashboard className=' text-2xl inline mr-2' />
            Dashboard
          </Link>
          <NavLink
            to='/'
            className='w-full  p-2 pl-6 cursor-pointer '
            activeClassName='active'
            end
          >
            <VscPackage className=' text-2xl inline mr-2' />
            Inventory
          </NavLink>
          <NavLink
            to='/additems'
            className='w-full  p-2 pl-6 cursor-pointer  '
            activeClassName='active'
          >
            <AiOutlineFileAdd className=' text-2xl inline mr-2' />
            Add Items
          </NavLink>
          <NavLink
            to='/billing'
            className='w-full  p-2 pl-6 cursor-pointer  '
            activeClassName='active'
          >
            <RiBillLine className=' text-2xl inline mr-2' />
            Billing
          </NavLink>
        </VStack>
      </nav>
    </div>
  );
};

export default Sidebar;
