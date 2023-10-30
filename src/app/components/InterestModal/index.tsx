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

interface InterestModal{
    isOpen: boolean
    onOpen: ()=> void
    onClose: ()=> void
}

export default function InterestModal({onClose,isOpen,onOpen}: InterestModal){
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [primaryValue, setPrimaryValue] = useState<string>("BRL")
    const [secondaryValue, setSecondaryValue] = useState<string>("")
    const [switchSearches, setSwitchSearches ] = useState<boolean>(false)
    const [createInterest, {data, loading, error }] = useMutation(CREATE_INTEREST)

    function switchValues(primary: string, second: string){
      const isPossible = nameIsPossibleSearch(second)
      if(!isPossible){
          toast.error(`Ops, essa conversao de ${primary} para ${second} ainda nao é possivel. `)
          return
      }
      const isPossibleSwitch = switchIsPossible(primary, second)
      if(!isPossibleSwitch){
          toast.error(`Ops, essa conversao de ${primary} para ${second} ainda nao é possivel. `)
          return
      }
      const prevPrimary = primary
      const prevSecondary = second
      setSwitchSearches(true)
      setSecondaryValue(prevPrimary)
      setPrimaryValue(prevSecondary)

  }

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
            <ModalHeader>Adicionar Interesse</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>

                <FormLabel>Selecionar conversão:</FormLabel>
                <Flex alignItems={"center"} justifyContent={"center"} gap="5px">
                <Select name="from" onChange={(e) => setPrimaryValue(e.target.value)}>
                <PrimaryOptions/>
                  </Select>
                  <Icon as={HiOutlineSwitchHorizontal} cursor={"pointer"} fontSize={"20px"} onClick={() => switchValues(primaryValue, secondaryValue)}/>
                  <Select name="to">
                  <SecondaryOptions switchSearches={switchSearches} setSwitchSearches={setSwitchSearches} name={primaryValue} setSecondaryValue={setSecondaryValue}/>
                  </Select>
                </Flex>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Valor trackeado: </FormLabel>
                <Input placeholder='5.36' type="number" name="targetValue"/>
              </FormControl>
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