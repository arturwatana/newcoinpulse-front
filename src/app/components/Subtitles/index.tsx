import { theme } from "@/app/providers/Providers";
import { Button, Flex, chakra, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface SubtitlesModal{
    isOpen: boolean
    onOpen: ()=> void
    onClose: ()=> void
}

export default function SubtitlesModal({onClose,isOpen,onOpen}: SubtitlesModal){
    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Legendas</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text borderBottom={"1px solid white" } py="10px"><chakra.span fontWeight={"bold"}>T-Compra -</chakra.span>  Valor de compra trackeado</Text>
                <Text  ><chakra.span fontWeight={"bold"}>T-Venda - </chakra.span>Valor de venda trackeado</Text>
            </ModalBody>
  
            <ModalFooter>
              <Button bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} mr={3} onClick={onClose}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}