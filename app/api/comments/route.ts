import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// CREATE A COMMENT (POST)
export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { message: "Not Authenticated!" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });
    return NextResponse.json(comment, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

// GET COMMENTS (GET)
export const GET = async () => {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          user: {  // Include data user
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return NextResponse.json(comments, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Something went wrong!" },
        { status: 500 }
      );
    }
  };
