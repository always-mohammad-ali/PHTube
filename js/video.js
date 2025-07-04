// create load categories
const load = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => display(data.categories))
    .catch(error => console.log(error))
}

load();
// create display
const display = (data) =>{
    console.log(data)
}