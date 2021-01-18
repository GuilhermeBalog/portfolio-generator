import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './_Login.module.css'

function Login(){
    const [username, setUsername] = useState('')
    const router = useRouter()

    function handleSubmit(event){
        event.preventDefault()

        router.push(`/portfolio/${username}`)
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit}>
                <h1>Portfolio Generator</h1>
                <h2>By <a href="https://guilhermebalog.ga">Guilherme Balog</a></h2>
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
