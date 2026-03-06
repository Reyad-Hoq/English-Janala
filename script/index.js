
const createElements = (arr) => {
  const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
  return (htmlElements.join(" "))
};
const manageSpinner = status => {
  if(status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response 
  .then(res => res.json()) //promise of json data
  .then(data => renderLesson(data.data)) 
}
loadLessons();

const loadLevelWord = id => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    removeActive()
    const selectedBtn = document.getElementById(`lesson-btn-${id}`);
    selectedBtn.classList.remove("btn-outline")
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
    manageSpinner(false);
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
        <div class="flex justify-between mt-10">
          <button onclick="loadWordDetail(${word.id})" class="bg-info/20 hover:bg-sky-300 w-12 h-12 flex justify-center items-center rounded"><i class="fa-solid fa-circle-info"></i></button>
          <button class="bg-info/20 hover:bg-sky-300 w-12 h-12 flex justify-center items-center rounded"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    `
    wordContainer.append(card);

  }
  manageSpinner(false);
}
const renderLesson = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get into every lesson
  lessons.forEach((lesson) => {
    // 3. create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i><span>Lesson - ${lesson.level_no}</span></button>    
    `
    // 4. append into the container
    levelContainer.appendChild(btnDiv);
  }) 
}
const removeActive = () => {
  const allBtn = document.querySelectorAll(".lesson-btn")
    allBtn.forEach(remove => {
      remove.classList.add("btn-outline")
    })
}

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  renderDetailsWord(details.data);
}

const renderDetailsWord = (word) => {
  console.log(word)
  const detailContainer = document.getElementById("details-container");
  console.log(detailContainer)
  detailContainer.innerHTML = `
    <div>
        <h2 class="text-2xl">${word.word}<span>(<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</span></h2>
      </div>
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Synonym</h2>
        <div>${createElements(word.synonyms)}</div>
      </div>
  `;
  console.log(createElements(word.synonyms));
  document.getElementById("word_modal").showModal();
}