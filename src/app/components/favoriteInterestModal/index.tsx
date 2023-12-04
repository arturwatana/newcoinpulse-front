import { Button, FormControl, FormLabel, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, Icon, Flex } from "@chakra-ui/react";
import { useEffect,useRef } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client";
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider";
import { FAVORITE_INTEREST } from "@/graphql/mutations/favoriteInterest.mutation";

interface InterestModal{
    isOpen: boolean
    onOpen?: ()=> void
    onClose: ()=> void
    modalProps: any
}

export default function ConfirmFavoriteInterestModal({onClose,isOpen, modalProps}: InterestModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [favoriteInterest, {data, loading, error }] = useMutation(FAVORITE_INTEREST)
    const { onOpen, setTypeModal, setUpdateScreen } = useModalContext()

  const handleSubmit = (e:any) => {
      e.preventDefault()
      favoriteInterest({
          variables: {
              data: {
                  from: modalProps.from,
                  to: modalProps.to,
                  favorite: !modalProps.favorite
              }
      }}).then(res => {
        setUpdateScreen((prev: UpdateScreenProps) => {
          return {
            ...prev,
            interests: true
          }

        })
        toast.success(`Interesse ${modalProps.from}/${modalProps.to} ${modalProps.favorite ? "desfavoritado" : "favoritado"}  com sucesso!`)
        onClose()
      }).catch(err => {
        return
      })
  }

    return (
        <>
            {modalProps.favorite === false ? (
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
            ): (
                <Modal

                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                      <chakra.form onSubmit={handleSubmit}>
                  <ModalHeader>Desfavoritar Interesse</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <FormLabel>Deseja mesmo desfavoritar este interesse? </FormLabel>
                    </FormControl>
                    <FormControl mt={4}>
                    <FormLabel>{`- ${modalProps.from}/${modalProps.to}`}</FormLabel>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter display={"flex"} justifyContent={"space-between"}>
                      <Button isLoading={loading ? true : false} bg={"red.400"} type="submit" _hover={{backgroundColor: "red.500"}} mr={3}>
                      Confirmar
                  </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                  </ModalFooter>
                      </chakra.form>
                </ModalContent>
              </Modal>
            )}
        </>
    )
}