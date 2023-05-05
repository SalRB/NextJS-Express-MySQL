"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Search } from "./search/Search";

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
                                <li><Link href={`/profile/${session.user.data.id}`} className="pointer">{session.user.data.username}</Link></li>
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