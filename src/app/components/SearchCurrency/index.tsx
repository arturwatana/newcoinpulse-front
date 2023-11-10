import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select, Box, useDisclosure } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import PrimaryOptions from "../PrimaryOption"
import SecondaryOptions from "../OptionCurrency"
import { theme } from "@/app/providers/Providers"
import Search from "../Search"
import {HiOutlineSwitchHorizontal} from "react-icons/hi"
import { nameIsPossibleSearch, switchIsPossible } from "@/utils/query/FormattedPossibleSearches"
import { toast } from "react-toastify"
import { GET_CURRENCY, GET_FREE_CURRENCY } from "@/graphql/mutations/getCurrency.mutation"
import { useMutation } from "@apollo/client"
import { ICurrency } from "@/app/modules/Currency/model/ICurrency.interface"
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider"


interface FormProps {
    name: string
    w: string
    searchW: {
        base?: string
        md?: string
        lg?:string
        xl?: string
        "2xl"?: string
    }
    resultH: string
    logged?:boolean
}

export default function SearchCurrency({name, w, resultH,logged, searchW}: FormProps){
    const [primaryValue, setPrimaryValue] = useState<string>("BRL")
    const [secondaryValue, setSecondaryValue] = useState<string>("")
    const [switchSearches, setSwitchSearches ] = useState<boolean>(false)
    const [getCurrency, {data, loading, error }] = useMutation(logged ? GET_CURRENCY : GET_FREE_CURRENCY)
    const [result, setResult] = useState<ICurrency>()
    const { setUpdateScreen } = useModalContext()

    function switchValues(primary: string, second: string){
        const isPossible = nameIsPossibleSearch(second)
        if(!isPossible){
            toast.error(`Ops, essa conversao de ${primary} para ${second} ainda nao é possivel. `)
            return
        }
        const isPossibleSwitch = switchIsPossible(primary, second)
        if(!isPossibleSwitch){
            toast.error(`Ops, essa conversao de ${primary} para ${second} ainda nao é possivel. `)
            return
        }
        const prevPrimary = primary
        const prevSecondary = second
        setSwitchSearches(true)
        setSecondaryValue(prevPrimary)
        setPrimaryValue(prevSecondary)

    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        getCurrency({
            variables: {
                data: {
                    from: e.target.from.value,
                    to: e.target.to.value,    
                }
        }})
    }


    useEffect(() => {
        if(error){
            toast(error.message)
            return
        }
        if(data){
            setUpdateScreen((prev: UpdateScreenProps) => {
                return {
                  ...prev,
                  searches: true
                }
              })
            toast.success("Conversao consultada com sucesso")
            setResult(logged ? data.createCurrency : data.createFreeCurrency)
        }
                  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error])

    
    return (
        <Flex w={w} flexDir={"column"}  justifyContent={"start"} alignItems={"center"} gap="50px" px={{base:"0px", lg:"0px"}}>
                    <FormControl  w={{base:"100%", lg:"100%", xl:"70%"}} textColor={"white"} flexDir={"column"} display={"flex"} justifyContent={"center"} gap="15px" alignItems={"center" }  >
                    <Heading w='100%' textAlign={"center"} wordBreak={"break-word"}>{name}</Heading>
                        <chakra.form  flexDir={"column"} display={"flex"} alignItems={"center"} gap="15px" onSubmit={handleSubmit} >
                            <Flex w="100%" gap="15px" justifyContent={"center"} alignItems={"center"}>
                                <Select value={primaryValue} name="from" onChange={(e )=> setPrimaryValue(e.target.value)}>
                                    <PrimaryOptions/>
                                </Select>
                                <Icon as={HiOutlineSwitchHorizontal}  fontSize={"20px"}/>
                                <Select name="to" value={secondaryValue != "" ? secondaryValue : "AED"}  onChange={(e) => {
                                    setSecondaryValue(e.target.value)
                                }}>
                                    <SecondaryOptions switchSearches={switchSearches} setSwitchSearches={setSwitchSearches} name={primaryValue} setSecondaryValue={setSecondaryValue}/>
                                </Select>
                            </Flex>
                        <Button w="100%" bg={theme.colors.brand.primary} type="submit" isLoading={loading ? true : false} _hover={{backgroundColor: "#fdcd5e"}} >Consultar</Button>
                        </chakra.form>
                   </FormControl>
                   {result ? (
                 <Search height={resultH} width={searchW} currency={result} />
                   ) : null}
                   </Flex>
    )
}