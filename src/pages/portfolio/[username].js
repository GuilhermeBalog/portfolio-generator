import React, { useState, useEffect } from 'react'

import styles from './_Portfolio.module.css'

import api from '../../services/api'

import ProjectCard from '../../components/ProjectCard'

function Portfolio({ username }) {
    const [ projects, setProjects ] = useState([])
    const [ user, setUser ] = useState({})

    useEffect(() => {
        loadUser()
        loadProjects()

        async function loadUser(){
            const response = await api.get(`/users/${username}`)

            setUser(response.data)
            document.title = response.data.name
        }

        async function loadProjects(){
            const response = await api.get(`/users/${username}/repos`)

            setProjects(response.data)
        }
    }, [username])

    return (
        <div className={styles.app}>

            <header>
                <img id="avatar" alt="profile" src={user.avatar_url || '/profile-icon.png'} />
                <div className="title">
                    <h1 id="name">{user.name || user.login || "John Dev"}</h1>
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

export function getServerSideProps({ params }){
    return { props: { username: params.username} }
}
