import Head from "next/head";
import { useRouter } from 'next/router';
import React, {useEffect} from "react";
import Link from "next/link";

export default function Home(){
    const router = useRouter();
    
    // console.log(router);
    return (
        <div>
            <Head>
                <title>Student Profile</title>
            </Head>
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 to-black">                
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Meeting Hub
                    </span>
                </button>
                <br/>

                <Link href="studentprofile">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Profile
                    </span>
                </button>
                </Link>

                <Link rel="stylesheet" href="chat" >
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-purple-800">  
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Chat
                    </span>
                </button>
                </Link>
                
            </main>
        </div>
    );
}