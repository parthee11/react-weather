import React from 'react'

export default function LocInput({state, dispatch}) {
    return (
        <div className="pop-up">
            <form onSubmit={(e) => {
                e.preventDefault()
                dispatch({type: 'update_location', payLoad: state.location})}
            }>
                <div className="input-field">
                    <input type="text" value={state.location} onChange={(e) => dispatch({type: 'update_location', payLoad: e.target.value})} />
                </div>
                <button type="submit">Get Weather</button>
            </form>
        </div>
    )
}
