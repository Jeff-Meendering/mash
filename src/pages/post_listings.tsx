import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from '@clerk/clerk-react';
import { api } from "~/utils/api";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import classListData from './classList.json';

function Card({ post }: { post: Post }) {
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
                    roomName: post.name || undefined,
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
            <button 
                onClick={launchJitsiMeet} 
                className="jitsi-meet-button"
                style={{ color: 'white' }}
            >
                Launch Jitsi Meeting
            </button>
        </div>
    );
}

const PostListings: NextPage = () => {
    const { data: posts, isLoading, isError } = api.post.post.useQuery();
    const [selectedPrefix, setSelectedPrefix] = useState<string>('');
    const [selectedCode, setSelectedCode] = useState<string>('');
    const [prefixes, setPrefixes] = useState<string[]>([]);
    const [codes, setCodes] = useState<string[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
        setPrefixes([...new Set(classListData.map(item => item.Prefix))]);
    }, []);

    useEffect(() => {
        if (selectedPrefix) {
            setCodes(classListData.filter(item => item.Prefix === selectedPrefix).map(item => item.Code.toString()));
        } else {
            setCodes([]);
        }
    }, [selectedPrefix]);

    useEffect(() => {
        if (!isLoading && posts) {
            if (selectedPrefix && selectedCode) {
                const className = `${selectedPrefix}-${selectedCode}`;
                setFilteredPosts(posts.filter(post => post.name === className));
            } else {
                setFilteredPosts(posts);
            }
        }
    }, [selectedPrefix, selectedCode, posts, isLoading]);

    if (isError) return <div>Failed to load posts.</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>Meetup List</title>
                <meta name="description" content="Meet and Study Here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col gap-12 items-center bg-gradient-to-b from-slate-950 to-black">
                <h1 className="text-4xl mt-12">Tutor Meetups</h1>
                <div>
                    <label htmlFor="prefix">Class Prefix    </label>
                    <select id="prefix" onChange={(e) => setSelectedPrefix(e.target.value)}>
                        <option value="">Select a Prefix</option>
                        {prefixes.map((prefix) => (
                            <option key={prefix} value={prefix}>{prefix}</option>
                        ))}
                    </select>
                </div>

                {selectedPrefix && (
                    <div>
                        <label htmlFor="code">Class Code    </label>
                        <select id="code" onChange={(e) => setSelectedCode(e.target.value)}>
                            <option value="">Select a Code</option>
                            {codes.map((code) => (
                                <option key={code} value={code}>{code}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="container grid grid-cols-3 items-center justify-center gap-4">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default PostListings;
