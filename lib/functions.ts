import { DateTime } from "luxon";

const formateDate = (date: string) => DateTime.fromISO(date).toFormat("LLL dd, yyyy")

export {
    formateDate
}