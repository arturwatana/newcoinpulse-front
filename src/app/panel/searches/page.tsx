 "use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image, Select, Spinner } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import Paginate from "@/app/components/Paginate"
import { GET_USERSEARCHES } from "@/graphql/query/getUserSearches.query"
import { toast } from "react-toastify"
import { useQuery } from "@apollo/client"
import { useModalContext } from "@/app/providers/ModalProvider"
import SearchCurrency from "@/app/components/SearchCurrency"

export default function Searches(){
    const [qtdPerPage, setQtdPerPage] = useState<number>(12)
    const {data, loading, error, refetch } = useQuery(GET_USERSEARCHES)
    const [searches, setSearches] = useState([])
    const [filter, setFilter] = useState<string>("Todas")
    const { updateScreen } = useModalContext()

    function renderCategories(){
        const uniqueOptions: string[] = []
         searches.map((int:any)=> {
            const alreadyInArray = uniqueOptions.find(option => option === `${int.from}/${int.to}`)
            if(alreadyInArray){
                return
            }
            uniqueOptions.push(`${int.from}/${int.to}`)
        })
      return  uniqueOptions.map((option, index )=> <chakra.option value={option} key={`keyoption${index}`} textColor="black" textAlign={"center"}>{option}</chakra.option>)
        
    }
   


    useEffect(() => {
        if(error){
            toast.error(error.message)
            return
        }
        if(data){
                setSearches(data.searches)
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data, error]);



      useEffect(() => {
        if(updateScreen.searches){
            refetch()
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
      },[updateScreen])

    return (
        <chakra.section overflowX={"auto"} w="100vw" h="100%" minH="100vh" py="150px" display={"flex"} flexDir={"column"} justifyContent={"start"} alignItems={"center"} textColor={"white"}>
                <Flex  w={{base:"90%", "2xl": "90%"}} minH="60%"  flexDir={"column"}  justifyContent={"center"} mr={{base:"0", "2xl":"2em"}} alignItems={"center"} >
                    <Flex justifyContent={"center"}  w={{base:"100%","2xl":"78%"}}>
                <SearchCurrency logged name="Consultar conversao" searchW={{base:"100%", md:"80%", lg:"50%", "2xl":"30%"}} w={"100%"} resultH="100%"/>
                    </Flex>
                <Flex w={{base:"100%", "2xl": "80%"}}  textColor={"white"} flexDir={"column"} justifyContent={{base:"center","2xl":"start"}} alignItems={"center"} py="20px" gap="20px"> 
                    <Heading w='full' textAlign={"center"}>Ultimas pesquisas</Heading>
                <Flex  flexDir={"column"} alignItems={"end"} gap="15px" minW="100%">
                <Flex w={{base:"100%", "2xl":"54%"}} justifyContent={"space-between"}  alignItems={"center"} >
                    <Flex h="100%" flexDir={"column"} gap="5px">
                        <Text w={{base:"55%", "2xl": "100%"}}>Filtrar por conversao</Text>
                        <Select textAlign={"center"} w={{base:"70%","2xl":"100%"}} onChange={(e) => setFilter(e.target.value)}>
                        <chakra.option value="Todas" textColor="black" >Todas</chakra.option>
                        {renderCategories()}
                        </Select>
                    </Flex>
                    <Flex  h="100%"  flexDir={"column"} justifyContent={"center"} alignItems={"end"} gap="5px">
                    <Text textAlign={"end"} w={{base:"70%", "2xl": "100%"}}>Qtd por pagina</Text>
                    <Select  minH="100%"defaultValue={12} w={{base: "65%","2xl":"70%"}} onChange={(e) => setQtdPerPage(+e.target.value)}>
                        <chakra.option key="option1"  textColor={"black"}>12</chakra.option>
                        <chakra.option key="option2" textColor={"black"}>24</chakra.option>
                        <chakra.option key="option3" textColor={"black"}>48</chakra.option>
                        <chakra.option key="option4" textColor={"black"}>96</chakra.option>
                    </Select>
                    </Flex>
                    </Flex>
                   <Flex border="1px solid white"  minH="25em" h="100%" minW="100%"  bgColor={"rgba(48,48,48,0.6)"}  backdropFilter='auto' backdropBlur='8px' rounded="lg"  py='10px'  wrap={"wrap"}>
                   {loading ? (
                    <Flex w="100%" h="100%" alignItems={"center"}  justifyContent={"center"} pt="3em">
                        <Spinner/>
                        </Flex>
                   ) : (
                   <Paginate typePaginate="search" elements={searches} filterByName={filter} qtdPerPage={qtdPerPage}/>
                   )}</Flex>
                </Flex>
                </Flex>
            </Flex>
        </chakra.section>
    )
}