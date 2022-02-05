
const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach(element => element.addEventListener('click', deleteWord))

async function deleteWord() {
    const word = this.parentNode.childNodes[2].innerText
    console.log(word)
    try {
        const res = await fetch('/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(word)
        })
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}