"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image, Select, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Paginate from "@/app/components/Paginate"
import { useQuery } from "@apollo/client"
import { GET_USERLAST15DAYSINTERESTS } from "@/graphql/query/getUserLast15DaysFromInterests"
import { toast } from "react-toastify"

export default function Tracking(){
    const [qtdPerPage, setQtdPerPage] = useState<number>(12)
    const [filter, setFilter] = useState<string>("Todas")
    const {data, loading, error } = useQuery(GET_USERLAST15DAYSINTERESTS)
    const [interests, setInterests] = useState([])

    function renderCategories(){
        return interests.map((int:any, index)=> {
            return <chakra.option key={`option${index}`} value={`${int.code}/${int.codein}`} textColor="black" >{`${int.code}/${int.codein}`}</chakra.option>
        })
    }
   
    
    useEffect(() => {
        if(error){
            toast.error(error.message)
            return
        }
        if(data){
            setInterests(data.getUserLast15DaysFromInterests)
        }
      }, [data, error]);

      useEffect(() => {
      }, [filter])


    return (
        <chakra.section overflowX={"auto"} w="100vw" h="100%" minH="100vh" py="150px" display={"flex"} flexDir={"column"} justifyContent={"start"} alignItems={"center"} textColor={"white"}>
                <Flex  w="80%" minH="60%"  justifyContent={"end"} mr="2em" alignItems={"center"} >
                <Flex w="80%"  textColor={"white"} flexDir={"column"} justifyContent={"start"} alignItems={"center"} py="20px" gap="20px"> 
                    <Heading w='full' textAlign={"center"}>Interesses trackeados</Heading>
                <Flex  flexDir={"column"} alignItems={"end"} gap="15px" minW="100%">
                    <Flex w="54%" justifyContent={"space-between"}  alignItems={"center"} >
                    <Flex h="100%" flexDir={"column"} gap="5px">
                        <Text>Filtrar por conversao</Text>
                        <Select textAlign={"center"} onChange={(e) => setFilter(e.target.value)}>
                        <chakra.option value="Todas" textColor="black" >Todas</chakra.option>
                        {renderCategories()}
                        </Select>
                    </Flex>
                    <Flex  h="100%" flexDir={"column"} alignItems={"end"} gap="5px">
                    <Text>Quantidade por pagina</Text>
                    <Select  minH="100%"defaultValue={12} w="50%" onChange={(e) => setQtdPerPage(+e.target.value)}>
                        <chakra.option key="option1"  textColor={"black"}>12</chakra.option>
                        <chakra.option key="option2" textColor={"black"}>24</chakra.option>
                        <chakra.option key="option3" textColor={"black"}>48</chakra.option>
                        <chakra.option key="option4" textColor={"black"}>96</chakra.option>
                    </Select>
                    </Flex>
                    </Flex>
                    <Flex border="1px solid white"  h="100%" minW="100%" bgColor={"rgba(48,48,48,0.6)"}  backdropFilter='auto' backdropBlur='8px' rounded="lg"   wrap={"wrap"}>
                   {loading ? (
                    <Flex w="100%" h="100%" alignItems={"center"} justifyContent={"center"} pt="3em">
                        <Spinner/>
                        </Flex>
                   ) : (
                   <Paginate typePaginate="interest" elements={interests} filterByName={filter} qtdPerPage={qtdPerPage}/>
                   )}
                   </Flex>
                </Flex>
                </Flex>
            </Flex>
        </chakra.section>
    )
}