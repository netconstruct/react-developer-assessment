import { PostType } from "./types";
export enum CategoriesEnum {
  title="title", date="date", author="author", summary="summary", all="all"
}

export const getFormatedDate = (date: string) => {
  const postDate = new Date(date);
  return `${postDate.getDay()}/${postDate.getMonth()}/${postDate.getFullYear()}`
}
 
const sorters: any= {
  title: (a: PostType, b: PostType) => {
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  },
  summary: (a: PostType, b: PostType) => {
    if(a.summary < b.summary) { return -1; }
    if(a.summary > b.summary) { return 1; }
    return 0;
  },
  author: (a: PostType, b: PostType) => {
    if(a.author.name < b.author.name) { return -1; }
    if(a.author.name > b.author.name) { return 1; }
    return 0;
  },
  date: (a: PostType, b: PostType) => {
    const dateA = new Date(a.publishDate);
    const dateB = new Date(b.publishDate);
    //@ts-ignore
    return dateA - dateB;
  }
};

export const filters: any ={
  title: (item: PostType, query: string) => item.title.toLowerCase().includes(query.toLowerCase()),
  author: (item: PostType, query: string) => item.author.name.toLowerCase().includes(query.toLowerCase()),
  summary: (item: PostType, query: string) => item.summary.toLowerCase().includes(query.toLowerCase()),
  date: (item: PostType, query: string) => getFormatedDate(item.publishDate).includes(query),
  all: (item: PostType, query: string) => item.title.toLowerCase().includes(query.toLowerCase()) || item.summary.toLowerCase().includes(query.toLowerCase()) || item.author.name.toLowerCase().includes(query.toLowerCase()) || getFormatedDate(item.publishDate).includes(query)
}

export const filterAndSortPosts = (posts: Array<PostType>, sortBy:CategoriesEnum, query = ""): Array<PostType> => {
  if(query === "") return posts.sort(sorters[sortBy]);//bailout earlier to save on filtering when not required
  return posts.sort(sorters[sortBy]).filter(item=>filters[sortBy](item, query))
};
