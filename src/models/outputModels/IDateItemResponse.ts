import IDateItem from "../dataModels/IDateItem";
import IOutput from "./IOutput";

export interface IDateItemResponseData {
    item: IDateItem;
}

export default interface IDateItemResponse extends IOutput {
    payload: IDateItemResponseData;
}
