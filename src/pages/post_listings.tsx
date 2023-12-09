import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from '@clerk/clerk-react';
import { api } from "~/utils/api";
import React, { useState, useEffect } from 'react';
import classListData from './classList.json';

function Card({ post }: { post: Post }) {
    return (
        <Link href={`/post/${post.id}`} className="h-60 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.name}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{post.time}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
        </Link>
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
                    {userPosts?.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default PostListings;
