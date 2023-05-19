"use client"

import { Test } from "./components/Test"
import { useSession } from "next-auth/react";

import consume from "./core/consumer";

import { queryConsumer, userQueries } from "./core/queries";
import { useRouter } from "next/navigation";


export default function HomePage() {
    const router = useRouter();

    return (
        <>
            <div className="homeText">
                Try searching for some books
            </div>
        </>
    )
}