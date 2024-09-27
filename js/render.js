import { formatPrice } from "./format.js";
import jsondb from "./json.js";
import { redirect } from "./redirect.js";
import paginationRedir from "./pagination.js";

let json = jsondb();

let paginationIndex = 0

function render() {
    const mainContent = document.getElementById('main-content')

    if (localStorage.getItem('data')) {
        json = JSON.parse(localStorage.getItem('data'))
    }
    else {
        localStorage.setItem('data', JSON.stringify(json))
    }
    let html = getDataFlower('hoabo', 'Hoa bó')
    mainContent.innerHTML = html
    html += getDataFlower('binhhoa', 'Bình Hoa')
    mainContent.innerHTML = html
    html += getDataFlower('giohoa', 'Giỏ Hoa')
    mainContent.innerHTML = html
    mapItemProduct()
}

function mapItemProduct() {
    const list = document.querySelectorAll(".item-redirect")
    for (const item of list) {
        item.onclick = () => {
            redirect({
                name: item.getAttribute('data-name'),
                price: item.getAttribute('data-price'),
                dir: item.getAttribute('data-dir'),
                image: item.getAttribute('image'),
            })
        }
    }
}

function getDataFlower(dir, header) {
    let html = `<div class="main-item"><h2>${header}</h2>`
    let item = ''
    const length = json[dir].length
    for (let i = 0; i < 8; i++) {
        if (json[dir][i]) {
            item += `
            <li>
                <div class="item-redirect" data-name="${json[dir][i].name}" data-dir="${dir}" image="${json[dir][i].image}"  data-price="${json[dir][i].price}">
                    <img src="${json[dir][i].image}" alt="hinh"/>
                    <h3>${json[dir][i].name}</h3>
                    <p>${formatPrice(json[dir][i].price, 'đ')}</p>
                </div>
            </li>`
        }
    }
    html += '<ul class="main-list">' + item + '</ul></div>'
    html += `
        <div class="main-pagination">
            <ul class="pagination-list">`

    for (let i = 1; i <= Math.ceil(length / 8); i++) {
        html += `<li dir-data="${dir}" index="${paginationIndex}">${i}</li>`
    }
    paginationIndex++
    html += `</ul>
            </div>`

    return html
}



render()
localStorage.removeItem('data-ing')

const paginationList = document.querySelectorAll('.pagination-list>li')
for (let x of paginationList) {
    x.onclick = (e) => {
        const item = e.target
        paginationRedir(json[item.getAttribute('dir-data')], parseInt(item.getAttribute('index')), parseInt(item.textContent))
    }
}
