import { Menu } from '@headlessui/react';
import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi';
import { TfiMoreAlt } from 'react-icons/tfi';
import { IoMdInformationCircleOutline, IoMdTrash } from 'react-icons/io';
import { MdInfo } from 'react-icons/md';

function DropdownProfileComponent({className="",children}) {
  return (
    <Menu>
    <Menu.Button  className={className} >

    <TfiMoreAlt className="w-4 h-4 opacity-40 " />

    </Menu.Button>
    <Menu.Items className=" absolute  top-2   py-2  min-w-[160px] rounded-[12px] z-20 left-[107px]  text-white/80 flex flex-col justify-center w-full   bg-[#323232] ">
      
      {children}
     
    </Menu.Items>
  </Menu>
  )
}

export default DropdownProfileComponent