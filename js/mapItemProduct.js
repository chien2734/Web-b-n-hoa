import { redirect } from "./redirect.js"

export default function mapItemProduct() {
    const list = document.querySelectorAll(".item-redirect")
    for (const item of list) {
        item.onclick = () => {
            redirect({
                name: item.getAttribute('data-name'),
                price: item.getAttribute('data-price'),
                image: item.getAttribute('image'),
            })
        }
    }
}