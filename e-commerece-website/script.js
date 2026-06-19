//Implement your code here to make it a functional shopping website
// Select the container where products will be displayed
const container = document.querySelector(".products");
const cart = []
async function fetchProduct() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  console.log(data);
  data.products.forEach((item) => {
    const product = document.createElement("div");
    product.className = "product";
    product.innerHTML = `
      <div class="img_con">
          <button>&lt;</button> <img src="${item.images[0]}" alt="Product Image" style="width: 100px;"> <button>&gt;</button> </div>

        <div class="card_footer">
          <h3>${item.title}</h3>
          <p>$${item.price}</p>
         <button class="buy-btn" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      `;
    container.appendChild(product);
  });
}
// A mock function to show interactivity
async function addToCart(productId) {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const product = data.products.find((item) => item.id === productId);
  cart.push(product);
}
fetchProduct();
