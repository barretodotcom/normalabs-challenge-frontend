import { isAfter, isBefore } from "date-fns";
import { isEqual } from "date-fns/esm";

export const isBetween = (date: Date, from: Date, to: Date, inclusivity = '()') => {

    const isBeforeEqual = inclusivity[0] === '[',
        isAfterEqual = inclusivity[1] === ']';

    return (isBeforeEqual ? (isEqual(from, date) || isBefore(from, date)) : isBefore(from, date)) &&
        (isAfterEqual ? (isEqual(to, date) || isAfter(to, date)) : isAfter(to, date));
};