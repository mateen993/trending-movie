export const dynamic = "force-dynamic";

import Submit from "@/app/components/Submit";
import { db } from "@/app/db";
import { revalidatePath } from "next/cache";

async function getComments(id: string) {
  const comments = await db.comment.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}

export default async function Comment({ params }: { params: { id: string } }) {
  const comments = await getComments(params.id);

  const handleComment = async (e: FormData) => {
    "use server";
    const message = e.get("comment")?.toString();
    const id = e.get("id")?.toString();

    if(!message || !id) return;

    const data = await db.comment.create({
       data: {
        message: message,
        movieId: id,
       }
    })
    revalidatePath("/movie/[id]")
  }

  return (
    <div className="rounded-lg border p-3">
      <h1 className="text-xl font-semibold mb-3 text-teal-700  ">
        {" "}
        Your Opinion{" "}
      </h1>
      <form action={handleComment}>
        <textarea
          name="comment"
          id="comment"
          placeholder="Your comment on the movie"
          className="w-full border-2 p-1 border-teal-500 outline-none rounded-lg"
        />
        <input type="hidden" name="id" value={params.id} />
        <Submit />
      </form>

      <div className="flex flex-col gap-y-3 mt-5" >
        {
            comments.map((comment) => (
                <div key={comment.id} >
                    <p className="text-sm" > {comment.message} </p>
                </div>
            ))
        }
      </div>
    </div>
  );
}
