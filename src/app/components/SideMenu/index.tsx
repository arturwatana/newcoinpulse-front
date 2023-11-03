import { useModalContext } from "@/app/providers/ModalProvider";
import { theme } from "@/app/providers/Providers";
import { Flex, Text, chakra, Button, Menu, MenuButton, Icon, MenuList, MenuItem, MenuOptionGroup, MenuItemOption, MenuDivider, MenuGroup } from "@chakra-ui/react";
import {RxHamburgerMenu} from "react-icons/rx"


export default function SideMenu(){
  const { onOpen, setTypeModal } = useModalContext()

    return (
                <Flex zIndex={"sticky"} flexDir={"column"} display={{base:"none", "2xl": "flex"}}  textColor={"gray.200"}   justifyContent={"start"}  h={{base: "5%","2xl":"60%" }}fontSize={"18px"} left={{base: "5%", "2xl":"10%"}} top="20%" w={{base:"5%", "2xl":"10%" }}position="fixed" gap="10px"  >
                    <Flex flexDir={"column"} display={{base:"none", "2xl": "flex"}}>
                          <Button  minH="2em" mb="5px" w="100%" cursor={"pointer"} onClick={() => {setTypeModal("add"); onOpen() }} bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}}>+ Adicionar interesse</Button>
                          <chakra.hr border="2px solid white" mt="5px"  />
                          <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel" cursor={"pointer"}>Painel</Text>
                          <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/interests" cursor={"pointer"}>Acompanhar interesses</Text>
                          <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/searches" cursor={"pointer"}>Minhas pesquisas</Text>
                    </Flex>
            </Flex>
    )
}