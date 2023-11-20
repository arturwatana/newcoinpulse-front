

import {  Td,  Tr } from "@chakra-ui/react"
import { useModalContext } from "@/app/providers/ModalProvider";

interface InterestTrackProps {
    symbol: string
    from: string
    to: string
    highPrice: string
    lastPrice: string
    lowPrice: string
    priceChangePercent: string
    targetValue: {
        buy: number
        sell: number
    }
    bidPrice: string
    askPrice: string
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


export default function InterestTracking({highPrice,index,askPrice, lowPrice,priceChangePercent, from, to, lastPrice, bidPrice,favorite, targetValue, h,w}: InterestTrackProps){
    const { onOpen, setTypeModal, setModalProps } = useModalContext()

    const modalProps = {
        from,
        to,
        highPrice,
        favorite,
        lowPrice,
        targetValue
    }

    function isEven(number: number){
        return number % 2 === 0
    }

    return (
                            <Tr  bg={isEven(index) ? "rgba(48,48,48,1)" : "rgba(34, 33, 33, 1)"}   rounded="0 0 6px 6px"  backdropFilter='auto' backdropBlur='8px'  py="8px" onClick={() => {setTypeModal("edit"); setModalProps(modalProps); onOpen()}}   _hover={{backgroundColor: "#646464"}} cursor={"pointer"} h={h}>
                                <Td  position={{base:"sticky", lg: "static"}} left="0" bg={{base: isEven(index) ? "rgba(48,48,48,1)" : "rgba(34, 33, 33, 1)", lg: "none"}} >{`${from} / ${to}`} </Td>
                                <Td >{`${+lastPrice >= 1 ? parseFloat(lastPrice).toFixed(2) : lastPrice} ${to}`}</Td>
                                <Td >{`${+bidPrice >= 1 ? parseFloat(bidPrice).toFixed(2) : bidPrice} ${to}`}</Td>
                                <Td>{`${+askPrice >= 1 ? parseFloat(askPrice).toFixed(2) : askPrice} ${to}`}</Td>
                                <Td >{`${+targetValue.buy >= 1 ? targetValue.buy.toFixed(2) : targetValue.buy} ${to}`}</Td>
                                <Td >{`${+targetValue.sell >= 1 ? targetValue.sell.toFixed(2) : targetValue.sell} ${to}`}</Td>
                                <Td textColor={+priceChangePercent * 100 / 100 > 0 ? "green.300" : "red.300"}>{`${+priceChangePercent * 100 / 100 > 0 ? "+" : ""}${((+priceChangePercent * 100) / 100).toFixed(2)}%`}</Td>
                            </Tr>
    )
}