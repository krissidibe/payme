import { Menu } from '@headlessui/react';
import React from 'react'
import { IoMdInformationCircleOutline, IoMdTrash } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import { MdInfo } from 'react-icons/md';

function DropdownProjectFilterItem({comp,className="",children}) {
  return (
    <Menu>
    <Menu.Button  className={className} >

     <div className='p-1 '> 
     {comp}
    {/*  <MdMoreHoriz className="w-5 h-5 opacity-40 hover:opacity-100" /> */}
     </div>

    </Menu.Button>
    <Menu.Items className=" absolute  top-8  py-2  max-w-[160px] min-w-[160px] max-h-[130px] min-h-[130px] rounded-[12px] z-50 right-[110px]  text-white/80 flex flex-col justify-center w-full   bg-[#3d3d3d] ">
     
      {children}
     
    </Menu.Items>
  </Menu>
  )
}

export default DropdownProjectFilterItem