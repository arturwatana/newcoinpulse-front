import { possibleSearches } from "@/utils/query/FormattedPossibleSearches";
import { chakra} from "@chakra-ui/react";
import { useEffect } from "react";


interface SecondaryOptionsProps {
    name: string
    setSecondaryValue: React.Dispatch<React.SetStateAction<string>>
    setSwitchSearches: React.Dispatch<React.SetStateAction<boolean>>
    switchSearches: boolean
}


export default function SecondaryOptions({name, setSecondaryValue, switchSearches, setSwitchSearches} : SecondaryOptionsProps){

    useEffect(() => {
  
        possibleSearches.map(curr => {
            if(curr.name === name){
                setSecondaryValue(curr.possibleSearches[0])
            }
        })
                  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, switchSearches])
    
        return (
            <>
                {possibleSearches.map(curr => {
                    if(curr.name === name){
                       return curr.possibleSearches.sort().map((search, index) => {
                            return (
                                <chakra.option key={`option${index}`} textColor={"black"}>
                                    {search}
                                </chakra.option>
                            )
                        })
                    }
                })}    
            </>
        )
}