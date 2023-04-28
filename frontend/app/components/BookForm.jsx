export function BookForm({ formData, updateUserEntry, deleteEntry }) {
    return (
        <>
            <select name="state" id="state" defaultValue={formData.state_name} onChange={e => updateUserEntry({ state: e.target.value })}>
                <option value="Reading">Reading</option>
                <option value="Plan to read">Plan to read</option>
                <option value="Completed">Completed</option>
            </select>
            <label htmlFor="review">Score:</label>
            <input type="number" name="review" id="review" defaultValue={formData.review} onBlur={e => updateUserEntry({ review: e.target.value })} />
            <label htmlFor="progress">Read pages:</label>
            <input type="number" name="progress" id="progress" defaultValue={formData.progress} onBlur={e => updateUserEntry({ progress: e.target.value })} />

            <span onClick={() => { deleteEntry() }}>Delete entry</span>
        </>
    )
}