const accessKey = "4eMMZY3vYTVqftjjEMrytjVOXfQ7uHzew1fEv6ESoj0";
const search_form = document.getElementById("searchform");
const box = document.getElementById("search");
const searchresult = document.getElementById("search_result");
const showmore = document.getElementById("show_more_btn");
let keyword = "";
let page = 1;

async function showimage() {
    keyword = box.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if(page==1)
    {
        searchresult.innerHTML="";
    }

    // Fix: access 'data.results' instead of 'data.result'
    const results = data.results;

    // Clear previous results before appending new ones
    searchresult.innerHTML = "";

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imagelink = document.createElement("a");
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.appendChild(image);

        searchresult.appendChild(imagelink);
    });
    showmore.style.display="block";
}

// Event listener for form submission
search_form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    showimage();
});
showmore.addEventListener("click",()=>
{
 page++;
 showimage();
}) 