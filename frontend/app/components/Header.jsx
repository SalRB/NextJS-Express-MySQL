"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Search } from "./Search";

export function Header({ links }) {
    const { data: session } = useSession();

    return (
        <header>
            <nav>
                <ul>
                    {links.map(({ label, route }) => {
                        return <li key={route}>
                            <Link href={route}>
                                {label}
                            </Link>
                        </li>
                    })}
                    {
                        session?.user
                            ? <>
                                <button onClick={() => signOut()}>Log out</button>
                                <li>{session.user.data.username}</li>
                            </>
                            : <li>
                                <button onClick={() => signIn()}>Login</button>
                            </li>
                    }
                    <Search />
                </ul>
            </nav>
        </header>
    )
}