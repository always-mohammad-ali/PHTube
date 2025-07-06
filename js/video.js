// CREATE LOAD FUNCTION TO GET THE CATEGORY DATA BY FETCHING API
const load = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    // DISPLAY FUNCTION CALLED HERE TO GET THE DATA INSIDE ITS PARAMETER BY 'DATA' NAME
    .then((data) => display(data.categories))
    .catch((error) => console.log(error));
};

// CALL LOAD FUNCTION
load();

// CREATE DISPLAY FUNCTION FOR GETTING 3 CATEGORY ITEMS BTN IN THE UI
const display = (data) => {
  const catagoriesContainer = document.getElementById("catagories-container");
  data.forEach((element) => {
    console.log(element);
    const btnContainer = document.createElement("div")

    // CATEGORYVIDEOLOAD FUNCTION CALL HERE AS ONCLICK WHEN BUTTON CLICKED, THEN IT WILL FETCHING API DATA TO HERE AND SHOW ALL THE VIDEOS
    btnContainer.innerHTML = `
    
        <button id="btn-${element.category_id}" onclick = "categoryVideoLoad(${element.category_id})" class="btn btn-style">${element.category}</button>
    `

    // BTNCONTAINER APPEND BY CATAGORIESCONTAINER
    catagoriesContainer.append(btnContainer);
  });
};

// CATEGORYVIDEOLOAD FUNCTION LOADS CATEGORIZE VIDEO FROM API
const categoryVideoLoad = (id) =>{
    // alert(id)

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) =>
      { 
        // REMOVEACTIVECLASS FUNCTION CALLS HERE TO REMOVE ACTIVE CLASS FIRST THEN AFTER THIS FUNCTION ACTIVE CLASS WILL CREATE AGAIN IN THE FOLLOWING CODE
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active')
        displayVideos(data.category)})
    .catch((err) => console.error(err));
}

// REMOVEACTIVECLASS FUNCTION USE HERE TO REMOVE ACTIVE CLASS
const removeActiveClass =()=>{
        const btnStyle = document.getElementsByClassName('btn-style');
        for(let buttonStyle of btnStyle){
          buttonStyle.classList.remove('active')
        }
}

// LOADVIDEOS FUNCTION LOADS ALL VIDEOS AND THEN IT SENDS ALL VIDEO DATA TO DISPLAYVIDEOS FUNCTION PARAMETER BY CALLING THIS INSIDE DATA
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.error(err));
};

loadVideos();

// DISPLAYVIDEOS FUNCTION WILL TAKE DATA FROM LOADVIDEOS AND THEN USE IT INSIDE ITS VIDEOCONTAINER SECTION.
const displayVideos = (videoData) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if(videoData.length == 0){

    videoContainer.classList.remove("grid");
   
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col justify-center items-center gap-5 ">

      <img src="assets/icon.png"/> 
      <h2 class="text-3xl text-gray-400 font-bold">No content available in this category</h2>

    </div>
    `;
    return;
  }
  else{
    videoContainer.classList.add("grid")
  }
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
         
         <p> <button class="btn btn-sm btn-error" onclick="loadVideoDetails('${data.video_id}')"> Details </button> </p>

      </div>
    
  </div>
        `;
    videoContainer.append(cardVideo);
  });
};

// LOADVIDEODETAILS FUNCTION IS USED FOR SHOWING DETAILS OF A INDIVIDUAL VIDEO BY CLICKING THE BUTTON 
const loadVideoDetails = async(videoID) =>{
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
  const res = await fetch(uri)
  const data = await res.json()
  displayVideoDetails(data.video)
}

const displayVideoDetails = (details) =>{
    console.log(details)
    const modalContent = document.getElementById('modal-content')

    modalContent.innerHTML = `
    <img src="${details.thumbnail}"/>
    <p>${details.description}</p>
    `
    
    // WAY-1 TO SHOW MODAL DATA
    document.getElementById('customModal').showModal()

    // WAY-2 TO SHOW MODAL DATA
    // document.getElementById('showModalData').click()
}

// CALCULATETIME FUNCTION CALCULATE SECONDS TO HRS, MIN & REMAINING SECONDS
function calculateTime(time) {
   
    let hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    
    
    let min = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    
    

    return `${hours}hrs ${min}min ${remainingSecond}sec ago`;
    
  
}
