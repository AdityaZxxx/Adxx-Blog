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
    <div className="p-4 bg-gray-50 rounded-xl border-t-2">
      <h1 className="text-3xl font-bold mb-4">{cat ? `${cat} Blog` : "Blog"}</h1>
      <div className="flex gap-8">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
