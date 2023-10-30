import { theme } from "@/app/providers/Providers";
import { Button, FormControl, FormLabel, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, Icon, Flex } from "@chakra-ui/react";
import {useRef} from "react"
import {HiOutlineSwitchHorizontal} from "react-icons/hi"
import PrimaryOptions from "../PrimaryOption";
import SecondaryOptions from "../OptionCurrency";
import { useState, useEffect } from "react"
import { nameIsPossibleSearch, switchIsPossible } from "@/utils/query/FormattedPossibleSearches";
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client";
import { CREATE_INTEREST } from "@/graphql/mutations/createInterest.mutation";
import { formatCoin } from "@/utils/formatCoin";
import {MdDeleteForever} from "react-icons/md"
import { useModalContext } from "@/app/providers/ModalProvider";

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
    const { onOpen, setTypeModal, setModalProps } = useModalContext()
    

  const handleSubmit = (e:any) => {
      e.preventDefault()
      if(!e.target.targetValue.value){
        toast.error("Ops, faltaram algumas informacoes")
        return
      }
      updateInterest({
          variables: {
              data: {
                  from: modalProps.code,
                  to: modalProps.codein,    
                  targetValue: +e.target.targetValue.value
              }
      }})
  }


  useEffect(() => {
      if(error){
          toast.error(error.message)
          return
      }
      if(data){
          toast.success(`Interesse de ${data.createInterest.from} para ${data.createInterest.to} no target de ${formatCoin(data.createInterest.targetValue, data.createInterest.from)} salvo com sucesso!`)
      }
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
              <FormControl>
                <FormLabel>Conversão:</FormLabel>
                <Flex alignItems={"center"} justifyContent={"center"} gap="5px" w="40%">
                <Input placeholder={`${modalProps.code}/${modalProps.codein}`} isDisabled type="number" name="" value="USD/BRL"/>
                </Flex>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor trackeado: </FormLabel>
                <Input placeholder={modalProps.targetValue} type="number" name="targetValue"/>
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