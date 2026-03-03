const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response 
  .then(res => res.json()) //promise of json data
  .then(data => console.log(data.data[4].lessonName)) 
}
loadLessons()