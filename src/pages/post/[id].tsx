import { useUser } from "@clerk/nextjs";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { useSession } from '@clerk/clerk-react';

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

    const { session } = useSession();
    const userName = `${session?.user?.firstName} ${session?.user?.lastName}`;
    

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
                    roomName: postItem.name || undefined,
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

    const onSubmit = (formData: { message: string; }) => {
        const userName = session ? `${session.user.firstName} ${session.user.lastName}`.trim() : 'Anonymous';
        sendMessage.mutateAsync({
          message: formData.message,
          postId: postItem.id,
          
        }).then(() => {
          reset();
          messageQuery.refetch();
        });
      };

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

                    <button 
                        onClick={launchJitsiMeet} 
                        className="jitsi-meet-button"
                        style={{ color: 'white' }}
                    >
                        Launch Jitsi Meeting
                    </button>

                    {user.isSignedIn && (
                        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                <input id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("message", { required: true })} disabled={sendMessage.isLoading}/>
                            </div>
                
                            <br />
                
                            <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" disabled={sendMessage.isLoading}>Create</button>
                        </form>
                    )}
                </div>
                <div className="container mx-auto">
                    <h1 className="text-4xl mt-12">Messages</h1>
                    {messageQuery.data?.map((message) => (
                        <div key={message.id} className="flex flex-col gap-2">
                            <p>{message.fromUserName}: {message.message}</p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default postView;
