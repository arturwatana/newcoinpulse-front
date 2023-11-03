import { theme } from "@/app/providers/Providers";
import { Button, FormControl, FormLabel, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, Icon, Flex, Text } from "@chakra-ui/react";
import {useRef} from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client";
import { CREATE_INTEREST } from "@/graphql/mutations/createInterest.mutation";
import { formatCoin } from "@/utils/formatCoin";
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider";

interface InterestModal{
    isOpen: boolean
    onOpen?: ()=> void
    onClose: ()=> void
    modalProps: any
}

export default function EditInterestModal({onClose,isOpen, modalProps}: InterestModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [updateInterest, {data, loading, error }] = useMutation(CREATE_INTEREST)
    const { onOpen, setTypeModal, setModalProps, setUpdateScreen } = useModalContext()
    

  const handleSubmit = (e:any) => {
      e.preventDefault()
      if(!e.target.targetValueBuy.value && !e.target.targetValueSell.value){
        toast.error("Ops, faltaram algumas informacoes")
        return
      }
      updateInterest({
          variables: {
              data: {
                  from: modalProps.code,
                  to: modalProps.codein,    
                  buy: +e.target.targetValueBuy.value,
                  sell: +e.target.targetValueSell.value
              }
      }})
  }


  useEffect(() => {
      if(error){
          toast.error(error.message)
          return
      }
      if(data){
        setUpdateScreen((prev: UpdateScreenProps) => {
          return {
            ...prev,
            interests: true
          }
        })
          toast.success(`Interesse de ${data.createInterest.from} para ${data.createInterest.to} atualizado com sucesso!`)
          onClose()
        }
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

    return (
        <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
              <chakra.form onSubmit={handleSubmit}>
            <ModalHeader>Editar Interesse</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text mb="15px" textColor={"gray.700"} fontWeight={"semibold"} _hover={{textColor:"gray.500"}} cursor={"pointer"} onClick={() => {setModalProps({from: modalProps.code, to: modalProps.codein, favorite: modalProps.favorite});setTypeModal("favorite"); onOpen()}}>{modalProps.favorite ? "Desfavoritar Interesse" : "Favoritar Interesse"}</Text>
              <FormControl>
                <FormLabel>Conversão:</FormLabel>
                <Flex alignItems={"center"} justifyContent={"center"} gap="5px" w="40%">
                <Input placeholder={`${modalProps.code}/${modalProps.codein}`} isDisabled type="number" name="" value="USD/BRL"/>
                </Flex>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor trackeado para Compra: </FormLabel>
                <Input placeholder={formatCoin(+modalProps.targetValue.buy, modalProps.code)} w="60%" step="0.001" type="number" name="targetValueBuy"/>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor trackeado para Venda: </FormLabel>
                <Input placeholder={formatCoin(+modalProps.targetValue.sell, modalProps.code)}  w="60%" step="0.001" type="number" name="targetValueSell"/>
              </FormControl>
            </ModalBody>
            <ModalFooter display={"flex"} justifyContent={"space-between"}>
            <Button bg={"red.400"} type="submit" _hover={{backgroundColor: "red.500"}} onClick={() => {setModalProps(`${modalProps.code}-${modalProps.codein}`);setTypeModal("delete"); onOpen()}} mr={3}>
                Excluir
            </Button>
                <Flex>
              <Button isLoading={loading ? true : false} bg={theme.colors.brand.primary} type="submit" _hover={{backgroundColor: "#fdcd5e"}} mr={3}>
                Editar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
                </Flex>
            </ModalFooter>
                </chakra.form>
          </ModalContent>
        </Modal>
        </>
    )
}