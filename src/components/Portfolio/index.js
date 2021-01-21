import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import styles from './style.module.css'
import ProjectCard from '../ProjectCard'
import api from '../../services/api'

import { basePath } from '../../../next.config'

function Portfolio({ username }) {
    const router = useRouter()

    const [ projects, setProjects ] = useState([])
    const [ user, setUser ] = useState({
        name: 'Loading...'
    })

    useEffect(() => {
        if(!username) router.replace('/')

        loadUser()
        loadProjects()
    }, [])

    async function loadUser(){
        try{
            const response = await api.get(`/users/${username}`)

            setUser(response.data)
        } catch(err){
            alert(`It was not possible to find user ${username}!`)
            router.replace('/')
        }
    }

    async function loadProjects(){
        try{
            const response = await api.get(`/users/${username}/repos?per_page=100&type=all`)

            setProjects(response.data)
        } catch(err){
            alert('It was not possible to find projects!')
        }
    }

    return (
        <div className={styles.app}>
            <Head>
                <title>{user.name || user.login} | Portfolio Generator</title>
            </Head>

            <div>
                <Link href="/">
                    <a>&larr; Go back</a>
                </Link>
            </div>

            <header>
                <img
                    id="avatar"
                    alt="profile"
                    src={user.avatar_url || `${basePath}/profile-icon.png`}
                />
                <div className="title">
                    <h1 id="name">
                        {user.name || user.login}
                    </h1>
                </div>
            </header>

            {user.bio &&
            <section>
                <h3>About me</h3>
                <p id="bio">{user.bio}</p>
            </section>
            }

            {projects.length > 0 &&
            <section>
                <h3>Projects</h3>
                <div className={styles.projects}>
                    {projects.map(project => (
                        !project.fork &&
                        <ProjectCard project={project} key={project.name} />
                    ))}
                </div>
            </section>
            }
        </div>
    )
}

export default Portfolio
