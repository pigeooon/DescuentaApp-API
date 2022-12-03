export const removeHTMLTags = (text: string) => {
    let plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
    plainText.replace("\n", "");
    plainText.replace("\t", "");
    return plainText;
}