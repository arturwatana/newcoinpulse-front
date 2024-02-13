"use client"
import {Flex, chakra, Heading, Icon} from "@chakra-ui/react"
import SearchCurrency from "../components/SearchCurrency"
import { useModalContext } from "../providers/ModalProvider"
import TableInterests from "../components/TableInterests"
import {IoIosInformationCircleOutline} from "react-icons/io"

export default function Panel(){
    const { onOpen, setTypeModal } = useModalContext()

    return (
    <chakra.section  display={"flex"} pt="120px"  h="100%"   justifyContent={"center"}  >
                <Flex   maxW='1920px' w={{base:"100%","2xl":"90%"}}  alignItems={{base:"center","2xl":"center"}}  gap={{base:"80px", "2xl": "50px"}}  textColor={"white"} flexDir={{base: "column","2xl":"column"}} justifyContent={"space-between"}    > 
                    <Flex  h="100%"  minH={{base:"200px", xl:"0"}} alignItems={"start"} justifyContent={"center"} w={{base: "90%", lg:"40%"}} >
                        <SearchCurrency searchW={{base:"100%", md:"80%", lg:"60%", "2xl":"70%"}} logged w="100%"  name="Consultar conversão" resultH="30%"/>
                    </Flex>
                        <Flex justifyContent={"start"} minH="600px" gap="80px" flexDir={"column"} h="80%" w={{base: "100%","2xl":"70%"}}  py='10px' alignItems={"center" }   >
                            <Flex flexDir={"column"}    h="100%" w="100%" gap="15px" >
                                <Heading w="100%"textAlign={"center"}>Interesses favoritados</Heading>
                                <Flex w={{base:"95%", xl: "97%" ,"2xl":"100%"}} justifyContent={"end"} mb="10px" textColor={"white"} alignItems={"center"} gap="10px">
                                    <Icon fontSize={28} cursor="pointer" onClick={() => {setTypeModal("subtitles"); onOpen()}} as={IoIosInformationCircleOutline} />
                                </Flex>
                    <Flex justifyContent={{base:"end", md: "center"}} w="100%" >
                            <TableInterests/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </chakra.section>
)
}