let key = "adb42c1f";
let getMovie = async () => {
  try{
  let query = document.querySelector("input").value;
  let res = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=${key}`);
  let data = await res.json();
  document.getElementById("results").style.display = "none";
  let name = data.Title;
  if(data.Title==undefined){
    document.getElementById("showDiv").innerHTML = null;
    let img = document.createElement("img");
  img.src = "https://c.tenor.com/IHdlTRsmcS4AAAAM/404.gif";
  document.getElementById("showDiv").appendChild(img);
  return
  }
  document.getElementById("showDiv").innerHTML = ` <div id="imgDiv"></div>
      <div id="detailDiv"></div>`
  let year = data.Year;
  let rating = data.imdbRating;
  if(rating>8){
    let img_url = data.Poster;
  let img = document.createElement("img");
  img.src = img_url;
  document.getElementById("imgDiv").innerHTML = null;
  document.getElementById("imgDiv").append(img);
  let h2 = document.createElement("h2");
  h2.textContent = `Title:${name}`;
  let h3 = document.createElement("h3");
  h3.textContent = `Year:${year}`;
  let h5 = document.createElement("h5");
  h5.textContent = `Ratings:${rating} (***Recommended***)`;
  document.getElementById("detailDiv").innerHTML = null;
  document.getElementById("detailDiv").append(h2, h3, h5);
  }else{
    let img_url = data.Poster;
  let img = document.createElement("img");
  img.src = img_url;
  document.getElementById("imgDiv").innerHTML = null;
  document.getElementById("imgDiv").append(img);
  let h2 = document.createElement("h2");
  h2.textContent = `Title:${name}`;
  let h3 = document.createElement("h3");
  h3.textContent = `Year:${year}`;
  let h5 = document.createElement("h5");
  h5.textContent = `Ratings:${rating}`;
  document.getElementById("detailDiv").innerHTML = null;
  document.getElementById("detailDiv").append(h2, h3, h5);
  }

}catch(e){
  console.log("Error: " + e)
}
}
async function searchMovie() {
  try {
    let query = document.querySelector("input").value;

    let res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${key}`);

    let data = await res.json();
    return data.Search;
  } catch (err) {
    console.log(err);
  }
}

async function someFn() {
  let movies = await searchMovie();
  document.getElementById("showDiv").innerHTML = null;
  document.getElementById("results").innerHTML = null;
  document.getElementById("results").style.display = "block";
  if (movies === undefined) {
    return false;
  }
  console.log(movies)

  movies.forEach((ele) => {
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "resDiv");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "img2Div");
    let img = document.createElement("img");
    img.src=ele.Poster
    div1.appendChild(img);
    let div2 = document.createElement("div");
    div2.setAttribute("class", "titleDiv");
    let h2= document.createElement("h2");
    h2.textContent = ele.Title;
    div2.appendChild(h2);
    mainDiv.append(div1,div2);
    mainDiv.style.cursor="pointer"
    mainDiv.addEventListener("click",()=>{
      MovieInfo(ele.Poster,ele.Title,ele.Year)
    })
    document.getElementById("results").append(mainDiv);
  });
}
let id;
let debounce = (func,delay) => {

  clearTimeout(id)

  id=setTimeout(()=>{
    someFn()
  },delay)
}

let MovieInfo=(image,name,year)=>{
  document.getElementById("showDiv").innerHTML = null;
  document.getElementById("results").style.display = "none";
  document.getElementById("showDiv").innerHTML = ` <div id="imgDiv"></div>
      <div id="detailDiv"></div>`
  let img = document.createElement("img");
  img.src = image;
  document.getElementById("imgDiv").innerHTML = null;
  document.getElementById("imgDiv").append(img);
  let h2 = document.createElement("h2");
  h2.textContent = `Title:${name}`;
  let h3 = document.createElement("h3");
  h3.textContent = `Year:${year}`;
  document.getElementById("detailDiv").innerHTML = null;
  document.getElementById("detailDiv").append(h2, h3);
}