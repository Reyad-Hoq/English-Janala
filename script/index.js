const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response 
  .then(res => res.json()) //promise of json data
  .then(data => renderLesson(data.data)) 
}
loadLessons()

const renderLesson = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get into every lesson
  lessons.forEach((lesson) => {
    // 3. create Element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <li class="list-none">
          <a class="btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i><span>Lesson - ${lesson.level_no}</span></a>
        </li>    
    `
    // 4. append into the container
    levelContainer.appendChild(btnDiv);
  })
  
}