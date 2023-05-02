export function UserInfo({ profile }) {
    console.log(profile);
    return (
        <>
            <img src={profile.pfp} width={30} />
            <br />
            {profile.bio}
            <br />
            {profile.username}
        </>
    )
}