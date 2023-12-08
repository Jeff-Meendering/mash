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
            <title>Meetups</title>
            <meta name="description" content="Meet and Study Here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 to-black">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1>Meetup</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Name</label>
                        <input id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("name", { required: true })}/>
                    </div>

                    <br />

                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                        <input id="time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("time", { required: true })}/>
                    </div>

                    <br />

                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("description", { required: true })}/>
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