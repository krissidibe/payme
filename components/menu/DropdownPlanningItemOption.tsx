import { Menu } from '@headlessui/react';
import React from 'react'
import { IoMdInformationCircleOutline, IoMdTrash } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { MdInfo } from 'react-icons/md';

function DropdownPlanningItemOption({className="",addActive,children}) {
  return (
    <Menu >
    <Menu.Button  className={className} >

     <div className='bg-[#ffffff0c] rounded-full p-1 '> 
     <MdMoreHoriz className="w-5 h-5 opacity-60 hover:opacity-100" />
     </div>

    </Menu.Button>
    <Menu.Items className={`absolute  top-[80px]  py-2  max-w-[205px] rounded-[12px] z-20 ${addActive ? "right-[230px]" :"right-[70px]" }   text-white/80 flex flex-col justify-center w-full   bg-[#323232] `}>
      
      {children}
     
    </Menu.Items>
  </Menu>
  )
}

export default DropdownPlanningItemOption