const percentageRegex = (opts:any) => {
	opts = opts || {};

	var reg = '(\\d+(\\.\\d+)?|\\.\\d+) ?%';

	return opts.exact ? new RegExp('^' + reg + '$', 'i') : new RegExp(reg, 'ig');
}

export const extractPercentageFromString = (description: string) => {
    const words = description.split(' ');

    for(let i = 0; i < words.length; i++) {
        if(percentageRegex({exact: true}).test(words[i])) {
            return words[i];
        }
    }
    return "";
}