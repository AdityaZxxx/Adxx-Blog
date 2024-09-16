import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Tipe untuk parameter yang diterima dalam fungsi GET
interface Params {
  slug: string;
}

// GET SINGLE POST
export const GET = async (req: NextRequest, { params }: { params: Params }): Promise<NextResponse> => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
