"use client"
import {Flex, chakra, Heading, FormControl, FormLabel, FormHelperText, Input, Button} from "@chakra-ui/react"
import {theme} from "../../providers/Providers"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { LOGIN_USER } from "@/graphql/mutations/login.mutation"

export default function Login(){
    const [loginUser, { loading }] = useMutation(LOGIN_USER)
    const router = useRouter()

        const handleSubmit = async (e: any) => {
            e.preventDefault()
               await loginUser({
                    variables: {
                        data: {
                            email: e.target.email.value,
                            password: e.target.password.value
                        }
                    
                }}).then((res) => {
                toast.success("Usuario logado com sucesso")
                localStorage.setItem("coinpulse_user_token", res.data.login.token)
                router.push("/panel")
                }).catch(err => {
                    return
                })
        }

    return (
        <Flex h="100vh" w="100vw" position={"absolute"}>
        <FormControl  border="2px solid white" textColor={"white"} h={{base:"40%", xl:"60%"}} top={{base:"20%",lg: "10%",xl:"10%" }}left={{base:"8%",md:"30%",lg: "30%",xl:"35%"}} justifyContent={"center"} bgColor={"rgba(50,50,50,0.95)"} backdropFilter='auto' backdropBlur='8px' flexDir={"column"} rounded={"10px"} display={"flex"} alignItems={"center"} gap="15px"  w={{base:"85%", md:"50%",lg:"40%", xl:"25%"}} py="300px" px={"20px"}>
                <chakra.form onSubmit={handleSubmit} display={"flex"} flexDir={"column"} justifyContent={"space-evenly"} alignItems={"center"} w="80%" border="black" gap="20px" >
                <Heading fontSize={"29.12px"}>Login</Heading>
                <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}  h="50%" w={{base:"100%",lg:"80%"}}  gap="10px" >
                   <FormLabel w="" >Email:</FormLabel>
                  <Input type='email' name="email" id="email" placeholder="coinpulse@joinus.com" />
                   <FormLabel w="" >Senha:</FormLabel>
                  <Input type='password' name="password" id="password" placeholder="*********" />
                  </Flex>
                  <Button isLoading={loading ? true : false} type="submit" w="55%" minH="2.5em" bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}}>{loading ? "loading" : "Login"}</Button>
                <FormHelperText textColor={"white"} textAlign={"center"}>Ainda nao tem conta? <chakra.a fontStyle={"bold"} href="/account/register" _hover={{borderBottom: "1px solid white"}} >Registre-se</chakra.a></FormHelperText>
                </chakra.form>
        </FormControl>
        </Flex>
    )
}