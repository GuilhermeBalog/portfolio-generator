import React from 'react'
import { formatTitle } from '../../utils/formatTitle'
import style from './style.module.css'

function ProjectCard({ project }){
    return (
        <div className={style["project-card"]}>
            <h4>
                <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {formatTitle(project.name)}
                </a>
            </h4>
            <p className={style["project-description"]}>
                {project.description}
            </p>
            <p className={style["project-language"]}>
                {project.language}
            </p>
        </div>
    )
}

export default ProjectCard
