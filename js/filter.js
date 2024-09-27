import { formatPrice } from "./format.js"
import mapItemProduct from "./mapItemProduct.js"
import paginationRedir from "./pagination.js"

const typeFlower = document.getElementById('typeFlower_filter')
const typeFlowerList = document.querySelectorAll('#typeFlower_filter>li')
const textTypeFlower = document.querySelector('#typeFlower_filter_li>span')

const priceFlower = document.getElementById('priceFlower_filter')
const priceFlowerList = document.querySelectorAll('#priceFlower_filter>li')
const textPriceFlower = document.querySelector('#priceFlower_filter_li>span')

const data = JSON.parse(localStorage.getItem('data'))

const option = {
    price: '',
    typeData: '',
}

for (let x of typeFlowerList) {
    x.onclick = (e) => {
        let item = e.target
        while (!item.getAttribute('typeFlower')) {
            item = item.parentElement
        }
        const event = {
            typeFlower: item.getAttribute('typeFlower'),
            typeData: item.getAttribute('typeData')
        }
        handlerShowListTypeFlower(event)
    }
}

for (let x of priceFlowerList) {
    x.onclick = (e) => {
        let item = e.target
        while (!item.getAttribute('textPrice')) {
            item = item.parentElement
        }
        const event = {
            textPrice: item.getAttribute('textPrice'),
            price: item.getAttribute('price')
        }
        handlerShowListPriceFlower(event)
    }
}

function handlerShowListTypeFlower(event) {
    if (event.typeFlower !== 'first_li') {
        textTypeFlower.textContent = event.typeFlower
        option.typeData = event.typeData
        handlerRenderTypeData(option)
    }
    typeFlower.classList.toggle('open')

}

function handlerShowListPriceFlower(event) {
    if (event.textPrice !== 'first_li') {
        textPriceFlower.textContent = event.textPrice
        option.price = event.price
        handlerRenderPrice(option)
    }
    priceFlower.classList.toggle('open')
}

function handlerRenderTypeData(option) {
    const listPr = []
    if (!option.price) {
        for (let x of data[option.typeData]) {
            listPr.push(x);
        }
    }
    else {
        switch (option.price) {
            case '>6':
                for (let x of data[option.typeData]) {
                    if (x.price > 6000000)
                        listPr.push(x)
                }
                break

            case '4-6':
                for (let x of data[option.typeData]) {
                    if (x.price > 4000000 && x.price <= 6000000)
                        listPr.push(x)
                }
                break
            case '2-4':
                for (let x of data[option.typeData]) {
                    if (x.price > 2000000 && x.price <= 4000000)
                        listPr.push(x)
                }
                break

            case '<2':
                for (let x of data[option.typeData]) {
                    if (x.price <= 2000000)
                        listPr.push(x)
                }
                break
            default:
                showErrorToast('Đã có lỗi xảy ra!')
        }
    }
    renderWithFilter(listPr)
}

function handlerRenderPrice(option) {
    const listPr = []
    if (!option.typeData) {
        switch (option.price) {
            case '>6':
                for (let x of data.hoabo) {
                    if (x.price > 6000000)
                        listPr.push(x)
                }
                for (let x of data.binhhoa) {
                    if (x.price > 6000000)
                        listPr.push(x)
                }
                for (let x of data.giohoa) {
                    if (x.price > 6000000)
                        listPr.push(x)
                }
                break

            case '4-6':
                for (let x of data.hoabo) {
                    if (x.price > 4000000 && x.price <= 6000000)
                        listPr.push(x)
                }
                for (let x of data.binhhoa) {
                    if (x.price > 4000000 && x.price <= 6000000)
                        listPr.push(x)
                }
                for (let x of data.giohoa) {
                    if (x.price > 4000000 && x.price <= 6000000)
                        listPr.push(x)
                }
                break
            case '2-4':
                for (let x of data.hoabo) {
                    if (x.price > 2000000 && x.price <= 4000000)
                        listPr.push(x)
                }
                for (let x of data.binhhoa) {
                    if (x.price > 2000000 && x.price <= 4000000)
                        listPr.push(x)
                }
                for (let x of data.giohoa) {
                    if (x.price > 2000000 && x.price <= 4000000)
                        listPr.push(x)
                }
                break

            case '<2':
                for (let x of data.hoabo) {
                    if (x.price <= 2000000)
                        listPr.push(x)
                }
                for (let x of data.binhhoa) {
                    if (x.price <= 2000000)
                        listPr.push(x)
                }
                for (let x of data.giohoa) {
                    if (x.price <= 2000000)
                        listPr.push(x)
                }
                break
            default:
                showErrorToast('Đã có lỗi xảy ra!')
        }
    }
    else {
        switch (option.price) {
            case '>6':
                for (let x of data[option.typeData]) {
                    if (x.price > 6000000)
                        listPr.push(x)
                }
                break

            case '4-6':
                for (let x of data[option.typeData]) {
                    if (x.price > 4000000 && x.price <= 6000000)
                        listPr.push(x)
                }
                break
            case '2-4':
                for (let x of data[option.typeData]) {
                    if (x.price > 2000000 && x.price <= 4000000)
                        listPr.push(x)
                }
                break

            case '<2':
                for (let x of data[option.typeData]) {
                    if (x.price <= 2000000)
                        listPr.push(x)
                }
                break
            default:
                showErrorToast('Đã có lỗi xảy ra!')
        }
    }
    renderWithFilter(listPr)
}

export function renderWithFilter(data) {

    const mainContent = document.getElementById('main-content')
    if (!data[0]) {
        mainContent.innerHTML = `<p style="padding-bottom: 40px; text-align: center;">Không có sản phẩm phù hợp với bộ lọc</p>`
        return
    }
    let html = ''
    let item = ''
    const length = data.length
    for (let i = 0; i < 8; i++) {
        if (data[i]) {
            item += `
                    <li>
                        <div class="item-redirect" data-name="${data[i].name}" image="${data[i].image}"  data-price="${data[i].price}">
                            <img src="${data[i].image}" alt="hinh"/>
                            <h3>${data[i].name}</h3>
                            <p>${formatPrice(data[i].price, 'đ')}</p>
                        </div>
                    </li>`
        }
    }
    html += '<ul class="main-list">' + item + '</ul>'
    html += `
        <div class="main-pagination">
            <ul class="pagination-list">`
    for (let i = 1; i <= Math.ceil(length / 8); i++) {
        html += `<li index="0">${i}</li>`
    }
    html += `</ul>
            </div>`
    mainContent.innerHTML = html
    localStorage.setItem('data-ing', JSON.stringify(data))
    mapItemProduct()
    window.scrollTo(top)
    const paginationList = document.querySelectorAll('.pagination-list>li')
    for (let x of paginationList) {
        x.onclick = (e) => {
            const item = e.target
            paginationRedir(data, parseInt(item.getAttribute('index')), parseInt(item.textContent))
        }
    }
}

