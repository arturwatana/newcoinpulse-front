"use client"
import { IUserData } from "@/app/panel/layout"
import { theme } from "@/app/providers/Providers"
import {Flex, Button, Heading, Text, Menu, MenuButton, MenuList, MenuItem, Icon, chakra} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import {BiDownArrowAlt} from "react-icons/bi"

interface NavBarProps{
    logged?: boolean
    userProps?: {
        username: string
        email: string
    }
    setUserProps?: React.Dispatch<React.SetStateAction<IUserData>>
}

export default function NavBar({logged, userProps}: NavBarProps){
    const router = useRouter()

    function logoutUser(){
        localStorage.removeItem("coinpulse_user_token")
        router.push('/')
    }

    return (
        <Flex w="100%" h="10%" position={"fixed"} alignItems={"center"} justifyContent={"center"} bgColor={"rgba(48,48,48,0.6)"} backdropFilter='auto' backdropBlur='8px' zIndex={"20"}>
            <Flex w="80%" justifyContent={"space-between"} alignItems={"center"}>
                <Heading textColor={"white"} as="a" href='/'>CoinPulse</Heading>
                {!logged ? (
                <Flex gap={"20px"}>
                    <Button bg={"gray.300"} _hover={{backgroundColor: "gray.100"}} as={"a"} href="/account/register" >
                        Registrar
                    </Button>
                    <Button bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} as={"a"} href="/account/login">Login</Button>
                </Flex>
                ) : (
                    <Menu >
                        <MenuButton display={"flex"} p={'15px'} border={"1px solid white"} rounded={"1.0em"} textColor={"white"} >
                            <Flex alignItems={"center"} justifyContent={"space-between"} gap="10px">
                                <Flex flexDir="column" gap="5px" textAlign={"start"}>
                                <Text>{userProps?.username}</Text>
                                <Text fontSize={"13px"}>{userProps?.email}</Text>
                                </Flex>
                            <Icon as={BiDownArrowAlt} fontSize={"32px"} />
                            </Flex>
                        </MenuButton>
                        <MenuList ml="10px"  bg={'#303030'} textColor={"white"} >
                            <MenuItem bg={"#303030"} _hover={{backgroundColor: "#646464"}}>Home</MenuItem>
                            <MenuItem bg={"#303030"} _hover={{backgroundColor: "#646464"}}>Minhas pesquisas</MenuItem>
                            <MenuItem bg={"#303030"} _hover={{backgroundColor: "#646464"}} onClick={logoutUser}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
      </Flex>
    )
}