

import { chakra, Td, Text, Th, Tr } from "@chakra-ui/react"
import { formatCoin } from "@/utils/formatCoin";
import { useModalContext } from "@/app/providers/ModalProvider";
interface InterestTrackProps {
    code: string
    codein: string
    name: string
    high: string
    low: string
    varBid: string
    targetValue: {
        buy: number
        sell: number
    }
    bid: string
    ask: string
    lastDays: LastDaysQuery[]
    w: string
    favorite: boolean
    h: string
    paginate?: boolean
    index: number
}



export interface LastDaysQuery{
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
    
  }


export default function InterestTracking({code,high,index,lastDays,low,name,varBid,bid,favorite , paginate,  ask, codein, targetValue, h,w}: InterestTrackProps){
    const { onOpen, setTypeModal, setModalProps } = useModalContext()
    const fortnightVariation = lastDays.reduce((acc, next) => {
       return  acc + parseFloat(next.pctChange)
    }, 0)
    const averageFornightPctChange = fortnightVariation / lastDays.length;
    const dailyVariation = ((+high - +low) / +low) * 100
    const modalProps = {
        code,
        high,
        averageFornightPctChange,
        fortnightVariation,
        favorite,
        low,
        codein,
        targetValue
    }
    function isEven(number: number){
        return number % 2 === 0
    }

    function hover(){

    }

    return (
                            <Tr  bg={isEven(index) ? "rgba(48,48,48,1)" : "rgba(34, 33, 33, 1)"}   rounded="0 0 6px 6px"  backdropFilter='auto' backdropBlur='8px'  py="8px" onClick={() => {setTypeModal("edit"); setModalProps(modalProps); onOpen()}}   _hover={{backgroundColor: "#646464"}} cursor={"pointer"} h={h}>
                                <Td  position={"sticky"} left="0" bg={isEven(index) ? "rgba(48,48,48,1)" : "rgba(34, 33, 33, 1)"} >{`${code} / ${codein}`} </Td>
                                <Td >{formatCoin(+bid, code)}</Td>
                                <Td>{formatCoin(+ask, code)}</Td>
                                <Td >{formatCoin(+targetValue.buy, code)}</Td>
                                <Td>{formatCoin(+targetValue.sell, code)}</Td>
                               
                            </Tr>
    )
}