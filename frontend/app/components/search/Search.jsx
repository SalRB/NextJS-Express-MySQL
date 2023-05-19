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
            <input className="text-input" type="text" placeholder="Search" id="search" />
            <img className="loupeSearch" src="/loupe.png" alt="" />
        </form>
    )
}