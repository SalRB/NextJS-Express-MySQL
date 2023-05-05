export function Objectives({ objectives, createObjective, session }) {
    console.log(objectives);
    return (
        <>
            <br />

            {objectives
                ? <>
                    {objectives.map(objective => {
                        return (
                            <div key={objective.objective_year}>
                                {objective.objective_year}
                                <br />
                                {objective.read_books} / {objective.to_read}
                                <br />
                                <br />
                            </div>
                        )
                    })}
                </>
                : <span></span>
            }

            <br />
            <br />
            {createObjective
                ? session?.user
                    ? <>
                        <textarea name="commentForm" id="commentForm" cols="90" rows="7" placeholder="comment"></textarea>
                        <br />
                        <button type="button" onClick={() => { createObjective(document.querySelector('#commentForm').value) }}>Submit</button>
                    </>
                    : <span>Login to be able to comment</span>
                : <></>
            }
        </>
    )
}