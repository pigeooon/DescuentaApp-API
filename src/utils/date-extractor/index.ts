import { removeAccents } from "../removeExtraCharacters";
import { removeHTMLTags } from "../removeHTMLTags";
import { daysDictionary } from "./date.list";

export const extractDateFromString = (description: string) => {
    let plainDescription:string = removeAccents(removeHTMLTags(description));

    for(let days of daysDictionary) {
        if(plainDescription.toLowerCase().includes(days.dictionary.toLowerCase()) == true) {
            return days.daysArray;
        }
    }
    return [];
}

export const defaultDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];