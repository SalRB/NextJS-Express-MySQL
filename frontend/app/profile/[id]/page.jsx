"use client"

import { useState } from "react";
import consume from "../../core/consumer";
import { bookQueries, queryConsumer, userQueries } from "../../core/queries";
import { UserInfo } from "@/app/components/profile/UserInfo";

export default function HomePage() {

    const [profile, setProfile] = useState();
    let id;

    const fetch = async () => {
        setProfile(await consume(queryConsumer.apiUser, userQueries.getUser, id));
    }

    setTimeout(() => {
        try {
            id = window.location.href.split("/")[4];
            if (id && !profile) {
                fetch();
            }
        } catch (e) { }
    }, 0);

    return (
        <>
            {profile
                ? <UserInfo profile={profile[0]} />
                : <>B</>
            }
        </>
    )
}