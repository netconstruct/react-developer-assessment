import { IAuthor } from "./IAuthor";
import { ICategory } from "./ICategory";

export interface IPost {
    id: string,
    title: string,
    publishDate: string,
    author: IAuthor,
    summary: string,
    categories: ICategory[],
}