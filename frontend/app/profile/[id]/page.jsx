"use client"

import { useEffect, useState } from "react";
import consume from "../../core/consumer";
import { bookQueries, bookshelfQueries, commentQueries, objectiveQueries, queryConsumer, userQueries } from "../../core/queries";
import { UserInfo } from "@/app/components/profile/UserInfo";
import { ViewMenu } from "@/app/components/profile/ViewMenu";
import { ListBooksProfile } from "@/app/components/profile/ListBooksProfile";
import { Comments } from "@/app/components/Comments";
import { Objectives } from "@/app/components/profile/Objectives";
import { useSession } from "next-auth/react";
import { CommentsProfile } from "@/app/components/profile/CommentsProfile";

export default function ProfilePage() {

    const [profile, setProfile] = useState();
    const [id, setId] = useState();
    const [listData, setListData] = useState();
    const [view, setView] = useState();
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    const fetchProfile = async () => {
        setProfile(await consume(queryConsumer.apiUser, userQueries.getUser, id));
    }

    setTimeout(() => {
        try {
            setId(window.location.href.split("/")[4]);

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

    const createObjective = async (booksToRead) => {
        if (booksToRead.length) {
            const res = await consume(queryConsumer.apiObjective, objectiveQueries.createObjective, { token: session.user.token, data: { to_read: booksToRead } });
            console.log(res);
        }
    }

    return (
        <div className="profileContainer">
            <div className="userInfo">
                {profile?.length == 1
                    ? <UserInfo profile={profile[0]} />
                    : <>Loading...</>
                }
            </div>
            <div className="viewMenu">
                <ViewMenu changeView={changeView} activeView={view} />
            </div>
            <div className="listDataContainer">
                {listData
                    ? view == "comments" || view == "objectives"
                        ? listData && !loading
                            ? view == "comments"
                                ? <CommentsProfile comments={listData} />
                                : <Objectives objectives={listData} createObjective={session.user.data.id ? createObjective : false} owner={session.user.data.id == id} />
                            : <>This user hasn't written any comment yet</>
                        : <div className="listBooksContainer"> <ListBooksProfile listData={listData} activeView={view} /></div>
                    : <>Loading...</>
                }
            </div>
        </div>
    )
}