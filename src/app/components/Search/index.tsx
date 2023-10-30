import { ICurrency } from "@/app/modules/Currency/model/ICurrency.interface";
import { formatCoin } from "@/utils/formatCoin";
import { Flex, Icon, Text, chakra } from "@chakra-ui/react";
import {AiOutlineStar} from "react-icons/ai"

interface SearchProps {
    width: string
    height: string
    currency: ICurrency
}

export default function Search({height,width, currency}: SearchProps){
    return (
    <Flex border="1px solid white" position={"relative"} flexDir={"column"} p="10px" h={height} w={width} rounded={"10px"} bg="gray.50" textColor={"black"} shadow={"2px 2px 3px #f0f0f0"} fontStyle={"bold"}>
        <Text>Conversao: {`${currency.from}/${currency.to}`}</Text>
        <Text>Nome:  {currency.name}</Text>
        <Text>Alta: <chakra.span textColor={"green.400"}>{formatCoin(+currency.high, currency.from)}</chakra.span></Text>
        <Text>Baixa: <chakra.span textColor={"red.400"}>{formatCoin(+currency.low, currency.from)}</chakra.span></Text>
        <Text>Data da consulta: {currency.create_date}</Text>
        <Icon as={AiOutlineStar} fontSize={"22px"} position={"absolute"} top="10%" right="3%" />
    </Flex>
    )
}