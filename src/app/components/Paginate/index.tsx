"use client"
import Search from "../Search";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import {Flex, chakra, Heading, FormControl,Text,  FormLabel, FormHelperText, Input,Button, Icon, Select, Box, HStack } from "@chakra-ui/react"

type PaginateProps = {
  elements: any[];
  filterByName: string;
  categories?: string[]
  qtdPerPage: number
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
  


export default function Paginate({ elements, filterByName, categories, qtdPerPage }: PaginateProps) {
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


  function renderFilteredCurrencies(elementsToShow: CurrencyTypeRes[]) {
    const lastElement = paginateProps.page * paginateProps.qtdPerPage;
    const firstElement =
      paginateProps.page * paginateProps.qtdPerPage - qtdPerPage;

      if(filterByName != "Todas"){
        const filteredElements = elementsToShow.filter(element => {
          const filterElementName = `${element.from}/${element.to}`
          if(filterElementName === filterByName){
            return element
          }
          return 
          })
        return filteredElements.map((element, index) => {
          if (index >= firstElement && index + 1 <= lastElement) {
            return (
            //   <Search
            //   from={element.from}
            //   to={element.to}
            //     setDeleteSearchId={setDeleteSearchId}
            //     id={element.id}
            //     code={element.code}
            //     create_date={element.create_date}
            //     high={element.high}
            //     low={element.low}
            //     name={element.name}
            //     index={index}
            //     key={ `element${index}`}
            //   />
            <Search key={ `element${index}`}/>
            );
          }
        });
      }

    return elementsToShow.map((element, index) => {
      if (index >= firstElement && index + 1 <= lastElement) {
        return (
        //   <Search
        //   from={element.from}
        //   to={element.to}
        //     setDeleteSearchId={setDeleteSearchId}
        //     id={element.id}
        //     code={element.code}
        //     create_date={element.create_date}
        //     high={element.high}
        //     low={element.low}
        //     name={element.name}
        //     index={index}
        //     key={ `element${index}`}

        //   />
        <Search key={ `element${index}`}/>
        );
      }
    });
  }

  return (
        <Flex  flexDir="column" w="full" gap={5} justifyContent={"space-between"} pt="15px">
             <Flex justifyContent={"start"} alignItems={"center"} gap={5} wrap={"wrap"} px="100px" pl="120px" >
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
