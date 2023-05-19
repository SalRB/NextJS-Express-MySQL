export function ViewMenu({ changeView, activeView }) {

    return (
        <>
            <span className={activeView == "favorites" ? "active" : ""} onClick={() => changeView("favorites")}>Favorites</span>
            <span className={activeView == "comments" ? "active" : ""} onClick={() => changeView("comments")}>Comments</span>
            <span className={activeView == "bookshelf" ? "active" : ""} onClick={() => changeView("bookshelf")}>Bookshelf</span>
            <span className={activeView == "objectives" ? "active" : ""} onClick={() => changeView("objectives")}>Objectives</span>
        </>
    )
}