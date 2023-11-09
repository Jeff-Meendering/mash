import { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const PostListings: NextPage = () => {
    const messages = api.post.getMessage.useQuery();

    return (
        <>
            <Head>
                <title>Post List</title>
                <meta name="description" content="Meet and Study Here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col gap-12 items-center bg-gradient-to-b from-slate-950 to-black">
            <div className="container mx-auto">
                <h1 className="text-4xl mt-12">Tutor Posts</h1>


<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    From
                </th>
                <th scope="col" className="px-6 py-3">
                    Message
                </th>
            </tr>
        </thead>
        <tbody>
        {messages.data?.map((message) => (
            <tr key={message.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                    {message.fromUser}
                </td>
                <td className="px-6 py-4">
                    {message.message}
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>


                
            </div>
            </main>
        </>
    )
}

export default PostListings;