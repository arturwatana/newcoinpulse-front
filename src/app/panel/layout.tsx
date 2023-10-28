"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image } from "@chakra-ui/react"
import BackPageBtn from '../components/BackPageBtn'
import NavBar from "../components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
                   <NavBar logged/>
                   <Flex flexDir={"column"} textColor={"gray.200"}  justifyContent={"start"}  h="60%" fontSize={"18px"} left="10%" top="43%" w="10%" position="fixed"  >
                          <chakra.hr border="2px solid white"  />
                          <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/" cursor={"pointer"}>Adicionar interesse</Text>
                          <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/tracking" cursor={"pointer"}>Acompanhar interesses</Text>
                   </Flex>
                  {children}
    </>

  )
}
