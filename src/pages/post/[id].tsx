import { useUser } from "@clerk/nextjs";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

const postView: NextPage = () => {
    const {
        register,
        handleSubmit,
        reset,
      } = useForm<{message: string}>()

    const router = useRouter();
    router.query.id;
    const post = api.post.get.useQuery({
        postId: router.query.id as string,
    }, {
        enabled: !!router.query.id,
    });

    const user = useUser();

    const sendMessage = api.post.sendMessage.useMutation();

    const message = api.post.getMessage.useQuery({
        postId: router.query.id as string,
    }, {
        enabled: !!router.query.id,
    });

    const messageQuery = api.post.getMessage.useQuery({
        postId: router.query.id as string,
    }, {
        enabled: !!router.query.id,
    });

    const postItem = post.data;

    if (!postItem) {
        return null;
    }

    return (
        <>
            <Head>
                <title>View Post</title>
                <meta name="description" content="Meet and Study Here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col gap-12 items-center bg-gradient-to-b from-slate-950 to-black">
            <div className="container mx-auto flex flex-col gap-8">
                <h1 className="text-4xl mt-12">{postItem.name}</h1>
                <p>{postItem.time}</p>
                <p>{postItem.description}</p>

            {user.isSignedIn && (
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(formData => {
                    sendMessage.mutateAsync({
                        message: formData.message,
                        postId: postItem.id,
                    }).then(() => {
                        reset();
                        messageQuery.refetch();
                    });
                })}>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                        <input id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("message", { required: true })} disabled={sendMessage.isLoading}/>
                    </div>
                
                    <br />
                
                    <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" disabled={sendMessage.isLoading}>Create</button>
                </form>
            )}
            </div>
            <div className="container mx-auto">
                <h1 className="text-4xl mt-12">Messages</h1>
                { message.data?.map((message) => (
                    <div key={message.id} className="flex flex-col gap-2">
                        <p>{message.fromUser}</p>
                        <p>{message.message}</p>
                    </div>
                
                    
                ))}
            </div>
            </main>
        </>
    )
}

export default postView;