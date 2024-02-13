import {Flex, chakra, Heading, FormControl,Button, Icon, Select } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import PrimaryOptions from "../PrimaryOption"
import SecondaryOptions from "../OptionCurrency"
import { theme } from "@/app/providers/Providers"
import Search from "../Search"
import { toast } from "react-toastify"
import { GET_CURRENCY, GET_FREE_CURRENCY } from "@/graphql/mutations/getCurrency.mutation"
import { useMutation } from "@apollo/client"
import { ICurrency } from "@/app/modules/Currency/model/ICurrency.interface"
import { UpdateScreenProps, useModalContext } from "@/app/providers/ModalProvider"
import { FaArrowRightLong } from "react-icons/fa6";

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
    const [primaryValue, setPrimaryValue] = useState<string>("1INCH")
    const [secondaryValue, setSecondaryValue] = useState<string>("BTC")
    const [switchSearches, setSwitchSearches ] = useState<boolean>(false)
    const [getCurrency, {data, loading, error }] = useMutation(logged ? GET_CURRENCY : GET_FREE_CURRENCY)
    const [result, setResult] = useState<ICurrency>()
    const { setUpdateScreen } = useModalContext()

    const handleSubmit = (e:any) => {
        e.preventDefault()
        getCurrency({
            variables: {
                data: {
                    from: e.target.from.value,
                    to: e.target.to.value,    
                }
            }}).then(res => {
                setUpdateScreen((prev: UpdateScreenProps) => {
                    return {
                    ...prev,
                    searches: true
                    }
                })
                toast.success("Conversão consultada com sucesso")
                console.log(res.data.createFreeCurrency)
                setResult(logged ? res.data.createCurrency : res.data.createFreeCurrency)
            }).catch(err => {
                return
            })
    }

    return (
        <Flex w={w} flexDir={"column"}  justifyContent={"start"} alignItems={"center"} gap="50px" px={{base:"0px", lg:"0px"}}>
                    <FormControl  w={{base:"100%", lg:"100%", xl:"70%"}} textColor={"white"} flexDir={"column"} display={"flex"} justifyContent={"center"} gap="15px" alignItems={"center" }  >
                    <Heading w='100%' textAlign={"center"} wordBreak={"break-word"}>{name}</Heading>
                        <chakra.form  flexDir={"column"} display={"flex"} alignItems={"center"} gap="15px" onSubmit={handleSubmit} >
                            <Flex w="100%" gap="15px" justifyContent={"center"} alignItems={"center"}>
                                <Select value={primaryValue} name="from" onChange={(e )=> setPrimaryValue(e.target.value)}>
                                    <PrimaryOptions/>
                                </Select>
                                <Icon as={FaArrowRightLong}  fontSize={"20px"}/>
                                <Select name="to" value={secondaryValue || "BTC"}   onChange={(e) => {
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