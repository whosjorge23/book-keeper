const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteElement = document.getElementById('website-name')
const websiteUrl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

//Show Modal, Focus On Input
function showModal() {
    modal.classList.add('show-modal')
    websiteElement.focus()
}

//Event Listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => {modal.classList.remove('show-modal')})
window.addEventListener('click', (e) => {e.target === modal ? modal.classList.remove('show-modal') : false})