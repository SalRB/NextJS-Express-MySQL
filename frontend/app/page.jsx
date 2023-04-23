"use client"

import { Test } from "./components/Test"
import { useSession } from "next-auth/react";

import consume from "./core/consumer";

import { queryConsumer, userQueries } from "./core/queries";

export default function HomePage() {
    let books;

    const fetch = async () => {
        books = await consume(queryConsumer.apiUser, userQueries.testUsers, { token: session?.user.token });
        console.log(books);
    }

    const { data: session } = useSession();
    console.log(session?.user);


    if (!books && session?.user) {
        fetch();
    }


    return (
        <>
            <h1>Esto es el home</h1>

            {/* {books
                ? <Test data={books} />
                : <></>
            } */}


        </>
    )
}