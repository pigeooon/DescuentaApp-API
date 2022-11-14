export const removeHTMLTags = (text: string) => {
    let plainText = text.replace("<[^>]*>", "");
    plainText.replace("\n", "");
    plainText.replace("\t", "");
    return plainText;
}