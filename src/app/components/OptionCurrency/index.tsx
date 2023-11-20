import { searchByOption } from "@/utils/binance/binancePossibleSearches";
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

    const options: any[] = searchByOption(name);

    options.sort((a, b) => {
        if (a.to < b.to) {
            return -1;
          }
          if (a.to > b.to) {
            return 1;
          }
          return 0;
        })


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
                {options.map((curr: any, index: any) => {
                            return (
                                <chakra.option key={`option${index}`} textColor={"black"}>
                                    {curr.to}
                                </chakra.option>
                            )
                        })
                    }
            </>
        )
}