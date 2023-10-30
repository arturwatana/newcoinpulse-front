"use client"
import {AiOutlineGithub} from "react-icons/ai"
import {chakra} from "@chakra-ui/react"


export default function Footer(){
    return (
        <chakra.footer position={"absolute"} overflowX={"hidden"} bottom={"0"} minH="2.5em" textColor={"white"} w="100%" display={"flex"} alignItems={"center"}  justifyContent={"center"} gap={"10px"} bgColor={"#222"} zIndex={"50"}>
            <p>Coinpulse</p>
            <a href="https://github.com/arturwatana" target="_blank">
            <AiOutlineGithub className="text-[22px]"/>
            </a>
        </chakra.footer>
        )
}