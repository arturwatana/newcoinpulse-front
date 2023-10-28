"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select, Box } from "@chakra-ui/react"
import { theme } from "../providers/Providers"
import {HiOutlineSwitchHorizontal} from "react-icons/hi"
import Paginate from "../components/Paginate"
import { useEffect, useState } from "react"



export default function Panel(){
    const [qtdPerPage, setQtdPerPage] = useState<number>(12)
    const elements = new Array(0).fill("1")
    const filter ="Todas"

    return (
        <chakra.section maxW="100vw" w="100%" display={"flex"}  minH="100vh" h="100%" className="main"   justifyContent={"center"} alignItems={"center"} py="150px" >
            <Flex  w="80%" minH="60%"  justifyContent={"end"} alignItems={"center"} >
                <Flex w="80%"  textColor={"white"} flexDir={"column"} justifyContent={"start"} alignItems={"center"} py="20px" gap="20px"> 
                    <Heading w='full' textAlign={"center"}>Adicionar interesse</Heading>
                    <FormControl  w="60%" textColor={"white"} flexDir={"row"} display={"flex"} justifyContent={"center"} alignItems={"center"}  >
                        <chakra.form  flexDir={"column"} display={"flex"} alignItems={"center"} gap="15px">
                            <Flex w="100%" gap="15px" justifyContent={"center"} alignItems={"center"}>
                                <Select>
                                    <chakra.option value="" textColor="black">USD</chakra.option>
                                    <chakra.option value="" textColor="black">BRL</chakra.option>
                                    <chakra.option value="" textColor="black">GBP</chakra.option>
                                </Select>
                                <Icon as={HiOutlineSwitchHorizontal} cursor={"pointer"} fontSize={"20px"}/>
                                <Select>
                                    <chakra.option value="" textColor="black" >USD</chakra.option>
                                    <chakra.option value="" textColor="black">BRL</chakra.option>
                                    <chakra.option value="" textColor="black">GBP</chakra.option>
                                </Select>
                            </Flex>
                        <Button w="100%" bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} >Consultar</Button>
                        </chakra.form>
                   </FormControl>
                
                <Flex  flexDir={"column"} alignItems={"end"} gap="15px" minW="100%">
                    <Flex w="54%" justifyContent={"space-between"}  alignItems={"center"} >
                    <Flex h="100%" flexDir={"column"} gap="5px">
                        <Text>Filtrar por conversao</Text>
                        <Select>
                            <chakra.option value="" textColor="black" >USD/BRL</chakra.option>
                            <chakra.option value="" textColor="black">BRL/GBP</chakra.option>
                            <chakra.option value="" textColor="black">GBP/USD</chakra.option>
                        </Select>
                    </Flex>
                    <Flex  h="100%" flexDir={"column"} alignItems={"end"} gap="5px">
                    <Text>Quantidade por pagina</Text>
                    <Select  minH="100%" defaultValue={12} w="50%" onChange={(e) => setQtdPerPage(+e.target.value)}>
                        <chakra.option key="option1"  textColor={"black"}>12</chakra.option>
                        <chakra.option key="option2" textColor={"black"}>24</chakra.option>
                        <chakra.option key="option3" textColor={"black"}>48</chakra.option>
                        <chakra.option key="option4" textColor={"black"}>96</chakra.option>
                    </Select>
                    </Flex>
                    </Flex>
                   <Flex border="1px solid white" minH="25em" minW="100%" bgColor={"rgba(48,48,48,0.6)"}  backdropFilter='auto' backdropBlur='8px' rounded="lg"  py='10px'  wrap={"wrap"}>
                       <Paginate elements={elements} filterByName={filter} qtdPerPage={qtdPerPage}/>
                   </Flex>
                </Flex>
                </Flex>
            </Flex>
        </chakra.section>
    )
}