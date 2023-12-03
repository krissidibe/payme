import { Menu } from '@headlessui/react';
import React from 'react'
import { IoMdInformationCircleOutline, IoMdTrash } from 'react-icons/io';
import { IoListSharp } from 'react-icons/io5';
import { MdInfo } from 'react-icons/md';

function DropdownGlobalClientComponent({className="",children}) {
  return (
    <Menu>
    <Menu.Button  className={className} >

      <IoListSharp className="w-6 h-6 ml-4 " />

    </Menu.Button>
    <Menu.Items className=" absolute  top-[80px]  py-2  max-w-[165px] rounded-[12px] z-20 right-[240px]  text-white/80 flex flex-col justify-center w-full   bg-[#323232] ">
      
      {children}
     
    </Menu.Items>
  </Menu>
  )
}

export default DropdownGlobalClientComponent