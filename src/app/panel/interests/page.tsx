"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image, Select, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Paginate from "@/app/components/Paginate"
import { useQuery } from "@apollo/client"
import { GET_USERLAST15DAYSINTERESTS } from "@/graphql/query/getUserLast15DaysFromInterests"
import { toast } from "react-toastify"
import { useModalContext } from "@/app/providers/ModalProvider"
import { theme } from "@/app/providers/Providers"
import InterestTracking from "@/app/components/InterestTracking"
import {IoIosInformationCircleOutline} from "react-icons/io"
import { IInterest } from "@/app/modules/Interest/model/IInterest.interface"

export default function Tracking(){
    const [qtdPerPage, setQtdPerPage] = useState<number>(12)
    const [filter, setFilter] = useState<string>("Todas")
    const {data, loading, error, refetch } = useQuery(GET_USERLAST15DAYSINTERESTS)
    const [interests, setInterests] = useState<IInterest[]>([])
    const { updateScreen,onOpen,setTypeModal} = useModalContext()

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
            const userInterestsSortedByName: IInterest[] = [...data.getUserLast15DaysFromInterests].sort((prev: any, next: any) => {
                if (prev.code < next.code) {
                  return -1;
                }
                if (prev.code > next.code) {
                  return 1;
                }
                return 0;
              })
            setInterests(userInterestsSortedByName)
        }
      }, [data, error]);

      useEffect(() => {
        if(updateScreen.interests){
            refetch()
        }
      },[updateScreen])

    return (
        <chakra.section overflowX={"auto"} w="100vw" h="100%" minH="100vh" py="150px" display={"flex"} flexDir={"column"} justifyContent={"start"} alignItems={"center"} textColor={"white"}>
                <Flex  w={{base:"100%", "2xl": "80%"}} minH="60%"  justifyContent={"center"} flexDir={{base:"column", "2xl":"row"}} mr={{base:"0", "2xl":"2em"}} alignItems={"center"} >
                <Flex w={{base:"100%", "2xl": "80%"}}   textColor={"white"} flexDir={"column"} justifyContent={{base:"center","2xl":"start"}} alignItems={"center"} py="20px" gap="20px"> 
                    <Heading w='full' textAlign={"center"}>Interesses trackeados</Heading>
                <Button    bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} onClick={() => {setTypeModal("add"); onOpen() }}>Adicionar interesse</Button>
                <Flex  flexDir={"column"} w="100%" alignItems={{base:"end",md:"center"}} gap="15px" minW="100%">
                <Flex w="95%" justifyContent={"end"} mb="10px" textColor={"white"} alignItems={"center"} gap="10px">
                                    <Icon fontSize={28} onClick={() => {setTypeModal("subtitles"); onOpen()}} as={IoIosInformationCircleOutline} />
                    </Flex>
                    <Flex border="1px solid white"  h="100%" w="95%"  bgColor={"rgba(48,48,48,0.6)"}  backdropFilter='auto' backdropBlur='8px' rounded="lg"   wrap={"wrap"}>
                   {loading ? (
                    <Flex w="100%" h="100%" minH="300px" alignItems={"center"} justifyContent={"center"} pt="3em">
                        <Spinner/>
                    </Flex>
                   ) : (
                    <>
            
                    <TableContainer w={{base:"100%", md:"100%"}} overflowX={"auto"} rounded="10px 10px 0 0">
                        <Table>
                            <Thead bg={"#F2A900"} >
                            <Tr textColor={"white"} >
                                <Th position={"sticky"} bg={"#F2A900"}  left="0">Sigla</Th>
                                <Th>Atual</Th>
                                <Th>Compra</Th>
                                <Th>Venda</Th>
                                <Th>T-Compra</Th>
                                <Th>T-Venda</Th>
                                <Th>% Diária</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {interests.length > 0 ? interests.map((interest: any, index) => <InterestTracking  bidPrice={interest.bidPrice} from={interest.from} to={interest.to} lastPrice={interest.lastPrice} symbol={interest.symbol} favorite={interest.favorite} index={index} askPrice={interest.askPrice}  w="100%" h="100%" key={`track${index}`}  highPrice={interest.highPrice}  lowPrice={interest.lowPrice}  targetValue={interest.targetValue} priceChangePercent={interest.priceChangePercent}/>)
                                  :           
                                <Tr>
                                    <Td colSpan={7} textAlign={"center"}  p="20px">Você ainda nao tem nenhum interesse, adicione um interesse para comecar!</Td>
                                </Tr>}
                            </Tbody> 
                        </Table>
                    </TableContainer>       
                    </>
                   )}
                   </Flex>
                </Flex>
                </Flex>
            </Flex>
        </chakra.section>
    )
}