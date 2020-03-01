import React, { useState } from 'react'
import './Login.css'

function Login({ history }){
    const [username, setUsername] = useState('')

    function handleSubmit(event){
        event.preventDefault()

        history.push(`/portfolio/${username}`)
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <h1>Portfolio Generator</h1>
                <h2>By <a href="https://guilhermebalog.github.io">Guilherme Balog</a></h2>
                <input 
                    placeholder="Type your Github username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <button type="submit">Generate Your Portfolio!</button>
            </form>
        </div>
    )
}

export default Login
