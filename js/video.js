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
             <figure class="px-10 pt-10">
 <img
      src=${data.thumbnail}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
        `
    videoContainer.append(cardVideo)
  });
  
};


