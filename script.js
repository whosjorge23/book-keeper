const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteElement = document.getElementById('website-name')
const websiteUrlElement = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

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

//Handle Data From form
function storeBookmark(e) {
    e.preventDefault()
    const nameValue = websiteElement.value
    let urlValue = websiteUrlElement.value
    if(!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`
    }
    console.log(nameValue, urlValue)
    if(!validate(nameValue, urlValue)) {
        return false
    }
}

//Event Listeners
bookmarkForm.addEventListener('submit', storeBookmark)