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
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider";
import { DELETE_INTEREST } from "@/graphql/mutations/deleteInterest";

interface InterestModal{
    isOpen: boolean
    onOpen?: ()=> void
    onClose: ()=> void
    modalProps: any
}

export default function DeleteInterestModal({onClose,isOpen, modalProps}: InterestModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [deleteInterest, {data, loading, error }] = useMutation(DELETE_INTEREST)
    const { onOpen, setTypeModal, setUpdateScreen } = useModalContext()

  const handleSubmit = (e:any) => {
      e.preventDefault()
      deleteInterest({
          variables: {
              data: {
                  interestName: modalProps
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
        toast.success(`Interesse ${modalProps} excluido com sucesso!`)
        onClose()
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
            <ModalHeader>Excluir Interesse</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Deseja mesmo excluir este interesse? </FormLabel>
              </FormControl>
            </ModalBody>
            <ModalFooter display={"flex"} justifyContent={"space-between"}>
                <Button isLoading={loading ? true : false} bg={"red.400"} type="submit" _hover={{backgroundColor: "red.500"}} onClick={() => {setTypeModal("delete"); onOpen()}} mr={3}>
                Excluir
            </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
                </chakra.form>
          </ModalContent>
        </Modal>
        </>
    )
}