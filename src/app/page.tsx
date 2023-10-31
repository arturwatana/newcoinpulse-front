"use client"
import NavBar from "@/app/components/Navbar"
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select } from "@chakra-ui/react"
import { theme } from "./providers/Providers"
import SearchCurrency from "./components/SearchCurrency"
import { useRouter } from "next/navigation"
import {useState, useEffect} from "react"
export default function Home() {
  const [userEmail, setUserEmail] = useState<string>("")
  const router = useRouter()

  function sendEmail(){
    localStorage.setItem("coinpulse_entry_user_email", userEmail)
    router.push("/account/register")
  }

  useEffect(()=>{
    localStorage.removeItem("coinpulse_entry_user_email")
  }, [])

  return (
    <chakra.main className="main" position={"relative"} display={"flex"} flexDir={"column"} alignItems={"center"} gap="20px" pb={{base:"50px", lg:"0"}} >
      <NavBar />
      <chakra.section h={{base: "100%", lg: "100vh"}} pt={{base: "8em", lg: "0"}} gap={{base: "80px", lg: "0"}} px={{base: "10px", lg: "0"}} w={{base: "95%", lg:"80%", "2xl":"80%"}} alignItems={"center"} display={"flex"} flexDir={{base:"column", lg:"row"}}justifyContent={{base:"center", lg:"space-between"}}>
        <Flex w={{base: "100%",  lg:"80%", "2xl": "50%"}}  flexDir={"column"} justifyContent={"center"} alignItems={{base:"center", lg:"start"}} h="100%"  gap={["35px", "35px", "35px", "15px"]}>
          <Flex flexDir={"column"} textColor={"white"} w={{base:"100%", lg:"90%","2xl":"80%"}} gap="15px">
            <Flex flexDir={"column"} gap="5px">
            <Heading w={{base:"100%"}} fontSize={{base:"35px",md: "35px",  lg:"47.12px"}} >Bem-vindo(a) ao CoinPulse</Heading>
            <Text fontSize={{base:"18px"}}>Acompanhe e receba alertas de conversões</Text>
            </Flex>
            <Text fontSize={{base:"18px"}} >O CoinPulse é o seu aplicativo de confiança para consultar conversões de moedas FIAT e as principais cryptos em tempo real e definir alertas personalizados. Mantenha-se informado e receba notificações quando as conversões atingirem os valores que você deseja.</Text>
            <Text fontSize={{base:"18px"}}>Simples, eficiente e poderoso. Comece agora e esteja no controle do seu investimento em tempo real.</Text>
          </Flex>
          <FormControl textColor={"white"}  flexDir={{base:"column", lg:"row"}} display={"flex"} alignItems={"center"} justifyContent={{base:"center", lg:"start"}} gap="15px">
            <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} h="100%" w={{base:"80%", lg:"50%"}} fontSize={{base:"18px"}} >
              <Flex w="100%" flexDir={"column"}>
                   <FormLabel w="" fontSize={{base:"18px"}} textAlign={"center"}  >Digite seu email:</FormLabel>
                  <Input type='email' fontSize={{base:"18px"}}  placeholder="coinpulse@joinus.com" onChange={((e) => setUserEmail(e.target.value))} />
              </Flex>
            <FormHelperText w="100%" textAlign={"center"} textColor={"white"} fontSize={{base:"18px"}} >Nunca compartilharemos seu email.</FormHelperText>
            </Flex>
            <Button w={{base:"50%", lg:"15%"}}   bg={theme.colors.brand.primary} _hover={{backgroundColor: "#fdcd5e"}} fontSize={{base:"18px"}} onClick={sendEmail}>Registrar</Button>
          </FormControl>
        </Flex>
        <Flex  w={{base:"100%", lg:"40%"}}    justifyContent={"center"} alignItems={{base:"center", lg:"end"}} flexDir={"column"} >
          <Flex flexDir={"column"}  justifyContent={"center"} w={{base:"100%", lg:"100%"}} alignItems={"center"} textColor={"white"} gap="30px" border="1px solid white" p="30px" rounded="20px"  shadow={"2px 2px 3px #f0f0f0"}  >
          <SearchCurrency name="Playground" w="100%" resultH="100%"/>
        </Flex>
          </Flex>
      </chakra.section>
      <chakra.section minH="100vh" h="100%" w={{lg:"95%","2xl": "80%"}} pb="50px" pt="30px" display={"flex"} flexDir={"row"} alignItems={"center"} justifyContent={"center"} textColor={"white"}>
            <Flex  w="80%" h="50%" alignItems={"center"} flexDir={["column", "column", "column",  "row"]} gap={{base:"70px", lg:"0"}}  justifyContent={"space-around"}>
              <Flex flexDir={"column"} border="2px solid white" rounded="10px" w={{lg:"40%","2xl": "40%"}} gap="10px" minH="250px" h="100%" py="20px"  backdropFilter='auto' backdropBlur='20px' alignItems={"center"} justifyContent={"space-evenly"} shadow={"2px 2px 3px #f0f0f0"} >
                <Heading fontSize={"29.12px"} w='100%'textAlign={"center"}>Interesses Personalizados:</Heading>
                <Text fontSize={{base:"18px"}} w="80%" textAlign={"center"}>Com o CoinPulse, você tem o poder de escolher o que importa. Adicione suas moedas e criptomoedas favoritas à sua lista de interesses. Dessa forma, você pode ver as conversões que mais lhe interessam e até mesmo definir valores-alvo para receber notificações quando elas atingirem esses valores.</Text>
              </Flex>
              <Flex flexDir={"column"} border="2px solid white"  gap="10px"  w={{lg:"40%","2xl": "40%"}}  py="20px" minH="250px"   rounded="10px" backdropFilter='auto' backdropBlur='20px' alignItems={"center"} justifyContent={"space-evenly"} shadow={"2px 2px 3px #f0f0f0"} >
                <Heading fontSize={"29.12px"} w='100%' textAlign={"center"}>Notificações em Tempo Real:</Heading>
                <Text fontSize={{base:"18px"}}  w="80%" textAlign={"center"}>Fique por dentro das mudanças do mercado com as notificações do CoinPulse. Quando suas moedas atingirem os valores que você definiu, você receberá notificações instantâneas. É a maneira mais simples de acompanhar seus investimentos e se manter informado.</Text>
              </Flex>
            </Flex>
      </chakra.section>
    </chakra.main >
  )
}
