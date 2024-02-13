"use client"
import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useQuery } from '@apollo/client';
import {IoIosNotifications} from "react-icons/io"
import Pusher from "pusher-js";
import { theme } from "@/app/providers/Providers"
import { GET_USER_NOTIFICATIONS } from '@/graphql/query/getUserNotifications.query';
import { toast } from 'react-toastify';
import { MdNotificationsActive } from "react-icons/md";

export interface NotificationProps {
  name: string
  read: boolean
  description: string
  userId: string
  createAt: Date
  type: "buy" | "sell"
  new?: boolean
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false);
  const [newNotification, setNewNotification] = useState<boolean>(false);
  const [pusherOn, setPusherOn] = useState<boolean>(false)
  const {data, loading, error } = useQuery(GET_USER_NOTIFICATIONS, {
    onCompleted: (newData) => {
        const notificationsArray: NotificationProps[] = Object.values(newData.getUserNotifications.notifications);
          setNotifications(prevNotifications => [
        ...notificationsArray.reverse(),
        ...prevNotifications,
      ]);
      setPusherOn(true)
    }
  })

  async function pusher() {
    const pusher = new Pusher("7f0e3a323f03b1a35797", { cluster: 'us2' });
    pusher.connection.bind("connected", () => {
      const channel = pusher.subscribe("notifications");
      channel.bind("new_notifications", async (notificationsPusher: NotificationProps[]) => {
        console.log(notificationsPusher)
        const userNotifications: NotificationProps[] = [];
        if(notificationsPusher.length === 0){
          return
        }
          for (const notifyPusher of notificationsPusher) {
            const notifyAlreadyExists = notifications.find(notify => notifyPusher.name === notify.name && notifyPusher.type === notify.type)
            if (!notifyAlreadyExists) {
              userNotifications.push({
                ...notifyPusher,
                new: true
              })
            }
          }
          console.log("notificacoes")
          console.log(userNotifications)
          if(userNotifications.length === 0){
            return
          }
          toast(`Você tem ${userNotifications.length} ${userNotifications.length > 1 ?  "notificações" : "notificação"}`)
          setNewNotification(true)
          setNotifications(prevNotifications => [
            ...userNotifications.reverse(),
            ...prevNotifications,
          ]);
      });
    });
  }

  useEffect(() => {
    if(pusherOn){
      pusher();
    }  
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pusherOn]);


  useEffect(() => {
      if(newNotification){
        setNewNotification(false)
      }
  }, [notificationIsOpen])

  return (
    <Flex mr={{base:"1em",lg:"4em"}}  >
      <Menu  >
        <MenuButton _active={{color: "orange.300"}}  color={"white"} onClick={() => setNotificationIsOpen((prev) => !prev)}>
            {
              newNotification ? 
              <Icon as={MdNotificationsActive } transform={"scale(2)"}   /> :
              <Icon as={IoIosNotifications } transform={"scale(2)"}   /> 
            }
        </MenuButton>
        <MenuList mt="10px" left={{ lg:"0%", xl: notifications.length === 0 ? "0%" : "30%"}}  w={{base:"45%", sm: "70%", lg: "70%"}} py="0" rounded="10px" h="100%" maxH="500px" position="relative" className="scrollBar"   overflowY={notifications.length > 3 ? "scroll" : "hidden"}>
          <Heading textAlign={"center"} fontWeight={"semibold"} position={"sticky"} fontSize={22} bg={theme.colors.brand.primary} rounded="8px 0px 0 0" py='5px' border="1px solid black" textColor={"gray.600"}>Notificações</Heading>
          <MenuGroup as="ul" w="100%" display="flex" justifyContent={"center"} alignItems={"center"} >
            {notifications && notifications.length > 0 ? (
              notifications.map((notify, index) => (
                <MenuItem as="li" w="100%" display={'flex'} flexDir={'column'} gap="5px" justifyContent={'center'} bg={"gray.100"} key={`notification${index}`} _hover={{ backgroundColor: "#dadada" }} pb="15px"  rounded={index === notifications.length - 1 ? "0 0 0px 10px" : ""} border="1px solid black">
                  <Flex justifyContent={'start'} w="100%">
                  <Text textAlign={"start"} w="40%">{notify.createAt.toString().split("T")[0].split("-").reverse().join("/")}</Text>
                  <Heading fontSize={18}>{notify.name}</Heading>
                  </Flex>
                  <Flex flexDir={"column"} gap="5px" justifyContent={'center'} alignItems={"center"} w="95%">
                  <Text fontSize={{base: 14, lg: 18}} >{notify.description}</Text>
                  </Flex>
                </MenuItem>
              ))
            ) : <MenuItem _hover={{ backgroundColor: "#646464" }}>Sem notificações para hoje</MenuItem>}
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
