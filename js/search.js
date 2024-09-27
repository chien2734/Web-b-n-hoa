import { renderWithFilter } from "./filter.js";

const searchForm = document.getElementById('search_form')

searchForm.onsubmit = (e) => {
    e.preventDefault()
    const input = document.querySelector('#search_form input')
    const dataIng = JSON.parse(localStorage.getItem('data-ing'))
    const data = JSON.parse(localStorage.getItem('data'))
    const dbSearch = []
    if (dataIng) {
        const length = dataIng.length
        for (let i = 0; i < length; i++) {
            if (dataIng[i].name.toLocaleLowerCase().indexOf(input.value.trim().toLocaleLowerCase()) !== -1) {
                dbSearch.push(dataIng[i])
            }
        }
    }
    else if (data) {
        if (data.hoabo) {
            for (let x of data.hoabo) {
                if (x.name.toLocaleLowerCase().indexOf(input.value.trim().toLocaleLowerCase()) !== -1) {
                    dbSearch.push(x)
                }
            }
        }
        if (data.binhhoa) {

            for (let x of data.binhhoa) {
                if (x.name.toLocaleLowerCase().indexOf(input.value.trim().toLocaleLowerCase()) !== -1) {
                    dbSearch.push(x)
                }
            }
        }
        if (data.giohoa) {

            for (let x of data.giohoa) {
                if (x.name.toLocaleLowerCase().indexOf(input.value.toLocaleLowerCase()) !== -1) {
                    dbSearch.push(x)
                }
            }
        }
    }
    renderWithFilter(dbSearch)
    localStorage.removeItem('data-ing')
}

