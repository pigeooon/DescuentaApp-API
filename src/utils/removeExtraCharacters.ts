export const removeExtraCharacters = (text: string) => {
    let cleanText = text.replace(/\s{2,}/g, " ");
    cleanText.replace("&amp;", "&");
    return cleanText;
}