import React from "react";
import { create } from "zustand";


interface useCropImageProp{
    isOpen:boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
    onSubmit: any;
    image?: Blob ;
    setImage: (i) => void;
}







export const  useCropImage = create<useCropImageProp>((set)=>({
 
isOpen :false,
setImage: (i) => set((state) => ({ image:i })),
onOpen:()=> set({isOpen:true}),
onClose:()=> set({isOpen:false}),
onSubmit: <React.Component/>,
}))