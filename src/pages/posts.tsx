import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import React, { useState, useEffect } from 'react';
import classListData from './classList.json';

const Post: NextPage = () => {
    const createPost = api.post.create.useMutation();
    const [prefixes, setPrefixes] = useState<string[]>([]);
    const [selectedPrefix, setSelectedPrefix] = useState<string>('');
    const [codes, setCodes] = useState<string[]>([]);
    const [selectedCode, setSelectedCode] = useState<string>('');

    useEffect(() => {
        const uniquePrefixes = [...new Set(classListData.map(item => item.Prefix))];
        setPrefixes(uniquePrefixes);
    }, []);

    useEffect(() => {
        if (selectedPrefix) {
            const codesForPrefix = classListData
                .filter(item => item.Prefix === selectedPrefix)
                .map(item => item.Code.toString());
            setCodes(codesForPrefix);
        } else {
            setCodes([]);
        }
    }, [selectedPrefix]);

    type Inputs = {
        name: string;
        time: string;
        location: string;
        description: string;
    };

    const { register, handleSubmit, setValue } = useForm<Inputs>();

    useEffect(() => {
        const className = selectedPrefix && selectedCode ? `${selectedPrefix}-${selectedCode}` : '';
        setValue('name', className); // Setting the concatenated class name as the 'name' field
    }, [selectedPrefix, selectedCode, setValue]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form Data:", data);
        createPost.mutateAsync(data)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="home-page">
            <Head>
                <title>Create Meetup</title>
                <meta name="description" content="Create a meetup" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 to-black">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <h1>Create a Meetup</h1>
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                            <label htmlFor="prefix" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Prefix</label>
                            <select id="prefix" onChange={(e) => setSelectedPrefix(e.target.value)}>
                                <option value="">Select a Prefix</option>
                                {prefixes.map((prefix) => (
                                    <option key={prefix} value={prefix}>{prefix}</option>
                                ))}
                            </select>
                        </div>

                        {selectedPrefix && (
                            <div>
                                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Code</label>
                                <select id="code" onChange={(e) => setSelectedCode(e.target.value)}>
                                    <option value="">Select a Code</option>
                                    {codes.map((code) => (
                                        <option key={code} value={code}>{code}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Add a hidden input to store the className*/}
                        <input type="hidden" {...register('name')} />

                        {/* Time Input */}
                        <div>
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                            <input id="time" {...register("time", { required: true })} className="input-field" />
                        </div>

                        {/* Location Input */}
                        <div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                            <input id="location" {...register("location", { required: true })} className="input-field" />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" {...register("description", { required: true })} className="input-field" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-button">Create</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Post;