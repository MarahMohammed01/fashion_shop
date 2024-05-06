window.addEventListener('DOMContentLoaded', async function () {
    var params = new URLSearchParams(window.location.search);
    var data_from_nav = params.get('data');
    let content = document.getElementById('content');
    //console.log(data_from_nav);
    if (data_from_nav == 'categories') {
        let categories_is_hide = this.document.getElementById('categories_is_hide');
        categories_is_hide.style.display = 'block';
        let products = await getProducts();
        products = products.filter((pro) => pro.type === `Men`);
        displayProductItems(products);

    } else if (data_from_nav == 'about') {
        content.innerHTML = setAbout();

    } else if (data_from_nav == 'new_in') {
        content.innerHTML ='ADDING SOON';

    } else if (data_from_nav == 'contact') {
        content.innerHTML = setConcatUs();

    }
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
const ProductsCollection = document.getElementById("products");
/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll(".filters div")];

filters.forEach((item) => {
    filters[2].classList.add('active');
    item.addEventListener("click", async (e) => {
        const type_info = e.target.getAttribute('data-filter');
        const products = await getProducts();

        filters.forEach((div) => {
            div.classList.remove("active");
        });

        e.target.classList.add("active");

        let menuCategory = products.filter((pro) => {
            if (pro.type === type_info) {
                return pro;
            }
        });
        displayProductItems(menuCategory);
    });
});
/* ========== Display Products =========== */
const displayProductItems = (items) => {
    let displayProduct = items.map(
        (ele) => ` 
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
        </div>`  );
    displayProduct = displayProduct.join("");
    ProductsCollection.innerHTML = displayProduct;
    if (displayProduct == "") {
        ProductsCollection.innerText = "NO ITEMS";
    }
};
function setAbout() {
    var content = `
    <div class="about" id="about">
        <div class="bck"></div>
        <div class="container">
            <div class="row">
                <div class="col col-1">
                <div class="logo">
                    <img src="images/logo.png" alt="" srcset="">
                </div>
                    <h3 class="subtitle">Fashion Shop</h3>
                    <p><strong>Description:</strong> Princess is a trendy fashion boutique catering to fashion-forward
                        individuals seeking the latest styles and trends. Located in the heart of the city, our shop
                        offers a curated selection of clothing, accessories, and footwear for both men and women. We
                        pride ourselves on offering high-quality, unique pieces that allow our customers to express
                        their individuality and stand out from the crowd.</p>
                </div>
                <div class="col col-2">
                    <div class="box">
                        <article>
                            <div>
                                <h3>Product Range:</h3>
                                <ol>
                                    <li><strong>Women's Apparel:</strong> From sophisticated dresses for special
                                        occasions to casual tops and jeans for everyday wear, we have a diverse
                                        range of women's clothing to suit every style and occasion.</li>
                                    <li><strong>Men's Apparel:</strong> Our collection of men's clothing includes
                                        everything from tailored suits for formal events to stylish streetwear for a
                                        more casual look.</li>
                                    <li><strong>Accessories:</strong> Complete your outfit with our selection of
                                        accessories, including statement jewelry, scarves, belts, and handbags that
                                        add the perfect finishing touch.</li>
                                    <li><strong>Footwear:</strong> Step out in style with our range of shoes,
                                        including heels, boots, sneakers, and sandals from top brands known for
                                        their quality and comfort.</li>
                                </ol>

                                <p>
                                </p>
                            </div>
                        </article>
                        <article>
                            <div>
                                <h3>Unique Selling Points:</h3>
                                <ul>
                                    <li><strong>Trendy Selection:</strong> We stay ahead of the curve by constantly
                                        updating our inventory with the latest fashion trends and styles.</li>
                                    <li><strong>Personalized Service:</strong> Our knowledgeable staff provide
                                        personalized styling advice and assistance to help customers find the perfect
                                        pieces to suit their individual preferences and body types.</li>
                                    <li><strong>Quality Assurance:</strong> We source our products from reputable
                                        designers and brands known for their quality craftsmanship and materials,
                                        ensuring that our customers receive only the best.</li>
                                    <li><strong>Exclusive Collections:</strong> We collaborate with emerging designers
                                        and artisans to offer exclusive collections that can't be found elsewhere,
                                        giving our customers the opportunity to discover unique, one-of-a-kind pieces.
                                    </li>
                                </ul>
                            </div>
                        </article>
                        <article>
                            <div>
                                <h3>Store Atmosphere:</h3>
                                <p>The store boasts a modern and inviting atmosphere with sleek displays and comfortable
                                    fitting rooms. Our goal is to create a welcoming environment where customers can
                                    enjoy browsing our collections at their leisure and feel inspired to experiment with
                                    different looks.</p>
                            </div>
                        </article>
                        <article>
                            <div>
                                <h3>Online Presence:</h3>
                                <p>In addition to our physical store, we also have an online platform where customers
                                    can shop our full range of products from the comfort of their own homes. Our website
                                    features detailed product descriptions, sizing guides, and style tips to make the
                                    online shopping experience as seamless as possible.</p>

                            </div>
                        </article>
                        <article>
                            <div>
                                <h3>Community Engagement:</h3>
                                <p>We actively engage with our customers through social media channels, hosting events,
                                    and participating in local fashion shows and fundraisers to foster a sense of
                                    community and connection among fashion enthusiasts.</p>
                                <p>Overall, Princess is more than just a fashion shop; it's a destination for
                                    individuals who are passionate about expressing their style and embracing the latest
                                    trends in fashion.</p>
                            </div>
                        </article>

                    </div>
                </div>
            </div>
        </div>
    </div>`;
    return content;
}

function setConcatUs() {
    var item = `
        <div class="ffbox"> 
            <div class="ffbox1"> 
                <h1 class="gfg">Fashion Shop</h1> 
                <h2>Contact Us</h2> 
                <form> 
                    <label for="fullName"> 
                        <i class="fa fa-solid fa-user" 
                            style="margin: 2px;"> 
                        </i> Full Name: 
                    </label> 
                    <input type="text" 
                            id="fullName" 
                            name="fullName" required> 

                    <label for="email"> 
                        <i class="fa fa-solid fa-envelope" 
                            style="margin: 2px;"> 
                        </i> 
                        Email Address: 

                    </label> 
                    <input type="email"
                            id="email" 
                            name="email" required> 

                    <label for="mobile"> 
                        <i class=" fa fa-solid fa-phone" 
                            style="margin: 2px;"> 
                        </i> 
                        Contact No: 
                    </label> 
                    <input type="tel"
                            id="mobile" 
                            name="mobile" required> 

                    <label for="msg"> 
                        <i class=" fa fa-solid fa-comment" 
                            style="margin: 2px;"> 
                        </i> 
                        Write Message: 
                    </label> 
                    <textarea id="msg" 
                                name="msg" 
                                rows="5" required> 
                    </textarea> 

                    <button type="submit"> 
                        Submit 
                    </button> 
                </form> 
            </div> 
            <div class="map-div"> 
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d234021.95947245223!2d58.2597025348899!3d23.583052518620143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ffa8879aafc9%3A0xdb53876d0d79a72c!2sMuscat!5e0!3m2!1sen!2som!4v1713696251050!5m2!1sen!2som" width="300" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div> 
        </div> 
    `;
    return item;
}