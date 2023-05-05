export function ViewMenu({ changeView }) {

    return (
        <>
            <span onClick={() => changeView("favorites")}>Favorites</span>
            <span onClick={() => changeView("comments")}>Comments</span>
            <span onClick={() => changeView("bookshelf")}>Bookshelf</span>
            <span onClick={() => changeView("objectives")}>Objectives</span>
            <br />
        </>
    )
}