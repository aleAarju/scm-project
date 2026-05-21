const products = [

  {
    company: "Cerave",
    skinType: "dry",
    description: "Hydrating moisturizer for dry skin",
    image: "moisturizer.webp"
  },

  {
    company: "Aveeno",
    skinType: "oily",
    description: "Deep hydration lotion",
    image: "oily.jpeg"
  },

  {
    company: "Neutrogena",
    skinType: "oily",
    description: "Oil control face wash",
    image: "oil.webp"
  },

  {
    company: "Cetaphil",
    skinType: "sensitive",
    description: "Gentle skin cleanser",
    image: "cleanser.webp"
  }

];

function showProducts() {

  const skinType = document.getElementById("skinType").value;
  const container = document.getElementById("productContainer");

  container.innerHTML = "";

  if (!skinType) {
    alert("Please select a skin type");
    return;
  }

  const filteredProducts = products.filter(
    product => product.skinType === skinType
  );

  filteredProducts.forEach(product => {

  container.innerHTML += `
  <div class="product-card">

    <img class="product-image" src="${product.image}" alt="${product.company}">

    <h3>${product.company}</h3>

    <p>${product.description}</p>

    <small>Skin Type: ${product.skinType}</small>

  </div>
`;
  });
}