import { ICurrency } from "@/app/modules/Currency/model/ICurrency.interface";
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
}

export default function Search({height,width, currency}: SearchProps){
    return (
    <Flex border="1px solid white" position={"relative"} flexDir={"column"} p="10px" h={height} w={width } rounded={"10px"} bg="gray.50" textColor={"black"} gap="5px" shadow={"2px 2px 3px #f0f0f0"} fontWeight={"bold"}>
        <Text>Conversao: <chakra.span fontWeight={"normal"}>{`${currency.from}/${currency.to}`}</chakra.span> </Text>
        <Text>Nome: <chakra.span fontWeight={"normal"}> {currency.name}</chakra.span></Text>
        <Flex   >
        <Flex minW={{base:"50%", sm:"50%", "2xl":"50%"}}    flexDir={"column"}>
        <Text minW="50%" >Compra: <chakra.span textColor={"green.400"} fontWeight={"normal"}>{formatCoin(+currency.buy, currency.from)}</chakra.span></Text>
        <Text  minW="50%">Venda:  <chakra.span textColor={"green.400"} fontWeight={"normal"}>{formatCoin(+currency.sell, currency.from)}</chakra.span></Text>
        </Flex>
        <Flex  justifyContent={"space-between"}  flexDir={"column"}>
        <Text>Alta: <chakra.span textColor={"green.400"} fontWeight={"normal"}>{formatCoin(+currency.high, currency.from)}</chakra.span></Text>
        <Text >Baixa: <chakra.span textColor={"red.400"} fontWeight={"normal"}>{formatCoin(+currency.low, currency.from)}</chakra.span></Text>
        </Flex>
        </Flex>
        <Text>Data da consulta: <chakra.span fontWeight={"normal"}> {currency.create_date}</chakra.span></Text>
    </Flex>
    )
}