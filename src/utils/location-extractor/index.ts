import { removeHTMLTags } from "../removeHTMLTags";
import { locations } from "./location.list";

export const extractLocationFromString = (description: string) => {
    let plainDescription = removeHTMLTags(description);
    for(let i = 0; i < locations.length; i++) {
        if(plainDescription.includes(locations[i]) == true) {
            return locations[i];
        }
    }
    return "";
}