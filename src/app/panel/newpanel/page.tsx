"use client"
import { Box, Flex, chakra } from "@chakra-ui/react";

export default function NewPanel(){
    return (
        <chakra.main textColor="white" pt="8em" display={"flex"} justifyContent={"center"} >
            <Flex  maxW="1920px" border="1px solid blue" w="95%"  >   
                <Flex w="100%" justifyContent={"space-evenly"} gap="15px" wrap={"wrap"}>
                <Box bg='orange.400' minW="45%" rounded="5px"   > 
                    oi
                </Box>
                <Box bg='orange.400' minW="45%" rounded="5px" >
                    oi
                </Box>
                <Box bg='orange.400' minW="45%"  rounded="5px"  > 
                    oi
                </Box>
                <Box bg='orange.400' minW="45%" rounded="5px" >
                    oi
                </Box>
                </Flex>
            </Flex>
        </chakra.main>
    )
}