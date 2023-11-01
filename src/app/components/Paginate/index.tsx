"use client"
import Search from "../Search";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select, Box, HStack } from "@chakra-ui/react"
import InterestTracking from "../InterestTracking";
import { theme } from "@/app/providers/Providers";

type PaginateProps = {
  elements: any[];
  filterByName: string;
  categories?: string[]
  qtdPerPage: number
  typePaginate: "search" | "interest"
};
export type CurrencyType = {
    code: string;
    from: string;
    to: string
    name: string
    high: string;
    low: string;
    create_date: string;
    lastDays?: LastDaysQuery[]
  };
  
  interface LastDaysQuery{
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
  }
  
  
  export type CurrencyTypeRes = {
    id: string
  } & CurrencyType
  


export default function Paginate({ elements, filterByName, categories, qtdPerPage, typePaginate }: PaginateProps) {
  const [paginateProps, setPaginateProps] = useState({
    page: 1,
    qtdPerPage: 12,
    totalPages: Math.ceil(elements.length / qtdPerPage) == 0 ? 1 : Math.ceil(elements.length / qtdPerPage),
  });
  const [deletedSearchId, setDeleteSearchId] = useState<string>("")
  const [elementsToShow, setElementsToShow] = useState(elements)

  useEffect(() => {
    setElementsToShow(elements)
    setPaginateProps({
      ...paginateProps,
      page: 1,
      totalPages: Math.ceil(elements.length / qtdPerPage) == 0 ? 1 : Math.ceil(elements.length / qtdPerPage),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements]);

  useEffect(() => {
    setPaginateProps({
        ...paginateProps,
        qtdPerPage: qtdPerPage,
        totalPages: Math.ceil(elements.length / qtdPerPage) == 0 ? 1 : Math.ceil(elements.length / qtdPerPage)
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qtdPerPage])

  useEffect(() => {
      if(deletedSearchId.length > 1){
       const newElements = elementsToShow.filter(element => {
          if(element.id === deletedSearchId){
            return 
          }
          return element
        })
        setElementsToShow(newElements)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedSearchId])

  function renderPages() {
    const numberOfPages = [];
    for (let i = 1; i <= paginateProps.totalPages ; i++) {
      numberOfPages.push(i);
    }
    return numberOfPages;
  }


  function renderFilteredCurrencies(elementsToShow: any[]) {
    const lastElement = paginateProps.page * paginateProps.qtdPerPage;
    const firstElement =
      paginateProps.page * paginateProps.qtdPerPage - qtdPerPage;

      if(filterByName != "Todas"){
        const filteredElements = elementsToShow.filter(element => {
          const filterElementName = typePaginate === "interest" ?  `${element.code}/${element.codein}` : `${element.from}/${element.to}`
          if(filterElementName === filterByName){
            return element
          }
          return 
          })
        return filteredElements.map((element, index) => {
          if (index >= firstElement && index + 1 <= lastElement) {
            if(typePaginate === "search"){
              return (
                <Search height="100%" width={{base: "80%", xl: "30%","2xl": "25%"}} currency={element} key={ `element${index}`}/>
                );

            }
            return (
              <InterestTracking key={`track${index}`} h="100%" w="100%" code={element.code} codein={element.codein} high={element.high} lastDays={element.lastDays} low={element.low}  name={element.name} targetValue={element.targetValue} varBid={element.varBid}/>
            )
          
          }
        });
      }

    return elementsToShow.map((element, index) => {
      if (index >= firstElement && index + 1 <= lastElement) {
        if(typePaginate === "search"){
          return (
            <Search  height="100%" width={{base: "80%", lg:"30%", xl: "30%","2xl": "25%"}}currency={element} key={ `element${index}`}/>
            );

        }
        return (
          <InterestTracking key={`track${index}`} h="100%" w="100%" code={element.code} codein={element.codein} high={element.high} lastDays={element.lastDays} low={element.low}  name={element.name} targetValue={element.targetValue} varBid={element.varBid}/>
        )
      }
    });
  }

  return (
    <Flex  flexDir="column" h="100%" minH="38em" w="full" gap={5} justifyContent={"space-between"} >
          <Flex justifyContent={{base:typePaginate === "search" ? "center" : "start","2xl": "start"}}  flexDir={{base: "column", lg: typePaginate === "search" ? "row" : "column"}} flexWrap={typePaginate === "search" ? "wrap" : "nowrap"} alignItems={typePaginate === "interest" ? "start" : "center"} gap={5} px={{base:typePaginate === "interest" ? "0px" : "10px", "2xl": typePaginate === "interest" ? "0px" : "100px"}} pt={typePaginate === "interest" ? "0px" : "20px"} pl={{base:"0px", "2xl": typePaginate === "interest" ? "0px" : "120px"}} >
              {typePaginate === "interest" ? ( 
                <chakra.ul bg={theme.colors.brand.primary} w="100%" rounded="6px 6px 0 0" textColor={"gray.800"} fontWeight={"bold"} listStyleType={"none"} display={"flex"} justifyContent={"space-evenly"}  alignItems="center"borderBottom={"1px solid white"} h="2em"> 
                    <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} >
                        Sigla
                    </chakra.li>
                    <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} >
                        Alta
                    </chakra.li>
                    <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} display={{base: "none","2xl": "block"}} >
                        Baixa
                    </chakra.li>
                    <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} >
                        Target
                    </chakra.li>
                    <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center"} display={{base: "none","2xl": "block"}} >
                        Diária
                    </chakra.li>
                    <chakra.li minW={{base:"32%", lg:"16.66%"}} textAlign={"center" } display={{base: "none","2xl": "block"}} >
                        Quinzenal
                    </chakra.li>
                </chakra.ul>
              ) : null}
              {renderFilteredCurrencies(elementsToShow)}
             </Flex>
         <Flex justify="space-around" color="white" >
        <HStack spacing={2}>
        <Icon zIndex={"30"} fontSize={"23px"}  as="p" onClick={() => setPaginateProps({ ...paginateProps, page: 1 })}>
            <BiArrowToLeft className="text-[30px]" />
        </Icon>
        <Icon fontSize={"23px"}  zIndex={"30"} as="p" onClick={() => {
            if (paginateProps.page === 1) {
            return;
            }
            setPaginateProps({ ...paginateProps, page: paginateProps.page - 1 });
        }}>
            <AiOutlineArrowLeft className="text-[30px]" />
        </Icon>
        </HStack>
        <HStack spacing={2}>
        {renderPages().map((page, index) => (
            <Text
            cursor={"pointer"}
            fontSize={"18px"} 
            fontWeight={`${paginateProps.page === page ? "bold" : ""} `}
            textColor={`${paginateProps.page === page ? "gray.500" : "white"} `}
            onClick={() => setPaginateProps({ ...paginateProps, page })}
            className={`pointer ${paginateProps.page === page ? "font-bold" : ""} text-[20px]`}
            key={`p${index}`}
            zIndex={"30"}
            >
            {page}
            </Text>
        ))}
        </HStack>
        <HStack spacing={2}>
        <Icon fontSize={"23px"}  zIndex={"30"}  onClick={() => {
            if (paginateProps.page === paginateProps.totalPages) {
            return;
            }
            setPaginateProps({ ...paginateProps, page: paginateProps.page + 1 });
        }}>
            <AiOutlineArrowRight className="text-[30px]" />
        </Icon>
        <Icon fontSize={"23px"}  cursor={"pointer"} zIndex={"30"} onClick={() => {
            setPaginateProps({ ...paginateProps, page: paginateProps.totalPages })}}>
            <BiArrowToRight className="text-[30px]" />
        </Icon>
        </HStack>
        </Flex>
</Flex>
  );
}
