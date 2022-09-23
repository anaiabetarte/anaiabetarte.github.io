let InfoArray = [];
let imagesArray = [];
let comentsArray = [];
const stars = document.querySelectorAll(".stars a");
let button = document.getElementById("button");
let text = document.getElementById("text");
let currentTime = new Date();

const showUser = document.getElementById("profile");

function signUp(){
    showUser.innerHTML=`<a class="nav-link" href="my-profile.html">${JSON.parse(localStorage.getItem("user"))}</a>`
}


signUp()

function showInfo() {
        
    document.getElementById("info").innerHTML += `
      <div class="information">
        <div class="col-lg-11 p-0 ps-lg-4">
          <div class="row m-0">
            <div class="col-12 px-4">
              <div class="d-flex align-items-end mt-4 mb-2">
                  <p class="h2 m-1"><span class="pe-1">${InfoArray.name}</span> 
              </div>
              <div class="row m-0 bg-light">
                <div class="col-md-4 col-6 ps-30 pe-0 my-4">
                  <p class="h5">Precio</p>
                  <p class="text-muted">${InfoArray.cost}</p>
                </div>
              <div class="col-md-4 col-6  ps-30 my-4">
                  <p class="h5 m-0">Categoria</p>
                  <p class="text-muted">${InfoArray.category}</p>
              </div>
              <div class="col-md-4 col-6 ps-30 my-4">
                  <p class="h5 m-0">Cantidad de vendidos</p>
                  <p class="text-muted">${InfoArray.soldCount}</p>
              </div>
              <div class="col-md-10 col-6 ps-30 my-4">
                  <p class="h5 m-0">Descripcion</p>
                  <p class="text-muted">${InfoArray.description}</p>
              </div>
              </div>
    </div>
    </div>
    </div>`
   
  }
  

  function showImages(){
    let imagesToAppend = "";
    console.log(imagesArray);
    for(let i = 1; i<imagesArray.length; i++){
        let image = imagesArray[i]; 

        imagesToAppend += `
        <img src="${image}" alt="">`
    }
       document.getElementById("secondary-image").innerHTML = imagesToAppend;         
  }

  function showImagesSmall(){
    let imagesToAppend = "";
    console.log(imagesArray);

        imagesToAppend += `
        <img src="${imagesArray[0]}" alt="">`
    
       document.getElementById("main-image").innerHTML = imagesToAppend;         
  }


function showComments(){
  for(let i = 0; i<comentsArray.length; i++){
      let comments = comentsArray[i];
      addStars();

      document.getElementById("comments").innerHTML += `
    <div class="comment">
      <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex flex-start">
              <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="text-primary fw-bold mb-0">
                  ${comments.user}
                    <span class="text-dark ms-2">${comments.dateTime}</span>
                  </h6>
              </div>
              <div class="rating" >${addStars(comments.score)}</div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
            <p class="mb-15">${comments.description}</p>
            </div>
          </div>
          </div>
          </div>
          </div>
          `
        }
}

stars.forEach((star, indx) => {
  star.addEventListener("click", ()=>{
    localStorage.setItem("score", indx + 1);
    localStorage.time = currentTime;
  });
});


function addStars (stars) {
  let starsHtml = ""
  if(stars === 1) {
    starsHtml = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `

      return starsHtml

  }
  else if(stars === 2) {
    rstarsHtml = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `
      return starsHtml

  }
  else if(stars === 3) {
    starsHtml = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `
      return starsHtml

  }
  else if(stars === 4) {
    starsHtml = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      `
      return starsHtml

  }
  else if(stars === 5) {
    starsHtml = `
  
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      `
      return starsHtml

  }
}
  
function dateAndTime() { 
  let date = new Date();
  let format= date.getFullYear() +'-'+(date.getMonth()+1)+'-'+ date.getDate() +' '+date.getHours()+':'+ date.getMinutes()+':'+ date.getSeconds();

  localStorage.setItem("time", format)
  console.log(format);
  
  }

function newComments(){
  button.addEventListener("click", () => {
  
    if(text.value.length >5){  
  localStorage.setItem("comment", text.value)
  text.value="";
  dateAndTime();

  document.getElementById("comment-space").innerHTML +=  `
  <div class="comment">
  <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex flex-start">
          <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
          <h6 class="text-primary fw-bold mb-0">${JSON.parse(localStorage.getItem("user"))}
           <span class="text-dark ms-2">${JSON.stringify(localStorage.getItem("time"))}</span>
          </h6>
        </div>
          </div>
          <div class="stars" id="stars">${addStars(JSON.parse(localStorage.getItem("score")))}
          </div>
        </div>
      </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
        <p class="mb-15">${localStorage.getItem("comment")}</p>
        </div>
      </div>
      </div>
      </div>
      `
}
});
}



  getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        InfoArray = resultObj.data
        imagesArray = resultObj.data.images
        showInfo()
        showImages()
        showImagesSmall()
    }
  });

  document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        console.log(resultObj.data) 
        comentsArray = resultObj.data
        showComments()
        addStars()
        newComments()
    }
  });    
  });

