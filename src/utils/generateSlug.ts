import { removeAccents } from "./removeExtraCharacters";

export const generateSlug = (bank: string, name: string) => {
    let slug = (bank + " " + name).replace(/^\s+|\s+$/g, ''); // trim
    slug = removeAccents(slug.toLowerCase());
    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
    return slug;
}
