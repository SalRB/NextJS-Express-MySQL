export function UserInfo({ profile }) {
    return (
        <>
            <img src={profile.pfp} width={30} />
            <br />
            {profile.username}
            <br />
            {profile.bio}
            <br />
            <br />
        </>
    )
}