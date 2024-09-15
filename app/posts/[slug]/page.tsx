import { FC } from "react";
import Image from "next/image";
import Menu from "@/components/Menu";
import Comments from "@/components/Comment";

// Tipe data untuk props
interface SinglePageProps {
  params: {
    slug: string;
  };
}

// Tipe data untuk response dari API
interface PostData {
  title: string;
  user: {
    name: string;
    image?: string;
  };
  img?: string;
  desc: string;
}

const getData = async (slug: string): Promise<PostData> => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post data");
  }

  return res.json();
};

const SinglePage: FC<SinglePageProps> = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <div className="flex items-center gap-4">
            {data.user.image && (
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={data.user.image}
                  alt="User Avatar"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold">{data.user.name}</span>
              <span className="text-gray-500">01.01.2024</span>
            </div>
          </div>
        </div>
        {data.img && (
          <div className="relative w-full h-96">
            <Image
              src={data.img}
              alt="Post Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div className="prose">
          <div
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
        </div>
        <div>
          <Comments postSlug={slug} />
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default SinglePage;
