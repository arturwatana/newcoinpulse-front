"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image, Spinner } from "@chakra-ui/react"
import BackPageBtn from '../components/BackPageBtn'
import NavBar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_USER } from "@/graphql/query/getUser.query"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { AuthProvider } from "../providers/AuthContext"
import { ModalProvider, useModalContext } from "../providers/ModalProvider"
import SideMenu from "../components/SideMenu"

export interface IUserData {
  email: string
  fullName: string
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [logged, setIsLogged] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    fullName: "",
    email: ""
  })
  const {data, loading, error } = useQuery(GET_USER)
  const router = useRouter()

  
  useEffect(() => {
    if(error){
      router.push("/account/login")
      toast.error("Ops, voce precisa fazer o login novamente!")
        return
    }
}, [data, error])

  useEffect(() => {
    if(data){
      setIsLogged(true)
      setUserData({
        email: data.getUserByToken.email,
        fullName: data.getUserByToken.fullName
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
            <AuthProvider >
              <ModalProvider>
                <NavBar logged={logged} userProps={userData} setUserProps={setUserData}/>
                <SideMenu/>
              {children}
              </ModalProvider>
            </AuthProvider>
        </>
          )  }
    </>

  )
}
