
import { Button, FormControl, FormLabel, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, Icon, Flex } from "@chakra-ui/react";

import {useRef} from "react"

interface UserModal{
    isOpen: boolean
    onOpen?: ()=> void
    onClose: ()=> void
    modalProps: any
}

export default function NewLogin({onClose,isOpen, modalProps}: UserModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    return (
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
              <chakra.form onSubmit={handleSubmit}>
          <ModalHeader>Favoritar Interesse</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Deseja mesmo favoritar este interesse? </FormLabel>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{`- ${modalProps.from}/${modalProps.to}`}</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"space-between"}>
              <Button isLoading={loading ? true : false} bg={"green.400"} type="submit" _hover={{backgroundColor: "green.500"}} mr={3}>
              Confirmar
          </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
              </chakra.form>
        </ModalContent>
      </Modal>
    )
}