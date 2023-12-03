import { Menu } from '@headlessui/react';
import React from 'react'
import { IoMdInformationCircleOutline, IoMdTrash } from 'react-icons/io';
import { MdInfo } from 'react-icons/md';

function DropdownComponent({className="",children}) {
  return (
    <Menu>
    <Menu.Button  className={className} >

      <MdInfo className="w-8 h-8 " />

    </Menu.Button>
    <Menu.Items className=" absolute  top-16  py-2  max-w-[255px] rounded-[12px] z-20 right-4  text-white/80 flex flex-col justify-center w-full   bg-[#323232] ">
      
      {children}
     
    </Menu.Items>
  </Menu>
  )
}

export default DropdownComponent