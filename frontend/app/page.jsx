"use client"

import { Test } from "./components/Test"
import { useSession } from "next-auth/react";

import consume from "./core/consumer";

import { queryConsumer, userQueries } from "./core/queries";

export default function HomePage() {

    const { data: session } = useSession();
    console.log(session?.user);

    return (
        <>
            <h1>Esto es el home</h1>
        </>
    )
}