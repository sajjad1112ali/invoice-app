import { DateTime } from "luxon";

const formateDate = (date: string) => DateTime.fromISO(date).toFormat("LLL dd, yyyy")
const getDateByFormat = (format: string = 'yyyy-MM-dd') => DateTime.local().toFormat(format)

function isFutureDate(date: string) {
    const inputDateObj = DateTime.fromISO(date);
    const currentDateObj = DateTime.local();
    return inputDateObj > currentDateObj;
  }

export {
    formateDate,
    getDateByFormat,
    isFutureDate,
}