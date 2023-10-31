'use client';

import DeleteInterestModal from "@/app/components/DeleteInterestModal";
import EditInterestModal from "@/app/components/EditInterestModal";
import InterestModal from "@/app/components/InterestModal";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, SetStateAction, useState, useEffect } from "react";


interface ContextProps {
    isOpen: boolean
    onOpen: ()=> void
    onClose: ()=> void
    typeModal: string
    setTypeModal: React.Dispatch<SetStateAction<string>>
    setModalProps: React.Dispatch<SetStateAction<any>>
    
}

const ModalContext = createContext<ContextProps>({
    isOpen: false,
    typeModal: "edit" || "add" || "delete",
    onOpen: () => {},
    onClose: () => {},
    setTypeModal: () => {},
    setModalProps: () => {}
})

export const ModalProvider = ({ children }: {children: React.ReactNode}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [typeModal, setTypeModal] = useState<string>("add")
    const [modalProps, setModalProps] = useState<any>()


     const contextValues = {
        isOpen, onOpen, onClose, typeModal, setTypeModal, setModalProps
     }

     function renderModal(type: string){
        switch(type){
            case "add": return <InterestModal  isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
            case "edit": return <EditInterestModal modalProps={modalProps} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            case "delete": return <DeleteInterestModal modalProps={modalProps} isOpen={isOpen} onClose={onClose} onOpen={onOpen}/>
        }
     }  

     
     
    return (
        <ModalContext.Provider value={contextValues}>
            {renderModal(typeModal)}
            {children}
        </ModalContext.Provider>
    )
};

export const useModalContext = () => useContext(ModalContext);