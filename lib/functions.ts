import { DateTime } from "luxon";

const formateDate = (date: string) => DateTime.fromISO(date).toFormat("LLL dd, yyyy")
const getDateByFormat = (format: string = 'yyyy-MM-dd') => DateTime.local().toFormat(format)

export {
    formateDate,
    getDateByFormat,
}