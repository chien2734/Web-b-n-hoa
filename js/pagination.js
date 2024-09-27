import { formatPrice } from "./format.js"
import mapItemProduct from "./mapItemProduct.js"

export default function paginationRedir(data, index, length) {
    const listMainPr = document.querySelectorAll('.main-list')
    let item = ''
    for (let i = 8 * (length - 1); i < 8 * length; i++) {
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
    listMainPr[index].innerHTML = item
    mapItemProduct()
    console.log([listMainPr[index]])
    window.scrollTo(0, listMainPr[index].offsetTop - 230)
}