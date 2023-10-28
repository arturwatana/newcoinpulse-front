import { Box } from "@chakra-ui/react";



export default function BackPageBtn(){
    return (
        <Box position={"absolute"} top="5%" left={"10%"} textColor={"white"} px="15px" py="10px" rounded="20px" border="1px solid white" as="a" href="/" zIndex={"50"}>
            Voltar
        </Box>
    )
}