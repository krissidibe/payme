import React from 'react'
import { MdFolder } from 'react-icons/md'
import { Shimmer } from 'react-shimmer'

function FolderComponent({item=null,className="",add=false,isShimmer=false,handleClick=()=>{}}) {


    if(isShimmer){
      return (

        <div className={`relative  flex flex-col select-none items-center  animate-pulse  min-h-full mr-1 cursor-pointer overflow-ellipsis`} >
            <MdFolder className={`min-w-[150px] h-[150px]  text-[#ffffff1f] ${className}`} />
            <p className="w-[120px] absolute top-[140px] animate-pulse duration-100 xl:w-[110px] mr-[15px] bg-[#ffffff1f] p-2 rounded-full ">
          {" "}
        </p>
        </div>
      )
    }
    else{
        
      return (

        <div onClick={handleClick} className={`relative  flex flex-col select-none items-center max-h-[200px] mr-1 cursor-pointer overflow-ellipsis`} >
            <MdFolder className={`min-w-[160px] h-[155px] ${className}`} />
    
            <div className="h-[62px] absolute bottom-[-1px] text-center w-full overflow-ellipsis line-clamp-2  ">
              {item.name == "NOUVEAU" &&  <p className={`bottom-0 mt-3 font-normal overflow-ellipsis line-clamp-2   leading-[20px]  text-[18px]   ${item.name == "NOUVEAU" ? "opacity-100 text-white/60" :""}`}>{item.name.toUpperCase()}</p>}
              {item.name != "NOUVEAU" &&  <p className={`bottom-0 mt-3 font-normal overflow-ellipsis line-clamp-2   leading-[20px]  text-[17px] ${className} ${item.name == "NOUVEAU" ? "opacity-100 text-white" :""}`}>{item.name.toUpperCase()}</p>}
           
 
            </div>
           
    
            
           {add &&( <p className='absolute text-5xl text-white opacity-60 top-14'>+</p>)}
        </div>
      )
    }
}

export default FolderComponent