import { formatPrice } from "./format.js";

export function handlerQuantityProduct(option, quantity) {
    if (option === '+') {
        quantity.innerText = parseInt(quantity.textContent) + 1
    }
    else if (parseInt(quantity.textContent) > 1)
        quantity.innerText = parseInt(quantity.textContent) - 1
}

export function redirect(data) {
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
        </div>
        
    </div>`
    content.innerHTML = html;
    const btnAdd = document.getElementById("product-detail-quantity-add")
    const btnSub = document.getElementById("product-detail-quantity-sub")
    const quantity = document.getElementById("product-detail-quantity-quan")
    const btnAddCart = document.querySelector(".product-detail-btnAdd")


    btnAdd.onclick = (e) => handlerQuantityProduct('+', quantity);
    btnSub.onclick = (e) => handlerQuantityProduct('-', quantity);
    window.scrollTo(top)
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
