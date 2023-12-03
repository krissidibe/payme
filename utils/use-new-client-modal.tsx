import { create } from "zustand"
 


interface useClientProp{
    isOpen:boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}







export const  useNewClientModal = create<useClientProp>((set)=>({
isOpen :false,
onOpen:()=> set({isOpen:true}),
onClose:()=> set({isOpen:false}),
}))