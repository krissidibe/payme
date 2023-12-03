import CropImageModal from "../Modals/crop-image-modal"
import GlobalModal from "../Modals/global-modal"
import NewClientModal from "../Modals/new-client-modal"
import NewProjectModal from "../Modals/new-project-modal"

export const ModalProvider = ()=>{
    return (
        <>
        <GlobalModal  />
        <NewClientModal/>
        <NewProjectModal/>
        <CropImageModal/>
        </>
    )
}