import { primaryOptionsWithoutDuplicates } from "@/utils/binance/binancePossibleSearches";
import { chakra} from "@chakra-ui/react";

export default function PrimaryOptions(){
    const options: any[] = primaryOptionsWithoutDuplicates;

    options.sort((a, b) => {
        if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        })

        return (
            <>
                {options.map((curr, index) => {
                        return (
                                <chakra.option key={`option${index}`} textColor={"black"}>
                                    {curr}
                                </chakra.option>
                            )
                })}    
            </>
        )
}