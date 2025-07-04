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
    const btn = document.createElement("button");
    btn.classList = "btn";

    btn.innerText = element.category;
    catagoriesContainer.append(btn);
  });
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.error(err))
}

loadVideos();

const displayVideos = (videoData) => {
  const videoContainer = document.getElementById("videos")
  console.log(videoData);
  
    

  videoData.forEach((data) => {
    console.log(data)

    const cardVideo = document.createElement("div")
    cardVideo.classList = 'card bg-base-100 w-96 shadow-sm'
    cardVideo.innerHTML = `
             <figure class="px-10 pt-10 h-[200px]">
 <img
      src=${data.thumbnail}
      alt="Shoes"
      class="rounded-xl h-full w-full object-cover" />
  </figure>
  <div class="w-96  flex gap-3 justify-start  my-3">
    
      <div>
         <img class="h-10 w-10 rounded-full" src="${data.authors[0].profile_picture}"/>
      </div>

      <div>
         <h2 class="text-xl font-bold">${data.title}</h2>

         <div class="flex gap-2 items-center">
            <p class="text-gray-400">${data.authors[0].profile_name}</p>
            <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>
         </div>
         
         
      </div>
    
  </div>
        `
    videoContainer.append(cardVideo)
  });
  
};


