'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import { Search } from '../search/Search';
import Link from 'next/link';
// import { AppHeader } from './AppHeader'

export const AppHeader = ({ children }) => {

    const { data: session } = useSession();
    return <>

        <header >
            <div className='appTitle'>
                <img src="/logo.png" alt="logo" />
                <span>ReadItAll</span>
            </div>
            <div className='search'>
                <Search />
            </div>
            <div className='profile'>{
                session?.user
                    ? <span>
                        <div className='headerProfileContainer'>
                            <div>
                                <Link href={`/profile/${session.user.data.id}`} className="pointer textAsButton">Profile</Link>
                            </div>
                            <div>
                                <img src={session.user.data.pfp} alt="" />
                            </div>
                        </div>
                        <div onClick={() => signOut()} className='pointer textAsButton logOutButton'>Log out</div>
                    </span>
                    : <div className='buttonContainer'>
                        <button className='button' onClick={() => signIn()}>Login</button>
                    </div>
            }</div>


        </header>




    </>

}