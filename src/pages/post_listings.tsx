import { Post } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

function Card({ post } : { post : Post }) {
    return (
        <a href="#" className="h-60 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.name}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{post.time}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
        </a>
    )
}

const PostListings: NextPage = () => {
    const post = api.post.post.useQuery();

    return (
        <>
            <Head>
                <title>Post List</title>
                <meta name="description" content="Meet and Study Here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col gap-12 items-center bg-gradient-to-b from-slate-950 to-black">
            <h1 className="text-4xl mt-12">Tutor Posts</h1>
                <div className="container grid grid-cols-3 items-center justify-center gap-4">
                    {post?.data?.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    )
}

export default PostListings;