import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import React, {useEffect} from "react";



export default function meetinghub(){
    return (
        <div>
            <Head>
                <title>Meeting Hub</title>
            </Head>
            <main>
                <h1 className="text-center">Welcome to the Meeting Hub!</h1>
            </main>
        </div>
    )

}