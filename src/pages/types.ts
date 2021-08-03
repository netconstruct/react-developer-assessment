export type PostType = {
  id: string;
  title: string;
  author: { avatar: string; name: string };
  categories: Array<{ id: string; name: string }>;
  publishDate: string;
  summary: string;
};