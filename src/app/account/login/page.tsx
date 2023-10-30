"use client"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Image } from "@chakra-ui/react"
import {theme} from "../../providers/Providers"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { LOGIN_USER } from "@/graphql/mutations/login.mutation"

export default function Login(){
    const [addUser, {data, loading, error }] = useMutation(LOGIN_USER)
    const router = useRouter()
    
    const handleSubmit = (e:any) => {
        e.preventDefault()
        addUser({
            variables: {
                data: {
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
            toast.success("Usuario logado com sucesso")
            localStorage.setItem("coinpulse_user_token", data.login.token)
            router.push("/panel")
        }
    }, [data, error])

    return (
        
            <FormControl border="2px solid white"   position={"absolute"} textColor={"white"} h="50%"  justifyContent={"center"} bgColor={"rgba(50,50,50,0.95)"} backdropFilter='auto' backdropBlur='8px' flexDir={"column"} rounded={"10px"} display={"flex"} alignItems={"center"} gap="15px" top="25%" left="40%" w="20%" p="20px">
                <chakra.form onSubmit={handleSubmit} display={"flex"} flexDir={"column"} justifyContent={"space-evenly"} alignItems={"center"} w="80%" border="black" gap="20px" >
                <Heading fontSize={"29.12px"}>Login</Heading>
                <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}  h="50%" w="80%"  gap="10px" >
                   <FormLabel w="" >Email:</FormLabel>
                  <Input type='email' name="email" id="email" placeholder="coinpulse@joinus.com" />
                   <FormLabel w="" >Senha:</FormLabel>
                  <Input type='password' name="password" id="password" placeholder="*********" />
                  </Flex>
                  <Button isLoading={loading ? true : false} type="submit" w="55%" minH="2.5em" bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}}>{loading ? "loading" : "Login"}</Button>
                <FormHelperText textColor={"white"}>Ainda nao tem conta? <chakra.a fontStyle={"bold"} href="/account/register" _hover={{borderBottom: "1px solid white"}} >Registre-se</chakra.a></FormHelperText>
                </chakra.form>
        </FormControl>
    )
}