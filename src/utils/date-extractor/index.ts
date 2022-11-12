import { individualDays, multipleDays } from "./date.list";

export const extractDateFromString = (description: string) => {
    //Caso 1: múltiples días a la semana (ojalá tenerlos todos).
    for(let i = 0; i < multipleDays.length; i++) {
        if(description.toLowerCase().includes(multipleDays[i].toLowerCase()) == true) {
            return multipleDays[i];
        }
    }
    
    //Caso 2: días individuales.
    let selectedDays = "";
    for(let i = 0; i < individualDays.length; i++) {
        if(description.toLowerCase().includes(individualDays[i].toLowerCase()) == true) {
            selectedDays = selectedDays + individualDays[i] + " ";
        }
    }
    return selectedDays;
}