export const removeExtraCharacters = (text: string) => {
    let cleanText = text.replace(/\s{2,}/g, " ");
    cleanText.replace("&amp;", "&");
    return cleanText;
}

export const removeAccents = (text: string) => {
    let textWithoutAccents = text;
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa";
    const to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa";
    for (let i = 0, l = from.length; i < l; i++) {
        textWithoutAccents = textWithoutAccents.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    return textWithoutAccents;
}