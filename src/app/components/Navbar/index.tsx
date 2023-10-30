"use client"
import { IUserData } from "@/app/panel/layout"
import { theme } from "@/app/providers/Providers"
import {Flex, Button, Heading, Text, Menu, MenuButton, MenuList, MenuItem, Icon, chakra} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import {BiDownArrowAlt} from "react-icons/bi"
import {RxHamburgerMenu} from "react-icons/rx"
import {IoIosNotifications} from "react-icons/io"
import Link from "next/link"

interface NavBarProps{
    logged?: boolean
    userProps?: {
        fullName: string
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
            <Flex w={{base:"95%", lg:"80%"}} justifyContent={"space-between"} alignItems={"center"}>
                <Heading textColor={"white"} as="a" href={logged ? "/panel" : '/'}>CoinPulse</Heading>
                {!logged ? (
                    <Flex >
                        <Flex display={{base:"flex", lg:"none"}}>
                        <Menu>
                            <MenuButton h="100%" >
                                <Icon textColor={"white"} fontSize={"32px"} as={RxHamburgerMenu}></Icon>
                            </MenuButton>
                        <MenuList   bg={'#303030'} textColor={"white"}  >
                            <MenuItem as="a" href={"/account/login"} bg={"#303030"} _hover={{backgroundColor: "#646464"}} >Login</MenuItem>
                            <MenuItem as="a" href={"/account/register"} bg={"#303030"} _hover={{backgroundColor: "#646464"}}><chakra.a href={"/account/register"}>Registrar</chakra.a></MenuItem>
                        </MenuList>
                        </Menu>
                        </Flex>
                        <Flex display={{base:"none", lg:"flex"}} gap={"20px"}>
                            <Button bg={"gray.300"} _hover={{backgroundColor: "gray.100"}} as={"a"} href="/account/register" >
                                Registrar
                            </Button>
                            <Button bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} as={"a"} href="/account/login">Login</Button>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex alignItems="end" justifyContent={"center"} gap="15px">
                        <Menu>
                            <MenuButton h="100%" w="13em">
                                <Icon textColor={"white"} fontSize={"32px"} as={IoIosNotifications}></Icon>
                            </MenuButton>
                        <MenuList left="55%"  bg={'#303030'} textColor={"white"} >
                            <MenuItem bg={"#303030"} _hover={{backgroundColor: "#646464"}}>New Notification</MenuItem>
                            <MenuItem bg={"#303030"} _hover={{backgroundColor: "#646464"}}>New Notification</MenuItem>
                            <MenuItem bg={"#303030"} _hover={{backgroundColor: "#646464"}} >New Notification</MenuItem>
                        </MenuList>
                        </Menu>
                    <Menu >
                        <MenuButton display={"flex"} p={'15px'} border={"1px solid white"} minW="15em" rounded={"1.0em"} textColor={"white"} _hover={{backgroundColor: "#646464"}}>
                            <Flex alignItems={"center"} justifyContent={"space-between"} gap="10px">
                                <Flex flexDir="column" gap="5px" textAlign={"start"}>
                                <Text>Olá, {userProps?.fullName.split(" ")[0]}</Text>
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
                        </Flex>
                )}
            </Flex>
      </Flex>
    )
}