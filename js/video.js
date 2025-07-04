// create load categories
const load = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => display(data.categories))
    .catch((error) => console.log(error));
};

load();
// create display
const display = (data) => {
  const catagoriesContainer = document.getElementById("catagories-container");
  data.forEach((element) => {
    console.log(element);
    const btnContainer = document.createElement("div")
    btnContainer.innerHTML = `
        <button onclick = "categoryVideoLoad(${element.category_id})" class="btn">${element.category}</button>
    `

    
    catagoriesContainer.append(btnContainer);
  });
};

const categoryVideoLoad = (id) =>{
    // alert(id)

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((err) => console.error(err));
}

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.error(err));
};

loadVideos();

const displayVideos = (videoData) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  console.log(videoData);

  videoData.forEach((data) => {
    console.log(data);

    const cardVideo = document.createElement("div");
    cardVideo.classList = "card bg-base-100 w-96 shadow-sm";
    cardVideo.innerHTML = `
 <figure class="px-10 pt-10 h-[200px] relative">
    <img
      src=${data.thumbnail}
      alt="Shoes"
      class="rounded-xl h-full w-full object-cover" />
      
      ${
        data.others.posted_date?.length == ""
          ? ""
          : `<span class="absolute right-12 bottom-2 bg-black p-1 rounded-lg text-white text-xs">${calculateTime(
              data.others.posted_date
            )}</span>`
      }

  </figure>
  <div class="w-96  flex gap-3 justify-start  my-3">
    
      <div>
         <img class="h-10 w-10 rounded-full" src="${
           data.authors[0].profile_picture
         }"/>
      </div>

      <div>
         <h2 class="text-xl font-bold">${data.title}</h2>

         <div class="flex gap-2 items-center">
            <p class="text-gray-400">${data.authors[0].profile_name}</p>
            ${
              data.authors[0].verified == true
                ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`
                : ""
            }
         </div>
         
         
      </div>
    
  </div>
        `;
    videoContainer.append(cardVideo);
  });
};

function calculateTime(time) {
   
    let hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    
    
    let min = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    
    

    return `${hours}hrs ${min}min ${remainingSecond}sec ago`;
    
  
}
