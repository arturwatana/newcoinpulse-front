import { possibleSearches } from "@/utils/query/FormattedPossibleSearches";
import { chakra} from "@chakra-ui/react";


export default function PrimaryOptions(){
    const options: any[] = possibleSearches;

    options.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })

        return (
            <>
                {options.map((curr, index) => {
                        return (
                                <chakra.option key={`option${index}`} textColor={"black"}>
                                    {curr.name}
                                </chakra.option>
                            )
                })}    
            </>
        )
}