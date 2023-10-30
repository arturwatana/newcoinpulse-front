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


export default function Panel(){
    const [primaryValue, setPrimaryValue] = useState<string>("USD")
    const [secondaryValue, setSecondaryValue] = useState<string>("")
    const {data, loading, error } = useQuery(GET_USERLAST15DAYSINTERESTS)
    const [interests, setInterests] = useState([])
    function switchValues(primary: string, second: string){
        setPrimaryValue(second)
    }
    
    useEffect(() => {
        if(error){
            toast.error(error.message)
            return
        }
        if(data){
            const firstElements = data.getUserLast15DaysFromInterests.slice(0,5)
            setInterests(firstElements)
        }
      }, [data, error]);
      

    return (
        <chakra.section maxW="100vw" w="100%"  display={"flex"}  minH="100vh" h="100%" className="main"   justifyContent={"center"} alignItems={"center"} py="150px" >
            <Flex  w="80%" minH="60%"  justifyContent={"end"}  h={"60vh"} >
                <Flex w="80%"  textColor={"white"} flexDir={"row"} justifyContent={"space-between"}  > 
                   <SearchCurrency logged w="50%"  name="Consultar conversao" resultH="30%"/>
                   <Flex justifyContent={"start"} gap="80px" flexDir={"column"} h="80%" w="70%"  py='10px' alignItems={"center" }  >
                   <Flex flexDir={"column"} minW="650px"  justifyContent={"start"} alignItems={"center" } border="1px solid white" rounded='lg'  py='10px' gap="10px" bgColor={"rgba(50,50,50,0.8)"} backdropFilter='auto' backdropBlur='8px'>
                    <Heading fontSize={"29.12px"}>Sorte do dia</Heading>
                    <Text w="70%" textAlign={"center"} fontSize={"18px"}>{luckyOfDay[Math.floor(Math.random() * luckyOfDay.length)]}</Text>
                   </Flex>
                   
                   <Flex flexDir={"column"} w="100%" gap="15px" bgColor={"rgba(50,50,50,0.6)"} backdropFilter='auto' backdropBlur='8px' >
                        <Heading w="100%" textAlign={"center"}>Interesses favoritados</Heading>
                   <Flex border="1px solid white" rounded="lg" w="100%" flexDir={"column"} justifyContent={"start"} alignItems={"center" }  gap="20px">
                        <chakra.ul w="100%" listStyleType={"none"} pb="10px" display={"flex"} flexDir={"column"} >
                            <chakra.ul bg={theme.colors.brand.primary} rounded="6px 6px 0 0"  fontWeight={"bold"} listStyleType={"none"} display={"flex"} justifyContent={"space-evenly"} textColor={"gray.800"} alignItems="center"borderBottom={"1px solid white"} h="2em"> 
                                <chakra.li minW="16.66%" textAlign={"center"} >
                                    Sigla
                                </chakra.li>
                                <chakra.li minW="16.66%" textAlign={"center"} >
                                    Alta
                                </chakra.li>
                                <chakra.li minW="16.66%" textAlign={"center"} >
                                    Baixa
                                </chakra.li>
                                <chakra.li minW="16.66%" textAlign={"center"} >
                                    Target
                                </chakra.li>
                                <chakra.li minW="16.66%" textAlign={"center"} >
                                    Diária
                                </chakra.li>
                                <chakra.li minW="16.66%" textAlign={"center"} >
                                    Quinzenal
                                </chakra.li>
                            </chakra.ul>
                                {loading ? (
                                    <Flex w="100%" h="100%" alignItems={"center"} justifyContent={"center"}>
                                        <Spinner />
                                    </Flex>
                                ) : interests ? (interests.map((interest: any, index) => <InterestTracking w="100%" h="100%" key={`track${index}`} code={interest.code} codein={interest.codein} high={interest.high} lastDays={interest.lastDays} low={interest.low}  name={interest.name} targetValue={interest.targetValue} varBid={interest.varBid}/>)) : null}
                            </chakra.ul>
                   </Flex>
                   </Flex>
                   </Flex>

                </Flex>
            </Flex>
        </chakra.section>
    )
}