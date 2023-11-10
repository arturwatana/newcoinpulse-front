import { useModalContext } from "@/app/providers/ModalProvider";
import { theme } from "@/app/providers/Providers";
import { GET_USERLAST15DAYSINTERESTS } from "@/graphql/query/getUserLast15DaysFromInterests";
import { useQuery } from "@apollo/client";
import { Flex, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InterestTracking from "../InterestTracking";
import { IInterest } from "@/app/modules/Interest/model/IInterest.interface";


export default function TableInterests(){
  const {data, loading, error, refetch } = useQuery(GET_USERLAST15DAYSINTERESTS)
  const [interests, setInterests] = useState<IInterest[]>([])
  const { onOpen, setTypeModal, updateScreen } = useModalContext()
  const [interestIn, setInterestIn] = useState<string>("Compra")
  
  useEffect(() => {
      if(error){
          toast.error(error.message)
          return
      }
      if(data){
          const firstElements = data.getUserLast15DaysFromInterests.filter((int: any) => {
              if(int.favorite === true){
                  return int
              }
              return 
          }).sort((prev: any, next: any) => {
            if (prev.code < next.code) {
              return -1;
            }
            if (prev.code > next.code) {
              return 1;
            }
            return 0;
          }).slice(0,5)
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
        <>
          {loading ? (
            <Flex w="100%" h="100%" display={"flex"} alignItems={"center"} justifyContent={"center"}> 
                        <Spinner />
            </Flex>
          ) : 
          <TableContainer  rounded={{base:"15px 0 0 0", md: "15px" }}overflowX={"auto"} w={{base:"95%", "2xl": "100%"}} >
          <Table  textColor={"white"}  backdropFilter='auto' backdropBlur='8px' >
            <TableCaption textColor="gray.200">Seus interesses são atualizados a cada 30 min</TableCaption>
            <Thead bg={"#F2A900"} >
              <Tr textColor={"white"} >
                <Th position={"sticky"} bg={"#F2A900"}  left="0">Sigla</Th>
                <Th>Compra</Th>
                <Th>Venda</Th>
                <Th>T-Compra</Th>
                <Th>T-Venda</Th>
              </Tr>
            </Thead>
            <Tbody>
                  { interests && interests.length > 0 ? (interests.map((interest: any, index) => <InterestTracking  favorite={interest.favorite} index={index} ask={interest.ask} bid={interest.bid}  w="100%" h="100%" key={`track${index}`} code={interest.code} codein={interest.codein} high={interest.high} lastDays={interest.lastDays} low={interest.low}  name={interest.name} targetValue={interest.targetValue} varBid={interest.varBid}/>))
                   : 
                   <Tr>
                     <Td textAlign={"center"} p="20px">Ainda nao estamos trackeando nada, <chakra.a cursor={"pointer"} textDecor={"Highlight"} onClick={() => {setTypeModal("add"); onOpen() }}>clique aqui para rastrear um interesse!</chakra.a></Td>
                   </Tr>}
            </Tbody>
          </Table>
        </TableContainer>}
        
        </>
       
    )
}