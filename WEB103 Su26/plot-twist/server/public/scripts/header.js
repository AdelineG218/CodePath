// header
const header = document.querySelector('header')

// header container
const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

// header left
const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'

const headerLogo = document.createElement('img')
headerLogo.src = '/logo.png'

const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Plot Twist'

headerLeft.appendChild(headerLogo)
headerLeft.appendChild(headerTitle)

// header right
const headerRight = document.createElement('div')
headerRight.className = 'header-right'

// home button
const headerButton = document.createElement('button')
headerButton.textContent = 'Home'
    
headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

headerRight.appendChild(headerButton)

headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)

header.appendChild(headerContainer)