export function UserInfo({ profile }) {
    return (
        <>
            <div className="username">
                {profile.username}
            </div>
            <div>
                <img src={profile.pfp} width={30} />
            </div>
            <div className="bio">
                {profile.bio}
            </div>
        </>
    )
}