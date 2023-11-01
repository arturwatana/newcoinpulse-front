"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select, Box, useDisclosure, Spinner } from "@chakra-ui/react"
import { theme } from "../providers/Providers"
import { luckyOfDay } from "@/utils/luckyOfDay"
import {useEffect, useState} from "react"
import SearchCurrency from "../components/SearchCurrency"
import { GET_USERLAST15DAYSINTERESTS } from "@/graphql/query/getUserLast15DaysFromInterests"
import { useQuery } from "@apollo/client"
import InterestTracking from "../components/InterestTracking"
import { toast } from "react-toastify"
import { useModalContext } from "../providers/ModalProvider"


export default function Panel(){
    const {data, loading, error, refetch } = useQuery(GET_USERLAST15DAYSINTERESTS)
    const [interests, setInterests] = useState([])
    const { onOpen, setTypeModal, updateScreen } = useModalContext()
    
    useEffect(() => {
        if(error){
            toast.error(error.message)
            return
        }
        if(data){
            const firstElements = data.getUserLast15DaysFromInterests.slice(0,5)
            setInterests(firstElements)
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data, error]);
      useEffect(() => {
        if(updateScreen.interests){
            refetch()
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[updateScreen, refetch])
      

    return (
        <chakra.section   maxW="100vw" w="100%"  display={"flex"}  minH="100vh" h="100%" className="main"   justifyContent={"center"} alignItems={"center"} py="150px" >
            <Flex  w={{base:"100%", "2xl":"80%" }}  minH="60%" justifyContent={{base:"center", "2xl":"end"}}    h={{base:"100%","2xl":"60vh"}} >
                <Flex  w={{base:"100%","2xl":"80%"}} alignItems={{base:"center","2xl":"start"}}  pl={{base: "0","2xl":"0" }}gap={{base:"40px", "2xl": "0"}}  textColor={"white"} flexDir={{base: "column","2xl":"row"}} justifyContent={"space-between"}    > 
                <Flex   w={{base:"70%", "2xl": "100%"}} alignItems={"center"} justifyContent={"center"}>
                   <SearchCurrency searchW={{base:"100%", md:"80%", lg:"60%", "2xl":"70%"}} logged w="100%"  name="Consultar conversao" resultH="30%"/>
                </Flex>
                   <Flex justifyContent={"start"} gap="80px" flexDir={"column"} h="80%" w={{base: "90%","2xl":"70%"}}  py='10px' alignItems={"center" }   >
                   <Flex flexDir={"column"} minW={{base:"50%","2xl":"650px"}}  justifyContent={"start"} alignItems={"center" } border="1px solid white" rounded='lg'  py='10px' gap="10px" bgColor={"rgba(50,50,50,0.8)"} backdropFilter='auto' backdropBlur='8px'>
                    <Heading fontSize={"29.12px"}>Sorte do dia</Heading>
                    <Text w="70%" textAlign={"center"} fontSize={"18px"}>{luckyOfDay}</Text>
                   </Flex>
                   
                   <Flex flexDir={"column"} w="100%" gap="15px" bgColor={"rgba(50,50,50,0.6)"} backdropFilter='auto' backdropBlur='8px' >
                <Flex justifyContent={"center"} alignItems={"center"}>
                <Button   display={{base:"flex", "2xl":"none"}} bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} onClick={() => {setTypeModal("add"); onOpen() }}>Adicionar interesse</Button>
                </Flex>
                        <Heading w="100%" textAlign={"center"}>Interesses favoritados</Heading>
                   <Flex border="1px solid white" rounded="lg" w="100%" flexDir={"column"} justifyContent={"start"} alignItems={"center" }  gap="20px">
                        <chakra.ul w="100%" listStyleType={"none"} display={"flex"} flexDir={"column"} >
                            <chakra.ul bg={theme.colors.brand.primary} rounded="6px 6px 0 0"  fontWeight={"bold"} listStyleType={"none"} display={"flex"} justifyContent={"space-evenly"} textColor={"gray.800"} alignItems="center"borderBottom={"1px solid white"} h="2em"> 
                                <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} >
                                    Sigla
                                </chakra.li>
                                <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} >
                                    Alta
                                </chakra.li>
                                <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} display={{base: "none","2xl": "flex"}} >
                                    Baixa
                                </chakra.li>
                                <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} >
                                    Target
                                </chakra.li>
                                <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"}  display={{base: "none","2xl": "flex"}}>
                                    Diária
                                </chakra.li>
                                <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"}display={{base: "none","2xl": "flex"}} >
                                    Quinzenal
                                </chakra.li>
                            </chakra.ul>
                                {loading ? (
                                    <Flex w="100%" h="100%" alignItems={"center"} justifyContent={"center"}>
                                        <Spinner />
                                    </Flex>
                                ) : interests && interests.length > 0 ? (interests.map((interest: any, index) => <InterestTracking w="100%" h="100%" key={`track${index}`} code={interest.code} codein={interest.codein} high={interest.high} lastDays={interest.lastDays} low={interest.low}  name={interest.name} targetValue={interest.targetValue} varBid={interest.varBid}/>)) : <Text textAlign={"center"} p="20px">Ainda nao estamos trackeando nada, <chakra.a cursor={"pointer"} textDecor={"Highlight"} onClick={() => {setTypeModal("add"); onOpen() }}>clique aqui para rastrear uma conversao!</chakra.a></Text>}
                            </chakra.ul>
                   </Flex>
                   </Flex>
                   </Flex>

                </Flex>
            </Flex>
        </chakra.section>
    )
}