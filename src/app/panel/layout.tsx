"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image, Spinner } from "@chakra-ui/react"
import BackPageBtn from '../components/BackPageBtn'
import NavBar from "../components/Navbar"
import { AuthProvider, useAuthContext } from "../providers/Context"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_USER } from "@/graphql/query/getUser.query"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export interface IUserData {
  email: string
  username: string
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [logged, setIsLogged] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    email: ""
  })
  const {data, loading, error } = useQuery(GET_USER)
  const router = useRouter()
  
  useEffect(() => {
    if(error){
      router.push("/account/login")
        return
    }
}, [data, error])

  useEffect(() => {
    if(data){
      setIsLogged(true)
      setUserData({
        email: data.getUserIdByToken.email,
        username: data.getUserIdByToken.username
      })
    }
  }, [data]);
  
  return (
    <>  
        {loading ? (
            <Flex className="main" w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"} textColor={"white"} >
              <Spinner/>
            </Flex>
) : (
          <>
            <AuthProvider>
            <NavBar logged={logged} userProps={userData} setUserProps={setUserData}/>
                <Flex flexDir={"column"} textColor={"gray.200"}  justifyContent={"start"}  h="60%" fontSize={"18px"} left="10%" top="43%" w="10%" position="fixed"  >
                <chakra.hr border="2px solid white"  />
                <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/" cursor={"pointer"}>Adicionar interesse</Text>
                <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/tracking" cursor={"pointer"}>Acompanhar interesses</Text>
            </Flex>
              {children}
            </AuthProvider>
        </>
          )  }
    </>

  )
}
