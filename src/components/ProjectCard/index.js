import React from 'react'
import './style.css'

function ProjectCard({ project }){
    function snakeToCapitalize(text){
        const alwaysLowerWords = ['a', 'of', 'de', 'da', 'do', 'dos', 'das']

        const words = text.split('-')
        const capitalizedWords = words.map(word => {

            if(alwaysLowerWords.includes(word)){
                return word
            }

            const firstLetter = word.charAt(0)
            
            const wordWithoutFirstLetter = word.slice(1)
    
            const capitalizedWord = firstLetter.toLocaleUpperCase().concat(wordWithoutFirstLetter)
    
            return capitalizedWord
        })
        
        return capitalizedWords.join(' ')
    }

    return (
        <div className="project-card">
            <h4><a href={project.html_url} target="_blank" rel="noopener noreferrer">{snakeToCapitalize(project.name)}</a></h4>
            <p className="project-description">{project.description}</p>
            <p className="project-language">{project.language}</p>
        </div>
    )
}

export default ProjectCard