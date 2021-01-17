import IDateItem from "../dataModels/IDateItem";
import IOutput from "./IOutput";

export interface IDateItemResponseData extends IDateItem {}

export default interface IDateItemResponse extends IOutput {
    payload: IDateItemResponseData;
}
