const synonyms = ['hello', 'hi', 'world']

const createElements = (arr) => {
  const htmlElements = arr.map(el => `<span class="btn"> ${el}</span>`)
  console.log(htmlElements.join(" "))
}
createElements(synonyms);