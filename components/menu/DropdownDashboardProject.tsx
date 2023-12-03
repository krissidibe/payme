import { Menu } from '@headlessui/react';
import React from 'react'
import { IoMdInformationCircleOutline, IoMdTrash } from 'react-icons/io';
import { MdInfo } from 'react-icons/md';

function DropdownDashboardProject({className="",children}) {
  return (
    <Menu>
     
    <Menu.Button  className={`${className}`} >

    <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="2" cy="2.5" r="2" fill="#A2A2A2"/>
<circle cx="8" cy="2.5" r="2" fill="#A2A2A2"/>
<circle cx="14" cy="2.5" r="2" fill="#A2A2A2"/>
</svg> 

    </Menu.Button>
  
    <Menu.Items className=" absolute  top-0  py-2  max-w-[160px] max-h-[80px] rounded-[12px] z-50 right-[70px]  text-white/80 flex flex-col justify-center w-full   bg-[#3d3d3d] ">
      
      {children}
     
    </Menu.Items>
  </Menu>
  )
}

export default DropdownDashboardProject