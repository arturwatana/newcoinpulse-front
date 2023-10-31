import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { IoMdNotifications } from "react-icons/io";
import { Box, Flex, Icon, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { GET_USER } from '@/graphql/query/getUser.query';
import { useQuery } from '@apollo/client';
import {IoIosNotifications} from "react-icons/io"
import Pusher from "pusher-js";

export interface NotificationProps {
  name: string
  read: boolean
  description: string
  userId: string
  createAt: Date
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [notificationIsOpen, setNotificationIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const {data, loading, error } = useQuery(GET_USER)

  async function pusher() {
    const pusher = new Pusher("7f0e3a323f03b1a35797", { cluster: 'us2' });
    pusher.connection.bind("connected", () => {
      const channel = pusher.subscribe("notifications");
      channel.bind("new_notifications", async (notifications: NotificationProps[]) => {
        const userNotifications: NotificationProps[] = [];
        if(error){
            console.log(error)
            return
        }
        if(data && !loading){
            console.log(notifications)
        }
        notifications.forEach(notify => {
          if (notify.userId === data.getUserByToken.id) {
            const notifyAlreadyInArray = userNotifications.find(notification => {
              return notification.name === notify.name;
            });
            if (!notifyAlreadyInArray) {
              userNotifications.push(notify);
            }
          }
        });
        setNotifications(userNotifications);
      });
    });
  }

  useEffect(() => {
    pusher();
  }, []);
  useEffect(() => {
    console.log(data.getUserByToken.id)
    console.log(notifications)
  }, [notifications]);

  

  return (
    <>
            <MenuButton   >
                    <Icon as={IoIosNotifications} h="100%" w={{base: "0", md:"20%"}}  textColor={notificationIsOpen ? "orange.500" : "white"} onClick={() => setNotificationIsOpen((prev) => !prev)}/>

                </MenuButton>
                <MenuList left="55%"  textColor={"black"} >
                {notifications && notifications.length > 0 ? (
                    notifications.map(notify => <MenuItem  _hover={{backgroundColor: "#646464"}} >{}</MenuItem>)
                ): <MenuItem  _hover={{backgroundColor: "#646464"}} >Sem notificacoes para hoje</MenuItem>}
                
                </MenuList>
    </>

  );
}