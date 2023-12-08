import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from '@clerk/clerk-react';
import { api } from "~/utils/api";
import Link from "next/link";

function Card({ post }: { post: Post }) {
    const launchJitsiMeet = () => {
        const jitsiWindow = window.open('', '_blank', 'width=800,height=600');
        if (jitsiWindow) {
            jitsiWindow.document.write('<html><head><title>Jitsi Meet</title></head><body>');
            jitsiWindow.document.write('<div id="jitsi-container"></div>');
            jitsiWindow.document.write('</body></html>');

            // Load the Jitsi Meet API script in the new window
            const script = jitsiWindow.document.createElement('script');
            script.src = 'https://meet.jit.si/external_api.js';
            script.async = true;
            script.onload = () => {
                // Initialize Jitsi Meet API after the script is loaded
                new jitsiWindow.JitsiMeetExternalAPI('meet.jit.si', {
                    roomName: post.name,
                    parentNode: jitsiWindow.document.getElementById('jitsi-container'),
                    width: '100%',
                    height: '100%',
                });
            };
            jitsiWindow.document.body.appendChild(script);
        }
    };

    return (
        <div className="h-60 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <Link href={`/post/${post.id}`} passHref>
                <div className="card-content cursor-pointer">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.name}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{post.time}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
                </div>
            </Link>
            <button onClick={launchJitsiMeet} className="jitsi-meet-button">
                Launch Jitsi Meeting
            </button>
        </div>
    );
}

const PostListings: NextPage = () => {
    const { session } = useSession();
    const postQuery = api.post.post.useQuery();
    const userPosts = postQuery.data?.filter((post) => post.userId === session?.user?.id);

    return (
        <>
            <Head>
                <title>Meetup List</title>
                <meta name="description" content="Meet and Study Here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col gap-12 items-center bg-gradient-to-b from-slate-950 to-black">
                <h1 className="text-4xl mt-12">Tutor Meetups</h1>
                <div className="container grid grid-cols-3 items-center justify-center gap-4">
                    {userPosts?.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default PostListings;
