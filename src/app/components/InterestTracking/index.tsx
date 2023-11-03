

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


export default function InterestTracking({code,high,lastDays,low,name,varBid,bid,favorite , paginate,  ask, codein, targetValue, h,w}: InterestTrackProps){
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

    return (
                            <chakra.li bgColor={"rgba(48,48,48,0.6)"} borderBottom={"1px solid white"}  rounded="0 0 6px 6px"   backdropFilter='auto' backdropBlur='8px' display={"flex"} w={w} py="8px" onClick={() => {setTypeModal("edit"); setModalProps(modalProps); onOpen()}} justifyContent={"space-evenly"} alignItems={"center"}  _hover={{backgroundColor: "#646464"}} cursor={"pointer"} h={h}>
                                <Text minW={{base:"15%", lg:"10%"}} maxW={{base:"15%", lg:"10%"}} wordBreak={"break-word"}  textAlign={"center"}>{`${code} / ${codein}`}</Text>
                                <Text minW={{base:"15%", lg:"10%"}} maxW={{base:"15%", lg:"10%"}} wordBreak={"break-word"}  textAlign={"center"}>{formatCoin(+bid, code)}</Text>
                                <Text minW={{base:"15%", lg:"10%"}} maxW={{base:"15%", lg:"10%"}} textAlign={"center"}>{formatCoin(+ask, code)}</Text>
                                <Text minW={{base:"15%", lg:"10%"}} maxW={{base:"15%", lg:"10%"}} textAlign={"center"}>{formatCoin(+targetValue.buy, code)}</Text>
                                <Text minW={{base:"15%", lg:"10%"}} maxW={{base:"15%", lg:"10%"}} textAlign={"center"}>{formatCoin(+targetValue.sell, code)}</Text>
                                {paginate ? (
                                    <>
                                     <Text minW={{base:"32%", lg:"10%"}} maxW={{base:"32%", lg:"10%"}} display={{base: "none","2xl": "block"}} textAlign={"center"}>{dailyVariation >= 0 ? "+" : ""}{dailyVariation.toFixed(2)}%</Text>
                                <Text minW={{base:"32%", lg:"10%"}}maxW={{base:"32%", lg:"10%"}} display={{base: "none","2xl": "block"}}  textAlign={"center"}>{averageFornightPctChange >= 0 ? "+" : ""}{averageFornightPctChange.toFixed(2)}%</Text>
                                    </>
                                ): null}
                               
                            </chakra.li>
    )
}