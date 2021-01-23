import moment from "moment";
import IDateItem from "../models/dataModels/IDateItem";

export interface IConvertedDateItem {
    id: number;
    title: string;
    date: string;
    daysDiff: string;
}
export interface IConvertedCoverItem extends IConvertedDateItem {
    isSecondary: boolean;
}

export const convertCoverItem = (item: IDateItem) => {
    const date = moment(item.date);
    const today = moment();
    const diff = Math.floor(moment.duration(today.diff(date)).asDays());
    const formattedDate = date.format("DD/MM/YYYY");
    return {
        id: item.id,
        title: item.title,
        daysDiff: diff > 0 ? diff.toString() : (0 - diff).toString(),
        date: formattedDate,
        isSecondary: diff > 0,
    } as IConvertedCoverItem;
};

const convertItems = (items: IDateItem[]) => {
    let daysTill: IConvertedDateItem[] = [];
    let daysSince: IConvertedDateItem[] = [];
    for (const item of items) {
        const date = moment(item.date);
        const today = moment();
        const diff = Math.floor(moment.duration(today.diff(date)).asDays());
        const formattedDate = date.format("DD/MM/YYYY");
        if (diff === 0) {
            daysTill.push({
                id: item.id,
                title: item.title,
                date: formattedDate,
                daysDiff: "TODAY",
            });
        } else if (diff < 0) {
            daysTill.push({
                id: item.id,
                title: item.title,
                date: formattedDate,
                daysDiff: (0 - diff).toString(),
            });
        } else {
            daysSince.push({
                id: item.id,
                title: item.title,
                date: formattedDate,
                daysDiff: diff.toString(),
            });
        }
    }
    return {
        daysSince,
        daysTill,
    };
};

export default convertItems;
