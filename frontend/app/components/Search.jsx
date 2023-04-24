"use client"

import { useRouter } from "next/navigation";

export function Search({ links }) {
    const router = useRouter();

    async function search(event) {
        event.preventDefault();
        router.push(`/search?q=${document.querySelector('#search').value}`);
    }

    return (
        <form onSubmit={(event) => search(event)}>
            <input type="text" placeholder="search" id="search" />
        </form>
    )
}