import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { GET_USER } from '@/graphql/query/getUser.query';
import { useQuery } from '@apollo/client';
import {IoIosNotifications} from "react-icons/io"
import Pusher from "pusher-js";
import { theme } from "@/app/providers/Providers"
import { GET_USER_NOTIFICATIONS } from '@/graphql/query/getUserNotifications.query';
import { toast } from 'react-toastify';

export interface NotificationProps {
  name: string
  read: boolean
  description: string
  userId: string
  createAt: Date
  type: "buy" | "sell"
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false);
  const {data, loading, error } = useQuery(GET_USER_NOTIFICATIONS)

  async function pusher() {
    const pusher = new Pusher("7f0e3a323f03b1a35797", { cluster: 'us2' });
    pusher.connection.bind("connected", () => {
      const channel = pusher.subscribe("notifications");
      channel.bind("new_notifications", async (notificationsPusher: NotificationProps[]) => {
        const userNotifications: NotificationProps[] = [];
        if(notificationsPusher.length === 0){
          return
        }

        notificationsPusher.map(notifyPusher => {
          const notifyAlreadyExists = notifications.find(notify => notifyPusher.name === notify.name && notifyPusher.type === notify.type)
          const notifyAlreadyExistsInMemory = userNotifications.find(notify => notifyPusher.name === notify.name && notifyPusher.type === notify.type)
          if(!notifyAlreadyExists && !notifyAlreadyExistsInMemory){
            userNotifications.push(notifyPusher)
          }
        })

        if(userNotifications.length === 0){
          return
        }

        toast(`Voce tem ${userNotifications.length} ${userNotifications.length > 1 ? "novas notificacoes" : "nova notificacao"}`)
        setNotifications(prev => [...userNotifications, ...prev])
      });
    });
  }

  useEffect(() => {
    pusher();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(data){
      setNotifications(data.getUserNotifications.notifications)
    }
  }, [data]);

  

  return (
    <Box mr={{base:"1em",lg:"4em"}}  >
      <Menu  >
        <MenuButton>
          <Icon as={IoIosNotifications} transform={"scale(2)"} textColor={notificationIsOpen ? "orange.500" : "white"} onClick={() => setNotificationIsOpen((prev) => !prev)} />
        </MenuButton>
        <MenuList mt="10px"  w={{base:"50%", sm: "75%", lg: "100%"}} py="0" rounded="10px" h="100%" maxH="500px" position="relative"   overflowY={"scroll"}>
          <Heading textAlign={"center"} fontWeight={"semibold"} position={"sticky"} fontSize={22} bg={theme.colors.brand.primary} rounded="8px 8px 0 0" py='5px' border="1px solid black" textColor={"gray.600"}>Notificações</Heading>
          <MenuGroup as="ul" >
            {notifications && notifications.length > 0 ? (
              notifications.map((notify, index) => (
                <MenuItem as="li" w="100%" display={'flex'} flexDir={'column'} justifyContent={'center'} bg={notify.read ? "#5f5f5f" : "#fff"} key={`notification${index}`} _hover={{ backgroundColor: "#646464" }} py="15px" rounded={index === notifications.length - 1 ? "0 0 10px 10px" : ""} border="1px solid black">
                  <Heading fontSize={18}>{notify.name}</Heading>
                  <Text fontSize={{base: 14, lg: 18}} w="100%">{notify.description}</Text>
                </MenuItem>
              ))
            ) : <MenuItem _hover={{ backgroundColor: "#646464" }}>Sem notificações para hoje</MenuItem>}
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}
