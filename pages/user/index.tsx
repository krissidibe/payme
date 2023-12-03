import React from "react";
import SideBar from "../../components/Items/SideBar";
import { HiFolder, HiFolderAdd } from "react-icons/hi";
import { IoIosNotifications, IoIosSearch, IoIosRefresh } from "react-icons/io";
import InputComponent from "../../components/UI/InputComponent";
import FolderComponent from "../../components/UI/FolderComponent";
import PdfBuilder from "../../components/PdfDemo";
import Dashboard from "../dashboard";
import useMenuStore from "../../utils/MenuStore";
import Gestions from "../gestions";
import Setting from "../setting";
import Finances from "../finances";
import Trash from "../trash";
 

function User(props) {
  const menuIndex = useMenuStore()
  return (
    <div className="flex flex-col w-full h-full ">
     
{menuIndex.index == 0 &&  <Dashboard/>} 
{menuIndex.index == 1 &&  <Finances/>} 
{menuIndex.index == 2 &&  <Gestions/>}
{menuIndex.index == 3 &&  <Setting/>}
{menuIndex.index == 4 &&  <Trash/>}
      
              


 
    </div>
  );
}

export default User;
 
