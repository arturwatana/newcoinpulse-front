"use client"
import { IUserData } from "@/app/panel/layout"
import { theme } from "@/app/providers/Providers"
import {Flex, Button, Heading, Text, Menu, MenuButton, MenuList, MenuItem, Icon, chakra, MenuGroup, MenuDivider} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import {BiDownArrowAlt} from "react-icons/bi"
import {RxHamburgerMenu} from "react-icons/rx"
import { useModalContext } from "@/app/providers/ModalProvider"
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { IoMdNotifications } from "react-icons/io";
import { GET_USER } from '@/graphql/query/getUser.query';
import { useQuery } from '@apollo/client';
import {IoIosNotifications} from "react-icons/io"
import Pusher from "pusher-js";
import { NotificationProps } from "../Notification"

interface NavBarProps{
    logged?: boolean
    userProps?: {
        fullName: string
        email: string
    }
    setUserProps?: React.Dispatch<React.SetStateAction<IUserData>>
}



export default function NavBar({logged, userProps}: NavBarProps){
    const { onOpen, setTypeModal } = useModalContext()
    // const {data, loading, error } = useQuery(GET_USER)
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const [prevNotifications, setPrevNotifications] = useState<NotificationProps[]>([]);
    const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false);
    

    // async function pusher() {
    //   const pusher = new Pusher("7f0e3a323f03b1a35797", { cluster: 'us2' });
    //   pusher.connection.bind("connected", () => {
    //     const channel = pusher.subscribe("notifications");
    //     channel.bind("new_notifications", async (notifications: NotificationProps[]) => {
    //       const userNotifications: NotificationProps[] = [];
    //       if(error){
    //           console.log(error)
    //           return
    //       }
    //       if(data && !loading){
    //           console.log(notifications)
    //       }
    //       notifications.forEach(notify => {
    //         if (notify.userId === data.getUserByToken.id) {
    //           const notifyAlreadyInArray = userNotifications.find(notification => {
    //             return notification.name === notify.name;
    //           });
    //           if (!notifyAlreadyInArray) {
    //             userNotifications.push(notify);
    //           }
    //         }
    //       });
    //       if(userNotifications.length != notifications.length){
    //           setNotifications(userNotifications);
    //       }
    //     });
    //   });
    // }
  
    // useEffect(() => {
    //   pusher();
    // }, []);
    // useEffect(() => {
    //     if(error){
    //         toast.error(error.message)
    //         return
    //     }
    // }, [error]);

    // useEffect(()=> {
    //     if(prevNotifications.length != notifications.length){
    //         toast("Oba, voce tem uma nova notificacao!")
    //     }
    // }, [notifications]) 



    const router = useRouter()
    function logoutUser(){
        localStorage.removeItem("coinpulse_user_token")
        router.push('/')
    }

    return (
        <Flex w={{base:"100%", "2xl":"100%"}} h="10%" position={"fixed"} alignItems={"center"} justifyContent={"center"} bgColor={"rgba(48,48,48,0.8)"} backdropFilter='auto' backdropBlur='8px' zIndex={"20"}>
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
                            <MenuItem as="a" href={"/account/register"} bg={"#303030"} _hover={{backgroundColor: "#646464"}}>Registrar</MenuItem>
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
                        {/* <Menu>
                        <MenuButton   mr="4em" >
                            <Icon as={IoIosNotifications} h="100%" w={{base: "0", md:"200%"}}  textColor={notificationIsOpen ? "orange.500" : "white"} onClick={() => setNotificationIsOpen((prev) => !prev)}/>
                        </MenuButton>
                        <MenuList left="55%"  textColor={"black"} >
                        {notifications && notifications.length > 0 ? (
                            notifications.map(notify => <MenuItem  _hover={{backgroundColor: "#646464"}} >{notify.description}</MenuItem>)
                        ): <MenuItem  _hover={{backgroundColor: "#646464"}} >Sem notificacoes para hoje</MenuItem>}
                        
                </MenuList>
                        </Menu> */}
                    <Menu >
                        <MenuButton display={"flex"} p={{base:"15px 22px 15px 22px",md:'15px'}}  minW={{base: "0",md:"15em"}}  border="1px solid white"   rounded={{base:"full",md:"1.0em"}} textColor={"white"} _hover={{backgroundColor: "#646464"}}>
                            <Flex alignItems={"center"} justifyContent={"space-between"} gap="10px">
                                <Flex flexDir="column" gap="5px" textAlign={"start"}>
                                <Text display={{base:"none", md:"flex"}}>Olá, {userProps?.fullName.split(" ")[0]}</Text>
                                <Text display={{base:"flex", md:"none"}}>{userProps?.fullName.split(" ")[0].split("")[0]}</Text>
                                <Text fontSize={"13px"} display={{base:"none", md:"flex"}}>{userProps?.email}</Text>
                                </Flex>
                            <Icon display={{base:"none", md:"flex"}} as={BiDownArrowAlt} fontSize={"32px"} />
                            </Flex>
                        </MenuButton>
                        <MenuList ml="10px"  textColor={"black"} >
                        <MenuGroup title='Acesso rapido'>
                            <MenuItem  onClick={() => {setTypeModal("add"); onOpen() }} bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}}>+ Adicionar interesse</MenuItem>
                            <MenuItem as="a" href={"/panel/interests"} >Acompanhar interesses</MenuItem>
                              </MenuGroup>
                              <MenuDivider />
                              <MenuGroup title='Minha conta'>
                            <MenuItem as="a" href={"/panel"} >Painel</MenuItem>
                            <MenuItem as="a" href={"/panel/searches"} >Minhas pesquisas</MenuItem>
                            <MenuItem as="p" onClick={logoutUser} >Logout</MenuItem>
                              </MenuGroup>
                        </MenuList>
                    </Menu>
                        </Flex>
                )}
            </Flex>
      </Flex>
    )
}