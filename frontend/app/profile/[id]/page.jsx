"use client"

import { useEffect, useState } from "react";
import consume from "../../core/consumer";
import { bookQueries, bookshelfQueries, commentQueries, objectiveQueries, queryConsumer, userQueries } from "../../core/queries";
import { UserInfo } from "@/app/components/profile/UserInfo";
import { ViewMenu } from "@/app/components/profile/ViewMenu";
import { ListBooksProfile } from "@/app/components/profile/ListBooksProfile";
import { Comments } from "@/app/components/Comments";
import { Objectives } from "@/app/components/profile/Objectives";

export default function ProfilePage() {

    const [profile, setProfile] = useState();
    const [listData, setListData] = useState();
    const [view, setView] = useState();
    const [loading, setLoading] = useState(true);

    let id;

    const fetchProfile = async () => {
        console.log();
        setProfile(await consume(queryConsumer.apiUser, userQueries.getUser, id));
    }

    setTimeout(() => {
        try {
            id = window.location.href.split("/")[4];
            if (id && !profile) fetchProfile();
            if (id && !listData && !view) changeView("favorites");
        } catch (e) { }
    }, 0);


    const changeView = async (newView, filter = { state: "Plan to read" }) => {
        setView(newView);
        setListData(null);
        switch (newView) {
            case "favorites":
                setListData(await consume(queryConsumer.apiBookshelf, bookshelfQueries.getUserFavorites, id));
                setLoading(false)
                break;
            case "comments":
                setListData(await consume(queryConsumer.apiComment, commentQueries.getUserComments, id));
                setLoading(false)
                break;
            case "bookshelf":
                setListData(await consume(queryConsumer.apiBookshelf, bookshelfQueries.getUserEntries, { user: id, ...filter }));
                setLoading(false)
                break;
            case "objectives":
                setListData(await consume(queryConsumer.apiObjective, objectiveQueries.getUserObjectives, id));
                setLoading(false)
                break;
            default:
                break;
        }
    }




    return (
        <>
            {profile?.length == 1
                ? <UserInfo profile={profile[0]} />
                : <>Loading...</>
            }
            <ViewMenu changeView={changeView}></ViewMenu>
            {listData
                ? view == "comments" || view == "objectives"
                    ? listData && !loading
                        ? view == "comments"
                            ? <Comments comments={listData} />
                            : <Objectives objectives={listData} />
                        : <>This user hasn't written any comment yet</>
                    : <ListBooksProfile listData={listData} />
                : <>Loading...</>
            }
        </>
    )
}