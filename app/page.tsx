import Featured from "@/components/Featured"
import CategoryList from "@/components/CategoryList"
import CardList from "@/components/CardList"
import Menu from '@/components/Menu'

interface SearchParams {
    searchParams: {
      page: string;
    };
  }

export default function Home({ searchParams }:SearchParams) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className='min-h-screen bg-gray-200'>
      <Featured />
      <CategoryList />
      <div className='flex gap-12'>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
