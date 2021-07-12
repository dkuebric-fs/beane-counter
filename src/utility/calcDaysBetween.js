
const calcDaysBetween = (dateStr) => {
    return Math.round((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 3600 * 24));
}

exports.calcDaysBetween = calcDaysBetween;
