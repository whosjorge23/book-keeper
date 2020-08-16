const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteElement = document.getElementById('website-name')
const websiteUrlElement = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = {}

//Show Modal, Focus On Input
function showModal() {
    modal.classList.add('show-modal')
    websiteElement.focus()
}

//Modal Event Listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => {modal.classList.remove('show-modal')})
window.addEventListener('click', (e) => {e.target === modal ? modal.classList.remove('show-modal') : false})

//Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression)
    if(!nameValue || !urlValue) {
        alert('Please submit valid values for both name and url')
        return false
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid URL')
        return false
    }
    //Valid Data
    return true
}

//Build Bookmarks DOM
function buildBookmarks() {
    //Remove All Bookmarks Elements
    bookmarksContainer.textContent = ''
    //Build Items
    Object.keys(bookmarks).forEach((id) => {

		const { name, url } = bookmarks[id]

		// Item
		const item = document.createElement('div')
		item.classList.add('item')
		// Close Icon
		const closeIcon = document.createElement('i')
		closeIcon.classList.add('fas', 'fa-times')
		closeIcon.setAttribute('title', 'Delete Bookmark')
		closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`)
		// Favicon / Link Container
		const linkInfo = document.createElement('div')
		linkInfo.classList.add('name')
		// Favicon
		const favicon = document.createElement('img')
		favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
		favicon.setAttribute('alt', 'Favicon')
		// Link
		const link = document.createElement('a')
		link.setAttribute('href', `${url}`)
		link.setAttribute('target', '_blank')
		link.textContent = name
		// Append to bookmarks container
		linkInfo.append(favicon, link)
		item.append(closeIcon, linkInfo)
		bookmarksContainer.appendChild(item)
	})
}

//Fetch Bookmarks From Local Storage
function fetchBookmarks() {
    //Get Bookmarks From Local Storage If Available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }else {
        //Create Bookmars Object In Local Storage
        const id = `http://westcostyle.com`

		bookmarks[id] = {
			name: 'westcostyle',
			url: 'http://westcostyle.com',
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks()
}

//Delete Bookmarks
function deleteBookmark(id) {
    // Loop through the bookmarks array
    if (bookmarks[id]) {
		delete bookmarks[id]
    }
    
    //Update Bookmarks Array in Local Storage, Re-Populate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
}

//Handle Data From form
function storeBookmark(e) {
    e.preventDefault()
    const nameValue = websiteElement.value
    let urlValue = websiteUrlElement.value
    if(!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`
    }
    //console.log(nameValue, urlValue)
    if(!validate(nameValue, urlValue)) {
        return false
    }
    const bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookmarks[urlValue] = bookmark
    console.log(bookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset()
    websiteElement.focus()
}

//Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark)

//Onload Fetch Bookmarks
fetchBookmarks()