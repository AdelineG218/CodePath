const renderStory = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/stories')
    const data = await response.json()

    const storyContent = document.getElementById('story-content')
    let story

    if (data) {
        story = data.find(story => story.id === requestedID)
    }

    if (story) {
        document.getElementById('title').textContent = story.title
        document.getElementById('author').textContent = story.author
        document.getElementById('genre').textContent = "Genre: " + story.genre
        document.getElementById('publish-year').textContent = "First Published: " + story.publishYear
        document.getElementById('word-count').textContent = "Word Count: " + story.wordCount.toLocaleString()
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Details Available 😞'
        storyContent.appendChild(message)
    }
}

renderStory()
