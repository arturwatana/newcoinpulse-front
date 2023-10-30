import { useModalContext } from "@/app/providers/ModalProvider";
import { theme } from "@/app/providers/Providers";
import { Flex, Text, chakra, Button } from "@chakra-ui/react";



export default function SideMenu(){
  const { onOpen, setTypeModal } = useModalContext()

  

    return (
        <Flex flexDir={"column"} textColor={"gray.200"}  justifyContent={"start"}  h="60%" fontSize={"18px"} left="10%" top="28%" w="10%" position="fixed" gap="10px"  >
                <Button  minH="2em"  cursor={"pointer"} onClick={() => {setTypeModal("add"); onOpen() }} bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}}>+ Adicionar interesse</Button>
                <chakra.hr border="2px solid white" mt="5px"  />
                <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel" cursor={"pointer"}>Painel</Text>
                <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/interests" cursor={"pointer"}>Acompanhar interesses</Text>
                <Text _hover={{borderBottom: "1px solid white"}} minH="2em" as={"a"} href="/panel/searches" cursor={"pointer"}>Minhas pesquisas</Text>
            </Flex>
    )
}