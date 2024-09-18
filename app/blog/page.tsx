import { FC } from "react";
import CardList from "@/components/CardList";
import Menu from "@/components/Menu";

interface SearchParams {
  searchParams: {
    page: string;
    cat?: string;
  };
}

const BlogPage: FC<SearchParams> = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <div className="p-4 dark:bg-blue-950 rounded-md">
      <h1 className="dark:bg-cyan-900 border-2 border-gray-500 rounded-md px-1 py-2 text-center capitalize">{cat ? `${cat} Blog` : "Blog"}</h1>
      <div className="flex flex-col md:flex-row gap-12 pt-10">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
