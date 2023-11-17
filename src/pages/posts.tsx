import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";



const Post: NextPage = () => {
    const createPost = api.post.create.useMutation();

    type Inputs = {
        name: string
        time: string
        description: string
      }

    const {
        register,
        handleSubmit,
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        createPost.mutateAsync(data)
        .then(() => {
            router.push("/")
        })
        .catch((error) => {
            console.log(error)
        })
    }
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

                    <br />

                    <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Create</button>
                </form>
            </div>
        </main>
        </div>
  );
}

export default Post;