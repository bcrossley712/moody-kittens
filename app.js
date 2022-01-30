/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens()
if (kittens > []) {
  document.getElementById("clearKittens").classList.remove("hidden");
}

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  document.getElementById("welcome").classList.add("hidden");
  let form = event.target

  let kittenName = form.kittenName.value

  let currentKitten = kittens.find(kitten => kitten.name == kittenName)

  if (!currentKitten) {
    let kitten = {
      id: generateId(),
      name: form.kittenName.value,
      image: `https://robohash.org/${form.kittenName.value}?set=set4`,
      mood: "tolerant",
      affection: 5,
    }
    kittens.push(kitten)
  }
  else (window.alert("You can't have the same cat more than once!")

  )

  form.reset()

  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = " "

  kittens.forEach(kitten => {
    template += `
    <div class="kitten ${kitten.mood} card  container p-2 text-center d-flexspace-around m-2 bg-dark">
    <div class="kitten"> <img height="100" src ="${kitten.image}">
    </div>
    <small class="d-flex justify-content-center text-light">Name: ${kitten.name}</small>
    <small class="d-flex justify-content-center text-light">Mood: ${kitten.mood}</small>
    <small class="d-flex justify-content-center text-light">Affection: ${kitten.affection}</small>
    <div><button class="btn-cancel m-1" onclick = pet("${kitten.id}")>Pet</button>
    <button class="m-1" onclick = catnip("${kitten.id}")>Catnip</button>
    </div>
    </div>
    `
    document.getElementById("kittens").innerHTML = template
  })
  saveKittens()
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let petKitten = findKittenById(id)
  let affectionRandom = Math.random()
  if (affectionRandom > .7) {
    petKitten.affection += 1;
  }
  else {
    petKitten.affection -= 1;
  }
  setKittenMood(petKitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let catnipKitten = findKittenById(id)
  catnipKitten.affection = 5
  setKittenMood(catnipKitten)
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection > 5) {
    kitten.mood = "happy"
  }
  if (kitten.affection <= 5) {
    kitten.mood = "tolerant"
  }
  if (kitten.affection <= 3) {
    kitten.mood = "angry"
  }
  if (kitten.affection <= 0) {
    kitten.mood = "gone"
  }

  drawKittens()
}

function getStarted() {
  document.getElementById("welcome").classList.add("hidden");
  loadKittens()
  drawKittens();
}

function clearKittens() {
  kittens = []
  saveKittens()
  document.getElementById("welcome").classList.add("hidden");
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
