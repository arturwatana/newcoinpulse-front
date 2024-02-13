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
    function formatDate(date: string){
        const dateStringArray = date.split(" ")
        const month = dateStringArray[1]
        const day = dateStringArray[2]
        const year = dateStringArray[3]

        return `${day}/${month}/${year}`
    }
    return (
<Flex border="1px solid white"  textAlign={{base: "start",md:"center"}} boxShadow={"md"} justifyContent={"space-between"} position={"relative"} bgGradient={"linear-gradient(#4040402d,#22212190)"} backdropFilter='auto' backdropBlur='8px'  onClick={() => {setTypeModal("addBySearch"); setModalProps(currency); onOpen()}} flexDir={"column"} p="10px" h={height} w={width } minH='230px' rounded={"10px"}  textColor={"white"} gap={{base:"15px", lg: "5px"}} shadow={"2px 2px 3px #f0f0f0"} fontWeight={"bold"}>
        <Text >Conversão: <chakra.span fontWeight={"normal"}>{`${currency.from}/${currency.to}`}</chakra.span> </Text>
        <Text  >{`1 ${currency.from} = ${+currency.lastPrice >= 1 ? parseFloat(currency.lastPrice).toFixed(3) : +currency.lastPrice} ${currency.to}`}</Text>
        <Flex justifyContent={"space-between"} w="100%"  wrap={"wrap"} gap="10px" >
            <Flex flexDir={"column"}  w="90%" justifyContent={"space-between"} gap="5px" >
                <Flex w="100%" flexDir={{base:"column",md: "row"}} justifyContent={"space-between"}>
                    <Text>Compra: <chakra.span  fontWeight={"normal"}>{`${+currency.sell >= 1 ? parseFloat(currency.sell).toFixed(3) : +currency.sell} ${currency.to}`}</chakra.span></Text> 
                    <Text>Venda: <chakra.span  fontWeight={"normal"}>{`${+currency.buy >= 1 ? parseFloat(currency.buy).toFixed(3) : +currency.buy} ${currency.to}`}</chakra.span></Text> 
                </Flex>
                <Flex w="100%" flexDir={{base:"column", md: "row"}} justifyContent={"space-between"}>
                    <Text>Alta: <chakra.span  fontWeight={"normal"}>{`${+currency.buy >= 1 ?  parseFloat(currency.buy).toFixed(3) : +currency.buy} ${currency.to}`}</chakra.span></Text> 
                    <Text>Baixa: <chakra.span  fontWeight={"normal"}>{`${+currency.buy >= 1 ? parseFloat(currency.buy).toFixed(3) : +currency.buy} ${currency.to}`}</chakra.span></Text> 
                </Flex>
                <Flex w="100%" textAlign={"start"} justifyContent={"space-between"}>
                    <Text>Variacao em 24h: <chakra.span textColor={(+currency.varPrice * 100 / 100) > 0 ? "green.500" : "red.500"} fontWeight={"normal"}>{`${((+currency.varPrice * 100) / 100).toFixed(3)}%`}</chakra.span></Text> 
                </Flex>
            </Flex>
        </Flex>
        <Text>Data da consulta: <chakra.span fontWeight={"normal"}> {formatDate(currency.create_date)}</chakra.span></Text>
    </Flex>
    )
}