"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image } from "@chakra-ui/react"
import {theme} from "../../providers/Providers"
import BackPageBtn from "../../components/BackPageBtn"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "@/graphql/mutations/createUser.mutation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function Register({props}: any){ 

    const [addUser, {data, loading, error }] = useMutation(CREATE_USER)
    const router = useRouter()
  const [userEmail, setUserEmail] = useState<string>("")
    
    const handleSubmit = (e:any) => {
        e.preventDefault()
        addUser({
            variables: {
                data: {
                    fullName: e.target.name.value,
                    email: e.target.email.value,    
                    password: e.target.password.value
                }
            
        }})
    }


    useEffect(() => {
        if(error){
            toast(error.message)
            return
        }
        if(data){
            toast.success("Usuario cadastrado com sucesso")
            router.push("/account/login")
        }
    }, [data, error])

    useEffect(() => {
        const email = localStorage.getItem("coinpulse_entry_user_email")
        if(email){
            setUserEmail(email)
        }
    }, [])

    return (

            <FormControl  border="2px solid white"   position={"absolute"} textColor={"white"} h="65%"  justifyContent={"center"} bgColor={"rgba(50,50,50,0.95)"} backdropFilter='auto' backdropBlur='8px' flexDir={"column"} rounded={"10px"} display={"flex"} alignItems={"center"} gap="60px" top="15%" left="40%" w="20%" py="10px" px="20px">
            <chakra.form onSubmit={handleSubmit} display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} h="65%" w="80%" border="black" gap="15px" >
                <Heading fontSize={"29.12px"}>Registre-se</Heading>
                <Flex flexDir={"column"} w="100%" textAlign={"center"} gap="5px">
                   <FormLabel w="100%" textAlign={"center"} >Nome:</FormLabel>
                  <Input name="name"  id="name" type='text' placeholder="Your cool name" />
                   <FormLabel  w="100%" textAlign={"center"} >Email:</FormLabel>
                  <Input name="email" id="email" value={userEmail.length > 0 ? userEmail : ""} type='email' placeholder="coinpulse@joinus.com" />
                   <FormLabel  w="100%" textAlign={"center"} >Senha:</FormLabel>
                  <Input  name="password" id="password" type='password' placeholder="*********" />
                </Flex>
                <FormHelperText textColor={"white"} fontSize={"18px"}  textAlign={"center"}>Nunca compartilharemos seus dados.</FormHelperText>
                <Button isLoading={loading ? true : false} type="submit" w="55%" minH="2.5em" bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}}>{loading ? "loading" : "Registrar"}</Button>
            <FormHelperText fontSize={"18px"} textColor={"white"}>Já tem uma conta? <chakra.a fontStyle={"bold"}  href="/account/login" _hover={{borderBottom: "1px solid white"}} >Faca o login</chakra.a></FormHelperText>
            </chakra.form>
          </FormControl>

    )
}