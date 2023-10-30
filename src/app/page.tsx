"use client"
import NavBar from "@/app/components/Navbar"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select } from "@chakra-ui/react"
import {HiOutlineSwitchHorizontal} from "react-icons/hi"
import { theme } from "./providers/Providers"
import SearchCurrency from "./components/SearchCurrency"
import { useRouter } from "next/navigation"
import {useState} from "react"
import Link from "next/link"
export default function Home() {
  const [userEmail, setUserEmail] = useState<string>("")
  const router = useRouter()

  function sendEmail(){
    localStorage.setItem("coinpulse_entry_user_email", userEmail)
    router.push("/account/register")
  }

  return (
    <chakra.main className="main" position={"relative"} display={"flex"} flexDir={"column"} alignItems={"center"} gap="20px" >
      <NavBar />
      <chakra.section h="100vh" w="80%"  display={"flex"} flexDir={"row"}  justifyContent={"center"}>
        <Flex w="50%"  flexDir={"column"} justifyContent={"center"} h="100%"  gap="15px">
          <Flex flexDir={"column"} textColor={"white"} w="80%" gap="15px">
            <Flex flexDir={"column"} gap="5px">
            <Heading fontSize={"47.12px"}>Bem-vindo ao CoinPulse</Heading>
            <Text fontSize={"18px"}>Acompanhe e receba alertas de conversões</Text>
            </Flex>
            <Text fontSize={"18px"} >O CoinPulse é o seu aplicativo de confiança para consultar conversões de moedas FIAT e as principais cryptos em tempo real e definir alertas personalizados. Mantenha-se informado e receba notificações quando as conversões atingirem os valores que você deseja.</Text>
            <Text fontSize={"18px"}>Simples, eficiente e poderoso. Comece agora e esteja no controle do seu investimento em tempo real.</Text>
          </Flex>
          <FormControl  w="100%" textColor={"white"} flexDir={"row"} display={"flex"} alignItems={"center"} gap="15px">
            <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} h="100%" w="50%" fontSize={"18px"} >
                   <FormLabel w="" fontSize={"18px"}  >Digite seu email:</FormLabel>
                  <Input type='email' fontSize={"18px"}  placeholder="coinpulse@joinus.com" onChange={((e) => setUserEmail(e.target.value))} />
            <FormHelperText textColor={"white"} fontSize={"18px"} >Nunca compartilharemos seu email.</FormHelperText>
            </Flex>
            <Button w="15%"  bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} fontSize={"18px"} onClick={sendEmail}>Registrar</Button>
          </FormControl>
        </Flex>
        <Flex  w="50%" justifyContent={"center"} alignItems={"end"} flexDir={"column"} >
          <Flex flexDir={"column"} justifyContent={"center"} w="70%" alignItems={"center"} textColor={"white"} gap="30px" border="1px solid white" p="30px" rounded="20px"  shadow={"2px 2px 3px #f0f0f0"}  >
          <SearchCurrency name="Playground" w="100%" resultH="100%"/>

        </Flex>

          </Flex>
      </chakra.section>
      <chakra.section h="100vh" w="80%" pb="50px" pt="30px" display={"flex"} flexDir={"row"} alignItems={"center"} justifyContent={"center"} textColor={"white"}>
            <Flex  w="80%" h="50%" alignItems={"center"} justifyContent={"space-around"}>
              <Flex flexDir={"column"} border="2px solid white"  py="20px" rounded="10px" w="40%" gap="10px" minH="250px"  backdropFilter='auto' backdropBlur='20px' alignItems={"center"} justifyContent={"space-evenly"} shadow={"2px 2px 3px #f0f0f0"} >
                <Heading fontSize={"29.12px"} w='100%' textAlign={"center"}>Interesses Personalizados:</Heading>
                <Text fontSize={"18px"} w="80%" textAlign={"center"}>Com o CoinPulse, você tem o poder de escolher o que importa. Adicione suas moedas e criptomoedas favoritas à sua lista de interesses. Dessa forma, você pode ver as conversões que mais lhe interessam e até mesmo definir valores-alvo para receber notificações quando elas atingirem esses valores.</Text>
              </Flex>
              <Flex flexDir={"column"} border="2px solid white" w="40%" gap="10px"  py="20px" minH="250px"   rounded="10px" backdropFilter='auto' backdropBlur='20px' alignItems={"center"} justifyContent={"space-evenly"} shadow={"2px 2px 3px #f0f0f0"} >
                <Heading fontSize={"29.12px"} w='100%' textAlign={"center"}>Notificações em Tempo Real:</Heading>
                <Text fontSize={"18px"}  w="80%" textAlign={"center"}>Fique por dentro das mudanças do mercado com as notificações do CoinPulse. Quando suas moedas atingirem os valores que você definiu, você receberá notificações instantâneas. É a maneira mais simples de acompanhar seus investimentos e se manter informado.</Text>
              </Flex>
            </Flex>
      </chakra.section>

    </chakra.main >
  )
}
