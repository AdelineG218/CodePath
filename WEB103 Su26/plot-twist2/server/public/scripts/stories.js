const renderStories = async () => {
    
    const response = await fetch('/stories')
    const data = await response.json()

    const mainContent = document.getElementById('main-content')

    if (data) {

        data.map(story => {
            const card = document.createElement('article')
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
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Stories Available 😞'
        mainContent.appendChild(message)
    }
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
    window.location.href = '../404.html'
}
else {
    renderStories()
}
