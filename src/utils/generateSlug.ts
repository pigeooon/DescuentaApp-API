export const generateSlug = (bank: string, name: string) => {

    let slug = (bank + " " + name).replace(/^\s+|\s+$/g, ''); // trim
    slug = slug.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa";
    const to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa";
    for (var i = 0, l = from.length; i < l; i++) {
      slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
  
    return slug;
}
