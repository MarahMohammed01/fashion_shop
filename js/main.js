
// Fetch header content and insert it into the page
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header_nav').innerHTML = data;

        // Add event listeners after the header content is inserted
        const navList = document.querySelector(".nav-list");
        document.querySelector(".hamburger").onclick = () => {
            navList.classList.add("show");
        };
        document.querySelector(".close").onclick = () => {
            navList.classList.remove("show");
        };
    })
    .catch(error => console.error('Error fetching header:', error));

// Fetch footer content and insert it into the page
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer_info').innerHTML = data;
    })
    .catch(error => console.error('Error fetching header:', error));


