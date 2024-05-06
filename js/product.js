/* ========== Products Slider =========== */
const swiper = new Swiper(".mySwiper", {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 70,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
        567: {
            slidesPerView: 2,
        },
        996: {
            slidesPerView: 3,
        },
    },
});

/* ========== Fetch the Products =========== */
const getProducts = async () => {
    try {
        const results = await fetch('./data/products.json');
        const data = await results.json();
        const products = data.products;
        return products;
    } catch (error) {
        console.log(error);
    }
};
const ProductsWrapper = document.getElementById("products");

window.addEventListener('DOMContentLoaded', async function () {
    let products = await getProducts();
    products = products.filter((pro) => pro.category === `Dresses`);
    displayProductItems(products);
    loadData();
});
/* ========== Display Products =========== */
const displayProductItems = (items) => {
    let displayProduct = items.map(
        (product) => ` 
        <div class="swiper-slide">
            <div class="product">
                <div class="top d-flex">
                    <img src= ${product.url} alt="">
                    <div class="icon d-flex">
                    <i class='bx bxs-heart'></i>
                    </div>
                </div>
                <div class="bottom">
                    <h4>${product.title}</h4>
                    <div class="d-flex">
                    <div class="price">${product.price}</div>
                    <div class="rating">
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `  );
    displayProduct = displayProduct.join("");
    ProductsWrapper.innerHTML = displayProduct;
};
/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll(".filters div")];

filters.forEach((item) => {
    filters[2].classList.add('active');
    item.addEventListener("click", async (e) => {
        const category_info = e.target.getAttribute('data-filter');
        const products = await getProducts();

        filters.forEach((div) => {
            div.classList.remove("active");
        });

        e.target.classList.add("active");

        let menuCategory = products.filter((pro) => {
            if (pro.category === category_info) {
                return pro;
            }
        });

        displayProductItems(menuCategory);
        swiper.update();
    });
});
/* ========== Categories Products =========== */
const categoriesProducts = document.querySelector('.categories .products');
const loadMore = document.querySelector('.loadmore');

let current_index = 0,
    maxIndex = 8;

async function loadData() {
    let elements = await getProducts();
    if (current_index >= elements.length) {
        loadMore.disabled = true;
        loadMore.innerText = 'No More Products';
    }
    for (var i = 0; i < maxIndex; i++) {
        const ele = elements[i + current_index];
        categoriesProducts.insertAdjacentHTML(
            'beforeend',
            ` 
            <div class="product">
                <div class="top d-flex">
                    <img src= ${ele.url} alt="">
                    <div class="icon d-flex">
                    <i class='bx bxs-heart'></i>
                    </div>
                </div>
                <div class="bottom">
                    <div class="d-flex">
                    <h4>${ele.title}</h4>
                    <a href="" class="btn cart-btn">Add to Cart</a>
                    </div>
                    <div class="d-flex">
                    <div class="price">${ele.price}</div>
                    <div class="rating">
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                        <i class="bx bxs-star"></i>
                    </div>
                    </div>
                </div>
            </div>`);
    }
    current_index += maxIndex;
}
loadMore.addEventListener('click', loadData)


