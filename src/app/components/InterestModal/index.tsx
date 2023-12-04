import { theme } from "@/app/providers/Providers";
import { Button, FormControl, FormLabel, chakra, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, Icon, Flex } from "@chakra-ui/react";
import {useRef} from "react"
import PrimaryOptions from "../PrimaryOption";
import SecondaryOptions from "../OptionCurrency";
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useMutation } from "@apollo/client";
import { CREATE_INTEREST } from "@/graphql/mutations/createInterest.mutation";
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider";
import { FaArrowRightLong } from "react-icons/fa6";

interface InterestModal{
    isOpen: boolean
    onOpen: ()=> void
    onClose: ()=> void
}

export default function InterestModal({onClose,isOpen,onOpen}: InterestModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [primaryValue, setPrimaryValue] = useState<string>("1INCH")
    const [interestIn, setInterestIn] = useState<string>("Compra")
    const [secondaryValue, setSecondaryValue] = useState<string>("BTC")
    const [switchSearches, setSwitchSearches ] = useState<boolean>(false)
    const [createInterest, {data, loading, error }] = useMutation(CREATE_INTEREST)
    const { setTypeModal, setUpdateScreen } = useModalContext()

  const handleSubmit = (e:any) => {
      e.preventDefault()
      if(!e.target.from.value || !e.target.to.value || !e.target.targetValue.value){
        toast.error("Ops, faltaram algumas informacoes")
        return
      }
        createInterest({
            variables: {
                data: {
                    from: e.target.from.value,
                    to: e.target.to.value,    
                    buy: e.target.interestIn.value === "Compra" ? +e.target.targetValue.value : 0,
                    sell: e.target.interestIn.value === "Venda" ? +e.target.targetValue.value : 0,
                }
        }}).then(res => {
          setUpdateScreen((prev: UpdateScreenProps) => {
            return {
              ...prev,
              interests: true
            }
          })
            toast.success(`Interesse de ${res.data.createInterest.from} para ${res.data.createInterest.to} salvo com sucesso!`)
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
                <FormLabel>Selecionar conversão:</FormLabel>
                <Flex alignItems={"center"} justifyContent={"center"} gap="5px">
                <Select name="from" defaultValue={"USD"} onChange={(e) => setPrimaryValue(e.target.value)}>
                <PrimaryOptions/>
                  </Select>
                  <Icon as={FaArrowRightLong} cursor={"pointer"} fontSize={"20px"}/>
                  <Select name="to">
                  <SecondaryOptions switchSearches={switchSearches} setSwitchSearches={setSwitchSearches} name={primaryValue} setSecondaryValue={setSecondaryValue}/>
                  </Select>
                </Flex>
              </FormControl>
              <Flex justifyContent={"center"} alignItems={{base:"start",lg:"center"}} flexDir={{base:"column",lg:"row"}} mt={4} gap="20px">
              <FormControl  >
                <FormLabel>Valor trackeado: </FormLabel>
                <Input w={{base:"60%",lg:"100%"}} placeholder='Valor para rastrear' step="0.0000000001" type="number" name="targetValue"/>
              </FormControl>
              <FormControl  h="100%">
                <FormLabel>Para: </FormLabel>
                <Select defaultValue={"Compra"} name="interestIn" onChange={(e) => setInterestIn(e.target.value)} w={{base:"60%",lg:"100%"}}>
                  <chakra.option value="Compra">Compra</chakra.option>
                  <chakra.option value="Venda">Venda</chakra.option>
                </Select>
              </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
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