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
    } = useForm<{ message: string }>()

    const router = useRouter();
    const post = api.post.get.useQuery({
        postId: router.query.id as string,
    }, {
        enabled: !!router.query.id,
    });

    const user = useUser();

    const sendMessage = api.post.sendMessage.useMutation();

    const messageQuery = api.post.getMessage.useQuery({
        postId: router.query.id as string,
    }, {
        enabled: !!router.query.id,
    });

    const postItem = post.data;

    const launchJitsiMeet = () => {
        const jitsiWindow = window.open('', '_blank', 'width=800,height=600');
        if (jitsiWindow) {
            jitsiWindow.document.write('<html><head><title>Jitsi Meet</title></head><body>');
            jitsiWindow.document.write('<div id="jitsi-container"></div>');
            jitsiWindow.document.write('</body></html>');

            const script = jitsiWindow.document.createElement('script');
            script.src = 'https://meet.jit.si/external_api.js';
            script.async = true;
            script.onload = () => {
                new jitsiWindow.JitsiMeetExternalAPI('meet.jit.si', {
                    roomName: postItem.name,
                    parentNode: jitsiWindow.document.getElementById('jitsi-container'),
                    width: '100%',
                    height: '100%',
                });
            };
            jitsiWindow.document.body.appendChild(script);
        }
    };

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
            <main className="flex min-h-screen flex-col gap-12 items-center bg-neutral-200">
            <div className="container mx-auto flex flex-col gap-8">
                <h1 className="text-4xl mt-12 text-black">{postItem.name}</h1>
                <p className="text-black">{postItem.time}</p>
                <p className="text-black">{postItem.description}</p>

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
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-300 dark:text-black">Message</label>
                        <input id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("message", { required: true })} disabled={sendMessage.isLoading}/>
                    </div>

                    <div>
            <label htmlFor="year" className="mb-2 block text-sm font-medium text-black">
            Feedback 
              </label>
              <select id="year" className="block w-full rounded-lg border p-2.5 text-sm border-gray-600 bg-gray-100 text-black placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500">
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select></div>
                
                    <br />
                
                    <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-black dark:hover:bg-blue-500 dark:focus:ring-blue-800" disabled={sendMessage.isLoading}>Create</button>
                </form>
            )}
            </div>
            <div className="container mx-auto">
                <h1 className="text-4xl mt-12 text-black">Messages</h1>
                { message.data?.map((message) => (
                    <div  key={message.id} className="flex flex-col gap-2">
                        <p className="text-black">{message.fromUser}</p>
                        <p className="text-black">{message.message}</p>
                    </div>
                
                    
                ))}
            </div>
            </main>
        </>
    )
}

export default postView;
