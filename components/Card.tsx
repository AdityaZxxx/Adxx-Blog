import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: {
    img?: string;
    createdAt: string;
    catSlug: string;
    slug: string;
    title: string;
    desc: string;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="mb-3 flex items-center gap-5">
      {item.img && (
        <div className="relative h-[35px] w-[35px] xl:hidden">
          <Image src={item.img} alt={item.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="">
          <span className="font-light text-gray-700 dark:text-gray-400">
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className="text-cyan-500 dark:text-yellow-400 font-medium">{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1 className="text-xl font-bold">{item.title}</h1>
        </Link>
        <div
          className="text-lg font-light"
          dangerouslySetInnerHTML={{ __html: item.desc.substring(0, 60) }}
        />
        <Link
          href={`/posts/${item.slug}`}
          className="border-b-2 decoration-solid w-full px-1 py-0 text-blue-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
