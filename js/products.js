const ORDER_ASC_PRICE = "max";
const ORDER_DESC_PRICE = "min";
const ORDER_REL = "Rel."
search = document.getElementById("search");
let ProductsArray = [];
let SortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

const showUser = document.getElementById("profile");

function signUp(){
    showUser.innerHTML=`<a class="nav-link" href="my-profile.html">${JSON.parse(localStorage.getItem("user"))}</a>`
}


signUp()

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_PRICE){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_PRICE){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.pcost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return -1;
        });
    }else if (criteria === ORDER_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
} 

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

function showProducts() {
  let htmlContentToAppend = "";
  for(let i = 0; i<ProductsArray.length; i++){
      let product = ProductsArray[i];
      
    if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
      ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){
      
    htmlContentToAppend += `
      <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency}${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>`
    }
document.getElementById("container").innerHTML = htmlContentToAppend;
}
}

function sortAndShow(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        ProductsArray = productsArray;
    }

    ProductsArray = sortProducts(currentSortCriteria, ProductsArray);

    showProducts();
}

getJSONData(PRODUCTOS_URL).then(function(resultObj){
  if (resultObj.status === "ok"){
      console.log(resultObj.data.products)
      ProductsArray = resultObj.data.products
      showProducts()
  }
});


document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShow(ORDER_ASC_PRICE);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShow(ORDER_DESC_PRICE);
});

document.getElementById("sortByRel").addEventListener("click", function(){
    sortAndShow(ORDER_REL);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("filterPriceMin").value = "";
    document.getElementById("filterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProducts();
});

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    minPrice = document.getElementById("filterPriceMin").value;
    maxPrice = document.getElementById("filterPriceMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
        minPrice = parseInt(minPrice);
    }
    else{
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
        maxPrice = parseInt(maxPrice);
    }
    else{
        maxPrice = undefined;
    }

    showProducts();
});
