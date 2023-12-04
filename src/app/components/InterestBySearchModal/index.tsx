import { Button, FormControl, FormLabel, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, Icon, Flex, Text } from "@chakra-ui/react";
import {useRef, useState, useEffect } from "react"
import { useMutation } from "@apollo/client";
import { CREATE_INTEREST } from "@/graphql/mutations/createInterest.mutation";
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider";
import { theme } from "@/app/providers/Providers";
import { toast } from "react-toastify"
import { formatCoin } from "@/utils/formatCoin";

interface TargetValueProps {
    buy: number
    sell: number
}

interface InterestModal{
    isOpen: boolean
    onOpen?: ()=> void
    onClose: ()=> void
    modalProps: any
}

export default function InterestBySearchModal({onClose,isOpen, modalProps}: InterestModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [updateInterest, {data, loading, error }] = useMutation(CREATE_INTEREST)
    const [userValue, setUserValue] = useState<number>(0)
    const { onOpen, setTypeModal, setModalProps, setUpdateScreen } = useModalContext()
    function calcValues(){
      if(modalProps.userValue){
          return +modalProps.userValue  * +modalProps.low
      }
      else {
          return 1 * +modalProps.low
      }
  }

  const handleSubmit = (e:any) => {
      e.preventDefault()
      if(!e.target.targetValueBuy.value && !e.target.targetValueSell.value){
        toast.error("Ops, faltaram algumas informacoes")
        return
      }
      updateInterest({
          variables: {
              data: {
                  from: modalProps.from,
                  to: modalProps.to,    
                  buy: +e.target.targetValueBuy.value,
                  sell: +e.target.targetValueSell.value
              }
      }}).then(res => {
        setUpdateScreen((prev: UpdateScreenProps) => {
          return {
            ...prev,
            interests: true
          }
        })
          toast.success(`Interesse de ${data.createInterest.from} para ${data.createInterest.to} salvo com sucesso!`)
          onClose()
      }).catch(err => {
        return
      })
  }

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
            <ModalHeader>Adicionar Interesse</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Conversão:</FormLabel>
                <Flex alignItems={"center"} justifyContent={"center"} gap="5px" w="40%">
                <Input placeholder={`${modalProps.from}/${modalProps.to}`} isDisabled type="number" name="" value="USD/BRL"/>
                </Flex>
              </FormControl>
                <Flex>
              <FormControl mt={4}>
                <FormLabel>T-Compra: </FormLabel>
                <Input  w="90%" step="0.0000000001" type="number" name="targetValueBuy" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>T-Venda: </FormLabel>
                <Input  w="90%" step="0.0000000001" type="number" name="targetValueSell" />
              </FormControl>
                </Flex>


            </ModalBody>
            <ModalFooter display={"flex"} >
              <Button isLoading={loading ? true : false} bg={theme.colors.brand.primary} type="submit" _hover={{backgroundColor: "#fdcd5e"}} mr={3}>
                Adicionar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
                </chakra.form>
          </ModalContent>
        </Modal>
        </>
    )
}