import { ICurrency } from "@/app/modules/Currency/model/ICurrency.interface";
import { useModalContext } from "@/app/providers/ModalProvider";
import { formatCoin } from "@/utils/formatCoin";
import { Flex, Icon, Text, chakra } from "@chakra-ui/react";
import {AiOutlineStar} from "react-icons/ai"

interface SearchProps {
    width?: {
        base?: string
        md?: string
        lg?:string
        xl?: string
        "2xl"?: string
    }
    height: string
    currency: ICurrency
    userValue?: number
}

export default function Search({height,width, currency, userValue}: SearchProps){
    const { onOpen, setTypeModal, setModalProps } = useModalContext()



    return (
    <Flex border="1px solid white" boxShadow={"md"} justifyContent={"space-between"} position={"relative"} bgGradient={"linear-gradient(#4040402d,#22212190)"} backdropFilter='auto' backdropBlur='8px'  onClick={() => {setTypeModal("addBySearch"); setModalProps(currency); onOpen()}} flexDir={"column"} p="10px" h={height} w={width } minH='230px' rounded={"10px"}  textColor={"white"} gap="5px" shadow={"2px 2px 3px #f0f0f0"} fontWeight={"bold"}>
        <Text>Conversao: <chakra.span fontWeight={"normal"}>{`${currency.from}/${currency.to}`}</chakra.span> </Text>
        <Text>Nome: <chakra.span fontWeight={"normal"}> {currency.name}</chakra.span></Text>
        <Text  >{`${formatCoin(1, currency.from)} = ${formatCoin(+currency.buy, currency.to)}`}</Text>
        <Flex justifyContent={"space-between"} w="100%"  wrap={"wrap"} gap="10px" >
        <Flex flexDir={"column"}  w="70%" justifyContent={"space-between"}>
        <Text  >Compra: <chakra.span textColor={"green.400"} fontWeight={"normal"}>{formatCoin(+currency.buy, currency.to)}</chakra.span></Text> 
        <Text  >Venda: <chakra.span textColor={"green.400"} fontWeight={"normal"}>{formatCoin(+currency.sell, currency.to)}</chakra.span></Text> 
        </Flex>
        </Flex>
        <Text>Data da consulta: <chakra.span fontWeight={"normal"}> {currency.create_date}</chakra.span></Text>
    </Flex>
    )
}