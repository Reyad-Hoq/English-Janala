const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response 
  .then(res => res.json()) //promise of json data
  .then(data => renderLesson(data.data)) 
}
loadLessons();

const loadLevelWord = id => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    renderLevelWords(data.data)
  })
};
const renderLevelWords = words => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if(words.length == 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full font-bangla space-y-4">
        <img class="mx-auto" src="./assets/alert-error.png">
        <p class="text-gray-500 text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class=" text-4xl font-medium">নেক্সট Lesson এ যান</h2>
      </div>
    `
    return;
  }
  for (let word of words) {
    const card = document.createElement("div");
    card.classList.add("bg-white", "p-14", "rounded-lg", "shadow")
    card.innerHTML = `
        <div class="flex flex-col gap-6 justify-center items-center">
          <h2 class="font-bold text-3xl">${word.word? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-extralight text-xl">Meaning /Pronounciation </p>
          <h2 class="font-bangla font-semibold text-3xl text-base-content/70">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h2>
        </div>
        <div class="flex justify-between">
          <div class="bg-info/20 hover:bg-info w-12 h-12 flex justify-center items-center rounded"><i class="fa-solid fa-circle-info"></i></div>
          <div class="bg-info/20 hover:bg-info w-12 h-12 flex justify-center items-center rounded"><i class="fa-solid fa-volume-high"></i></div>
        </div>
    `
    wordContainer.append(card);

  }
}
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
          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i><span>Lesson - ${lesson.level_no}</span></button>    
    `
    // 4. append into the container
    levelContainer.appendChild(btnDiv);
  })
  
}