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
            <ModalBody display="flex" flexDir="column" gap="25px">
              <Flex flexDir="column">
                <Text borderBottom={"1px solid white" } py="10px"><chakra.span fontWeight={"bold"}>T-Compra -</chakra.span>  Valor de compra trackeado</Text>
                <Text  ><chakra.span fontWeight={"bold"}>T-Venda - </chakra.span>Valor de venda trackeado </Text>
              </Flex>
              <hr/>
              <Flex flexDir="column" gap="10px">
                <Text fontWeight={"semibold"}>Adicione valores T-Compra e T-Venda em seus interesses e receba notificacoes quando: </Text>
                <Text>O valor de compra da moeda atingir o máximo estipulado para compra.</Text>
                <Text>O valor de venda da moeda atingir o minimo estipulado para compra.</Text>
              </Flex>
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