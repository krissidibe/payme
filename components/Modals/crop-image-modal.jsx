import React, { useState,useCallback,useRef } from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAlt,BiCrop } from "react-icons/bi";
import ButtonComponent from "../UI/ButtonComponent";
import { useRouter } from "next/router";
import { useCropImage } from "../../utils/use-crop-image-modal";
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import Cropper from 'react-easy-crop'
function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

function CropImageModal({handleDone=()=>{}}) {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const modal = useCropImage();
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedImage, setCroppedImage] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])


  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImage(imageDataUrl)
    }
  }



  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [image, croppedAreaPixels, rotation])

  if (!modal.isOpen) {
    return null;
  }
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center pb-20 transition bg-black/40 ">
      <div className="p-4 bg-[#323232]  z-50  w-[474px]  pt-10 px-8 flex flex-col items-center justify-center text-white rounded-xl">
        <div className="flex justify-between w-full gap-6">
       
<input ref={imageRef} type="file" className="hidden"  onChange={onFileChange} />
          <div    className="bg-zinc-500 relative h-[300px] w-[300px] rounded-xl">
     {image ?      <Cropper
    style={{
     
    }}
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={4 / 4}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      
    /> : null}
          </div>
          <div className="flex flex-col items-center gap-4">
            
            <div className="bg-white h-[150px] w-[150px] rounded-xl">
              <img src={croppedImage} />
            </div>
            <div onClick={showCroppedImage} className="flex  bg-gradient-to-r items-center gap-2 justify-center from-[#757575]  to-[#4c4c4c] w-[120px] p-1 text-center text-white text-sm cursor-pointer rounded-md shadow-md  ">
              <BiImageAlt className="w-6 h-6" />
              <span>Aperçu</span>
            </div>
            <div onClick={() => {
                   imageRef.current.click();
                    }} className="flex  bg-gradient-to-r items-center gap-2 justify-center from-[#757575]  to-[#4c4c4c] w-[120px] p-1 text-center text-white text-sm cursor-pointer rounded-md shadow-md  ">
              <BiCrop className="w-6 h-6" />
              <span>Fichier</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full gap-4 pt-6 pb-4 mt-10 border-t-[1px] border-t-white border-opacity-40">
          <ButtonComponent
            label={"Annuler"}
            handleClick={() => {
              modal.onClose()
            }}
            className="  min-h-[50px] w-[150px] font-bold "
          />
          <ButtonComponent
            label={"Appliquer"}
            handleClick={() => {
              modal.setImage(croppedImage)
              modal.onClose()
            }}
            className="bg-[#ffffff1c]  border-none min-h-[50px] w-[150px] font-bold "
          />
        </div>
      </div>
    </div>
  );
}

export default CropImageModal;
