import CropImageModal from "../Modals/crop-image-modal"
import GlobalModal from "../Modals/global-modal"
import GlobalPayment from "../Modals/global-modal-payment"
import NewClientModal from "../Modals/new-client-modal"
import NewProjectModal from "../Modals/new-project-modal"

export const ModalProvider = (style)=>{
    return (
        <>
        <GlobalModal    style={style} />
        <NewClientModal style={style}  />
        <NewProjectModal style={style}  />
        <CropImageModal   />
        <GlobalPayment  style={style} />
        </>
    )
}

//