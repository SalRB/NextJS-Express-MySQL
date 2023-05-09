export function Objectives({ objectives, createObjective, owner }) {
    return (
        <>

            {createObjective
                ? owner
                    ? <>
                        <input type="number" name="objectiveForm" id="objectiveForm" placeholder="number of books"></input>
                        <br />
                        <button type="button" onClick={() => { createObjective(document.querySelector('#objectiveForm').value) }}>Submit</button>
                    </>
                    : <></>
                : <></>
            }


            <br />
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
        </>
    )
}