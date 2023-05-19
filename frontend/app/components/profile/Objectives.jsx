export function Objectives({ objectives, createObjective, owner }) {
    return (
        <>
            <div className="objectiveContainer">
                <div className="createObjectiveContainer">
                    {createObjective
                        ? owner
                            ? objectives[0]?.objective_year !== new Date().getFullYear()
                                ? <>
                                    <div className="labelContainer">
                                        <label type="number" htmlFor="objectiveForm">Books to read:</label>
                                    </div>
                                    <div className="inputContainer">
                                        <input className="input" type="number" name="objectiveForm" id="objectiveForm" placeholder="number" />
                                    </div>
                                    <div className="buttonContainer">
                                        <button className="button" type="button" onClick={() => { createObjective(document.querySelector('#objectiveForm').value) }}>Submit</button>
                                    </div>

                                </>
                                : <span className="yearWarning">You've already set an objective this year</span>
                            : <></>
                        : <></>
                    }
                </div>
                {objectives
                    ? <>
                        {objectives.map(objective => {
                            return (
                                <div className="objective" key={objective.objective_year}>
                                    <div className="year">
                                        {objective.objective_year}
                                    </div>
                                    <div className="progress">
                                        {objective.read_books} / {objective.to_read}
                                    </div>
                                    <div className="outerBar">
                                        <div className="innerBar" style={{ width: ((objective.read_books / objective.to_read) * 100) + "%" }} />
                                    </div>
                                </div>
                            )
                        })}
                    </>
                    : <span></span>
                }
            </div>
        </>
    )
}