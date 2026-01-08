const headerel = document.querySelector("header");
const mainel = document.querySelector("main");
const asideel = mainel.querySelector("aside");
const menubar = document.querySelector("#menubar");
const homeel = mainel.querySelector("#home");
const profileel=mainel.querySelector("#profile")
const contactel = mainel.querySelector("#contact")
const footerel = mainel.querySelector("#footer")


let allarrofobj = {};
let arrofcart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchdata() {
  try {
    const response = await fetch("./asset/data.json");
    const data = await response.json();
    // console.log(data);
    renderdata(data);
    allarrofobj = data;
  } catch (err) {
    console.error(err);
  }
}

fetchdata();

menubar.addEventListener("click", () => {
  headerel.classList.toggle("h-fit");
});

//show function
const allpages = mainel.querySelectorAll("section");
function showpages(pagesid) {
  allpages.forEach((page) => {
    page.style.display = pagesid === page.id ? "block" : "none";
  });
}
showpages("home");

//showallpages

function showallpages() {
  allpages.forEach((page) => {
    page.style.display = "block";
    window,scrollTo({
  top:0,
  behavior:"smooth"
})
  });
}
showallpages();

//click to navigite page
const navlist = headerel.querySelectorAll("nav ul li");
navlist.forEach((list) => {
  list.addEventListener("click", () => {
    showpages(list.dataset.page);
  });
});

//navigate to home page
const homepage = headerel.querySelector("h1");
homepage.addEventListener("click", () => {
  // showpages("home");
  showallpages();
});

//click to cart open function
const cartopen = homeel.querySelector("#cartIcon");
cartopen.addEventListener("click", () => {
  asideel.classList.toggle("!block");
});

const headcartopen = headerel.querySelector("#headcartIcon");
headcartopen.addEventListener("click", () => {
  asideel.classList.toggle("!block");
});

//home page to shoppage
const homebuybtn = homeel.querySelector("#buybtn");
homebuybtn.addEventListener("click", () => {
  showpages("shop");
});

//shop functionality
const shoppage = mainel.querySelector("#shop");
const shopul = shoppage.querySelector("ul");
function renderdata(data) {
  shopul.innerHTML = `
    ${Object.keys(data)
      .map(
        (list) => `
                    <li class=" p-2 px-4 rounded-xl cappitalize cursor-pointer hover:bg-red-400 " data-key="${list}">
                    ${list.split("_").join(" ")}</li>
        `
      )
      .join("")}`;

  // const firstkeypage = Object.keys(data)[0];
  // productcard(data[firstkeypage]);

  const shopli = shopul.querySelectorAll("li");
  shopli.forEach((li) => {
    li.addEventListener("click", () => {
      // console.log(li.dataset.key);
      productcard(data[li.dataset.key]);
    });
  });
}

const cardcontainer = shoppage.querySelector("#cardcontainer");
function productcard(products) {
  cardcontainer.innerHTML = `
    ${products
      .map(
        (card) => `
          <figure>
                    <div>
                        <img src="${card.images[0].url}" alt="">
                    </div>
                   <figcaption>
                     <table class="w-full [&_td]:p-2">
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>${card.name}</td>
                            </tr>
                             <tr>
                                <td>Brand:</td>
                                <td>${card.brand}</td>
                            </tr> 
                            <tr>
                                <td>Description:</td>
                                <td>
                               <p class="line-clamp-1"> ${
                                 card.description
                               }  </p>
                               </td>
                            </tr>
                             <tr>
                                <td>Price:</td>
                                <td>${(card.price * 90).toFixed(2)}</td>
                            </tr>
                            <tr>
                            <td>
                              <button onclick=" handleview(${
                                card.id
                              })" class="outline text-blue-500 w-full hover:bg-blue-500 hover:text-white cursor-pointer">View</button>
                            </td>
                            <td>
                              <button id="addtocart" data-itemid="${
                                card.id
                              }" class="outline text-green-500 w-full hover:bg-green-500 hover:text-white cursor-pointer">Add To Cart</button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                   </figcaption>
                </figure>`
      )
      .join("")}`;
  const cartbtn = cardcontainer.querySelectorAll("#addtocart");

  cartbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.itemid;
      const cartobj = products.find((f) => f.id == id);
      const existcart = arrofcart.some((items) => items.id === cartobj.id);
      if (existcart) {
        alert("This Product Already Selected");
        return;
      }

      arrofcart.push(cartobj);
      addtocartitems(arrofcart);
      localStorage.setItem("cart", JSON.stringify(arrofcart));
    });
  });
}

//showview page function
function handleview(id) {
  showpages("view");
  const Viewpage = mainel.querySelector("#view article ");

  const objtoarr = Object.values(allarrofobj).flat();
  const foundobj = objtoarr.find((item) => item.id === id);
  // console.log(foundobj);
  Viewpage.innerHTML = `
    
          <figure class="p-4 font-bold">
                    <div class="p-3 ">
                        <img src="${foundobj.images[0].url}" alt="">
                    </div>
                   <figcaption >
                     <table class="w-full [&_td]:p-1">
                        <tbody>
                           <tr >
                             <div class="flex justify-end items-center gap-5 ">
                            <div class="flex flex-col items-center"><i class="fa-solid fa-heart text-4xl hover:text-red-500 cursor-pointer"></i><p class="text-xl text-orange-600">Wishlisted</p></div>
                            <div ><i class="fa-solid fa-share-nodes text-4xl text-black cursor-pointer"></i><p class="text-xl text-blue-600">Share</p></div>
                            </div>
                            </tr>
                            <tr>
                                <td>Name:</td>
                                <td>${foundobj.name}</td>
                            </tr>
                             <tr>
                                <td>Brand:</td>
                                <td>${foundobj.brand}</td>
                            </tr> 
                            <tr>
                                <td>Description:</td>
                                <td>
                               <p class="line-clamp-1"> ${
                                 foundobj.description
                               }  </p>
                               </td>
                            </tr>
                             <tr>
                                <td>Price:</td>
                                <td>₹${(foundobj.price * 90).toFixed(2)}/-</td>
                            </tr>
                             <tr>
                                <td>Availability:</td>
                                <td>${foundobj.availability}</td>
                            </tr> 
                             <tr>
                                <td>Rating:</td>
                                <td>${foundobj.rating}</td>
                            </tr>
                              <tr>
                                <td>Warranty:</td>
                                <td>${foundobj.warranty}</td>
                            </tr> 
                        </tbody>
                    </table>
                                    
              <div class="flex items-center justify-center ">
                <h1 id="viewbuybtn" class=" bg-blue-500 text-white p-3 px-15 rounded-2xl cursor-pointer">BUY NOW</h1>
              </div>
            
                   </figcaption>
                </figure>
    `;
 
}

const cartul = asideel.querySelector("ul");
 
//Add to products in cartpage
function addtocartitems(cartitems) {
  cartul.innerHTML = `
  ${cartitems
    .map(
      (item) => `
     <li class="flex items-center justify-between  gap-3 p-2">
            <figure class="w-40 outline">
                <img src="${item.images[0].url}" alt="Product img">
            </figure>
            <div class="flex-1">
                <h1 class="line-clamp-1">${item.name}</h1>
                <div class="flex gap-3 mt-2">
                    <button onclick="handleincrease(${
                      item.id
                    })" class="outline w-7 rounded text-orange hover:bg-orange-400 hover:text-white cursor-pointer">+</button>
                    <span>${item.qty || 1}</span>
                    <button onclick="handledecrease(${
                      item.id
                    })" class="outline w-7 rounded text-orange hover:bg-orange-400 hover:text-white cursor-pointer">-</button>
                </div>
            </div>
            <div>₹${(item.price * 90 * (item.qty || 1)).toFixed(2)}/-</div>
            <div>
                <button onclick="handledelete(${
                  item.id
                })" class="outline text-red-500 hover:bg-red-600 hover:text-white rounded px-3 cursor-pointer ">Remove</button>
            </div>
        </li>
    `
    )
    .join("")}`;
  totalprice(cartitems);
  const nofproduct = asideel.querySelector("#nofproduct");
  nofproduct.textContent = `${cartitems.length}`;
}
addtocartitems(arrofcart);

//cart page products increase
function handleincrease(id) {
  arrofcart = arrofcart.map((item) =>
    item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
  );
  addtocartitems(arrofcart);
  localStorage.setItem("cart", JSON.stringify(arrofcart));
}

//cart page products decrease
function handledecrease(id) {
  arrofcart = arrofcart.map((item) =>
    item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
  );
  addtocartitems(arrofcart);
  localStorage.setItem("cart", JSON.stringify(arrofcart));
}

//cart page products delete
function handledelete(id) {
  arrofcart = arrofcart.filter((item) => item.id !== id);
  addtocartitems(arrofcart);
  localStorage.setItem("cart", JSON.stringify(arrofcart));
}

//cart page totalprice
function totalprice(carts) {
  const displaytotalprice = asideel.querySelector("#totalprice");
  const total = carts.reduce((arr, items) => {
    return arr + items.price * (items.qty || 1) * 90;
  }, 0);
  displaytotalprice.textContent = `₹${total.toFixed(2)}/-`;
}

//homepage buybtn function
const buybtn = homeel.querySelector("#buybtn")
buybtn.addEventListener("click",()=>{
  showpages("shop")
})

//homepage moreproduct btn function
const MoreProduct = homeel.querySelector("#MoreProduct")
MoreProduct.addEventListener("click",()=>{
  showpages("shop")
})

//profile FashionLook 
const FashionLook = profileel.querySelector("#intralogo")
FashionLook.addEventListener("click",()=>{
window,scrollTo({
  top:0,
  behavior:"smooth"
})
})


//shoppage check collection btn function
 const shopcheckbtn =shoppage.querySelector("#shopcheckbtn")
 shopcheckbtn.addEventListener("click",()=>{
  showpages("shop")
})

//contact btn function
const contactbtn=contactel.querySelectorAll("button")
contactbtn.forEach((btn)=>{
  btn.addEventListener("click",()=>{
    window,scrollTo({
  top:0,
  behavior:"smooth"
})
  })
})
//footer li function
const footerli=footerel.querySelectorAll("li")
footerli.forEach((li)=>{
  li.addEventListener("click",()=>{
    window,scrollTo({
  top:0,
  behavior:"smooth"
})
  })
})





