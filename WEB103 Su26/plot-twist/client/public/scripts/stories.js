const renderStories = async () => {
    console.log('Running renderStories....')
    const response = await fetch('/stories')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {
        data.map(story => {
            const card = document.createElement('div')
            card.classList.add('card')

            const cardContainer = document.createElement('div')
            cardContainer.classList.add('card-container')

            const title = document.createElement('h2')
            title.textContent = story.title
            cardContainer.appendChild(title)

            const author = document.createElement('h3')
            author.textContent = story.author
            cardContainer.appendChild(author)

            const genre = document.createElement('p')
            genre.textContent = 'Genre: ' + story.genre
            cardContainer.appendChild(genre)

            const link = document.createElement('a')
            link.textContent = 'Read More >'
            link.setAttribute('role', 'button')
            link.href = `/stories/${story.id}`
            cardContainer.appendChild(link)

            card.appendChild(cardContainer)
            mainContent.appendChild(card)
        })
    } else {
        const message = document.createElement('h2')
        message.textContent = 'No Stories Available 😞'
        mainContent.appendChild(message) 
    }
}

if (document.getElementById('main-content')) {
    renderStories()
}

const renderStory = async () => {
    console.log('Running renderStory....')
    const requestedID = parseInt(window.location.href.split('/').pop())

    const response = await fetch('/stories')
    const data = await response.json()
    
    const storyContent = document.getElementById('story-content')
    let story = data.find(story => story.id === requestedID)

    if (story) {
        document.getElementById('title').textContent = story.title
        document.getElementById('author').textContent = story.author
        document.getElementById('genre').textContent = "Genre: " + story.genre
        document.getElementById('publish-year').textContent = "First Published: " + story.publishYear
        document.getElementById('word-count').textContent = "Word Count: " + story.wordCount.toLocaleString()
    } else if (window.location.href.split('/').pop()) {
        window.location.href = '../404.html'
    } else {
        const message = document.createElement('h2')
        message.textContent = 'No Stories Available 😞'
        storyContent.appendChild(message) 
    }
}

if (document.getElementById('story-content')) {
    renderStory()
}