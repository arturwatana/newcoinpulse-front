import { Flex, Text, chakra } from "@chakra-ui/react";

export default function Search(){
    return (
        <Flex border="1px solid white" flexDir={"column"} p="10px" rounded={"10px"} bg="gray.50" textColor={"black"} shadow={"2px 2px 3px #f0f0f0"} fontStyle={"bold"}>
        <Text>Conversao: USD/BRL</Text>
        <Text>Nome: Dólar Americano/Real Brasileiro</Text>
        <Text>Alta: <chakra.span textColor={"green.400"}>R$5,00</chakra.span></Text>
        <Text>Baixa: <chakra.span textColor={"red.400"}>R$4,50</chakra.span></Text>
        <Text>Data da consulta: Fri Oct 27 2023</Text>
    </Flex>
    )
}