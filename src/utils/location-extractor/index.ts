import { locations } from "./location.list";

export const extractLocationFromString = (description: string) => {
    for(let i = 0; i < locations.length; i++) {
        if(description.includes(locations[i]) == true) {
            return locations[i];
        }
    }
    return "";
}