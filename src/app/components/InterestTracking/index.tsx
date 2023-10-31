

import { gql } from "@apollo/client";
import { BsFillTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import { chakra, Text } from "@chakra-ui/react"
import { formatCoin } from "@/utils/formatCoin";
import { useModalContext } from "@/app/providers/ModalProvider";

interface InterestTrackProps {
    code: string
    codein: string
    name: string
    high: string
    low: string
    varBid: string
    targetValue: number
    lastDays: LastDaysQuery[]
    w: string
    h: string
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


export default function InterestTracking({code,high,lastDays,low,name,varBid, codein, targetValue, h,w}: InterestTrackProps){
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
        low,
        codein,
        targetValue
    }
    return (
                            <chakra.li bgColor={"rgba(48,48,48,0.6)"} borderBottom={"1px solid white"}   backdropFilter='auto' backdropBlur='8px' display={"flex"} w={w} py="5px" onClick={() => {setTypeModal("edit"); setModalProps(modalProps); onOpen()}} justifyContent={"space-evenly"} alignItems={"center"}  _hover={{backgroundColor: "#646464"}} cursor={"pointer"} h={h}>
                                <Text minW={{base:"32%", lg:"16.66%"}} maxW={{base:"32%", lg:"16.66%"}} wordBreak={"break-word"}  textAlign={"center"}>{`${code} / ${codein}`}</Text>
                                <Text minW={{base:"32%", lg:"16.66%"}} maxW={{base:"32%", lg:"16.66%"}} wordBreak={"break-word"}  textAlign={"center"}>{formatCoin(+high, code)}</Text>
                                <Text minW={{base:"32%", lg:"16.66%"}} maxW={{base:"32%", lg:"16.66%"}} textAlign={"center"} display={{base: "none","2xl": "block"}}>{formatCoin(+low, code)} </Text>
                                <Text minW={{base:"32%", lg:"16.66%"}} maxW={{base:"32%", lg:"16.66%"}} textAlign={"center"}>{formatCoin(+targetValue, code)}</Text>
                                <Text minW={{base:"32%", lg:"16.66%"}} maxW={{base:"32%", lg:"16.66%"}} display={{base: "none","2xl": "block"}} textAlign={"center"}>{dailyVariation >= 0 ? "+" : ""}{dailyVariation.toFixed(2)}%</Text>
                                <Text minW={{base:"32%", lg:"16.66%"}}maxW={{base:"32%", lg:"16.66%"}} display={{base: "none","2xl": "block"}}  textAlign={"center"}>{averageFornightPctChange >= 0 ? "+" : ""}{averageFornightPctChange.toFixed(2)}%</Text>
                            </chakra.li>
    )
}