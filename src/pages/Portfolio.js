import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './Portfolio.css'
import profileIcon from '../assets/profile-icon.png'

import api from '../services/api'

import ProjectCard from '../components/ProjectCard'

function Portfolio() {
    const [ projects, setProjects ] = useState([])
    const [ user, setUser ] = useState({})

    let { username } = useParams()

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
        <div id="app">

            <header>
                <img id="avatar" alt="profile" src={user.avatar_url || profileIcon} />
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
                <div className="projects">
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
