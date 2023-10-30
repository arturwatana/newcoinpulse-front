import { possibleSearches } from "@/utils/query/FormattedPossibleSearches";
import { chakra} from "@chakra-ui/react";


export default function PrimaryOptions(){
    const priority = ["USD", "BRL", "GBP", "EUR"];
    const inPriority:any[] = possibleSearches.filter(curr => priority.includes(curr.name));
    const notInPriority = possibleSearches.filter(curr => !priority.includes(curr.name));

    inPriority.sort((a, b) => {
    return priority.indexOf(a.name) - priority.indexOf(b.name);
    });

    notInPriority.sort((a, b) => {
    return a.name.localeCompare(b.name);
    });

    const sorted = [...inPriority, ...notInPriority];

        return (
            <>
                {sorted.map((curr, index) => {
                        return (
                                <chakra.option key={`option${index}`} textColor={"black"}>
                                    {curr.name}
                                </chakra.option>
                            )
                })}    
            </>
        )
}