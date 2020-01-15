const username = prompt("Type your github username")
const containers = {
    name: document.querySelector('#name'),
    avatar: document.querySelector('#avatar'),
    bio: document.querySelector('#bio'),
    projects: document.querySelector('.projects'),
}

function projectCard(name, url, description, languages){
    const projectCard = document.createElement('div')
    projectCard.className = 'project-card'
    projectCard.appendChild(createProjectNameElement(name, url))
    projectCard.appendChild(createProjectDescriptionElement(description))
    projectCard.appendChild(createProjectLanguagesElement(languages))

    return projectCard

    function createProjectNameElement(name, url){
        const link = document.createElement('a')
        link.target = '_blank'
        link.rel = 'noreferer'
        link.innerHTML = name
        link.href = url

        const h4 = document.createElement('h4')
        h4.appendChild(link)

        return h4
    }

    function createProjectDescriptionElement(description){
        const p = document.createElement('p')
        p.className = 'project-description'
        p.innerHTML = description

        return p
    }

    function createProjectLanguagesElement(languages) {
        const p = document.createElement('p')
        p.className = 'project-language'
        p.innerHTML = languages.join(', ')

        return p
    }
}

async function createProjectCardWithRepo(repo){
    const { name, homepage = html_page, description, languages_url } = repo
    const languages = await fetchApiData(languages_url)

    const languagesArray = Object.keys(languages)
    
    return projectCard(name, homepage, description, languagesArray)
}

async function fetchApiData(url) {
    const response = await fetch(url)
    const data = await response.json()

    return data
}

async function fetchGithubApiAndUpdateContent(username){
    const userUrl = `https://api.github.com/users/${username}`
    const { name = login, bio, avatar_url, repos_url } = await fetchApiData(userUrl);

    updateDeveloperName(name)
    updateDeveloperBio(bio)
    updateDeveloperAvatar(avatar_url)
    await updateDeveloperProjects(repos_url)
    
    function updateDeveloperName(name){
        containers.name.innerHTML = name
        containers.name.classList.remove('loading')
        containers.name.classList.remove('loading-dots')
    }
    
    function updateDeveloperBio(bio){
        containers.bio.innerHTML = bio
        containers.bio.classList.remove('loading')
        containers.bio.classList.remove('loading-dots')
    }
    
    function updateDeveloperAvatar(avatar_url){
        containers.avatar.src = avatar_url
    }

    async function updateDeveloperProjects(repos_url){
        const repos = await fetchApiData(repos_url)

        containers.projects.innerHTML = ''
        for(repo of repos){
            const projectCard = await createProjectCardWithRepo(repo)
            containers.projects.appendChild(projectCard)
        }
    }
}
fetchGithubApiAndUpdateContent(username)
