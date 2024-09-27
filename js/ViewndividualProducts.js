import { formatPrice } from "./format.js";

const listPr = JSON.parse(localStorage.getItem('data'))
const dataArr = []
dataArr.push(...listPr.hoabo)
dataArr.push(...listPr.binhhoa)
dataArr.push(...listPr.giohoa)

let current = 0
let later = 1

const link = document.getElementById('main-nav-ViewndividualProducts')
link.onclick = (e) => {
    showProduct(dataArr[current])
}

function showProduct(data) {
    const content = document.getElementById("main-content")
    const html = `<div class="product-detail">
        <div class="product-detail-content">
            <div class="product-detail-img">
                <img src="${data.image}" alt="${data.name}" />
            </div>
            <div class="product-detail-info">
                <h3>${data.name}</h3>
                <p class="product-detail-info-price">${formatPrice(data.price, 'đ')}</p>
                <p>Tình trạng 1 - 2 ngày</p>
                <p class="product-detail-info-desc">Giá hoa chưa gồm thuế.</p>
                <p class="product-detail-info-desc">Sản phẩm thực tế có thể sẽ khác đôi chút so với hình ảnh mẫu do đặc tính bó hoa thủ công và sử dụng các loại hoa theo mùa.</p>
                <div class="product-detail-add">
                    <div class="product-detail-quantity">
                        <button id="product-detail-quantity-add">+</button>
                        <p id="product-detail-quantity-quan">1</p>
                        <button id="product-detail-quantity-sub">-</button>
                    </div>
                    <button class="product-detail-btnAdd">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <div class="product-detail-next">
                <button title="Tiếp theo">
                    <i class="fa-solid fa-circle-arrow-right"></i>
                </button>
            </div>
        </div>
        
    </div>`
    content.innerHTML = html;
    const btnAdd = document.getElementById("product-detail-quantity-add")
    const btnSub = document.getElementById("product-detail-quantity-sub")
    const quantity = document.getElementById("product-detail-quantity-quan")
    const btnAddCart = document.querySelector(".product-detail-btnAdd")
    const btnNext = document.querySelector(".product-detail-next>button")

    btnNext.onclick = (e) => {
        current = later
        if (current < dataArr.length) {
            showProduct(dataArr[current])
            if (current === dataArr.length - 1) {
                later = 0
            }
            else {
                later++
            }
        }
    }

    btnAdd.onclick = (e) => handlerQuantityProduct('+', quantity);
    btnSub.onclick = (e) => handlerQuantityProduct('-', quantity);
    btnAddCart.onclick = (e) => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            let listCart = JSON.parse(localStorage.getItem('listCart-' + user.account))
            data.length = parseInt(quantity.textContent)
            if (listCart) {
                let check = true
                for (let x of listCart) {
                    if (x.name === data.name) {
                        x.length += data.length
                        check = false
                        break
                    }
                }
                if (check) {
                    listCart.push(data)
                }
            }
            else {
                listCart = [data]
            }
            localStorage.setItem('listCart-' + user.account, JSON.stringify(listCart))
            const toastContent = document.getElementById('toast')
            toastContent.innerHTML = `<div  class="toast-content"><i style="color: #30d158;" class="fa-solid fa-circle-check"></i><p>Thêm ${data.name} thành công</p></div>`
            setTimeout(() => {
                toastContent.classList.remove('show')
            }, 3000)
            toastContent.classList.add('show')
        }
        else {
            const modalLogin = document.getElementById('modal-login')
            modalLogin.style.display = 'flex'
        }
    }
}

