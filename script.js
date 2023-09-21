let counter = 0;

let foodJokes = [
  {
    joke: "All you need is love. But a little chocolate now and then doesn't hurt.",
    author: "Charles M. Schulz",
  },
  {
    joke: "One cannot think well, love well, sleep well, if one has not dined well.",
    author: "Virginia Woolf",
  },

  {
    joke: "People who love to eat are always the best people.",
    author: "Julia Child",
  },

  {
    joke: "The only time to eat diet food is while you're waiting for the steak to cook.",
    author: "Julia Child",
  },

  {
    joke: "Cooking is like love. It should be entered into with abandon or not at all.",
    author: "Harriet Van Horne",
  },

  {
    joke: "Food is our common ground, a universal experience.",
    author: "James Beard",
  },

  {
    joke: "Tell me what you eat, and I will tell you what you are.",
    author: "Anthelme Brillat-Savarin",
  },
  {
    joke: "There is no sincerer love than the love of food.",
    author: "George Bernard Shaw",
  },

  { joke: "The belly rules the mind.", author: "Spanish Proverb" },

  {
    joke: "First we eat, then we do everything else.",
    author: "M.F.K. Fisher",
  },

  {
    joke: "Food is the most primitive form of comfort.",
    author: "Sheila Graham",
  },

  {
    joke: "A balanced diet is a cookie in each hand.",
    author: "Barbara Johnson",
  },
];

function fetchByArea(country) {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country)
    .then((response) => {
      foodArray = response.data.meals;
      if (foodArray !== null) {
        return randomSelector(foodArray);
      } else {
        alert("🤣 Sorry, we couldn't get any free foods from this country 🤣");
      }
    })
    .then((aMealFromThatCountry) => {
      //fetchById will start taking over the further steps
      fetchById(aMealFromThatCountry.idMeal);
    })
    .catch(() => {
      console.log("Yo! You broke something, and ya'll better find out soon");
    });
}

function fetchById(id) {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    .then((response) => {
      const foodName = response.data.meals[0].strMeal;
      const foodImg = response.data.meals[0].strMealThumb;

      if (getCounter() === 10) {
        alert("🤔Still debating, ugh?🤔");
        alert("😁I will give you just couple more chances, just to be nice😁");
      } else if (getCounter() === 15) {
        alert("🤪This is your final chance🤪");
      } else if (getCounter() === 16) {
        alert("YOU ARE DONE! 😈 This is your food!");
      }
      visualGeneration(foodName, foodImg);
    })
    .catch(() => {
      console.log("You such a bug generator, man!");
    });
}

function fetchRandom() {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => {
      const foodName = response.data.meals[0].strMeal;
      const foodImg = response.data.meals[0].strMealThumb;
      console.log(getCounter());

      visualGeneration(foodName, foodImg);
      if (getCounter() === 10) {
        alert("🤔Still debating, ugh?🤔");
        alert("😁I will give you just couple more chances, just to be nice😁");
      } else if (getCounter() === 15) {
        alert("🤪This is your final chance🤪");
      } else if (getCounter() === 16) {
        alert("YOU ARE DONE! 😈 This is your food!");
      }
      console.log(response.data.meals[0]);
    })
    .catch(() => {
      console.log("yo? why you broke again? Call for backup!");
    });
}

// randomly select one item from a given array
function randomSelector(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// visual //
function visualGeneration(name, img) {
  let mealResultContainerEl = document.querySelector(
    ".meal-results__container"
  );

  mealResultContainerEl.innerHTML = "";
  
  let mealResultListEl = document.createElement("li");
  mealResultListEl.innerText = "";
  mealResultListEl.classList.add("meal-results__list");

  let mealResultImageEl = document.createElement("img");
  mealResultImageEl.classList.add("meal-results__image");
  mealResultImageEl.src = img;
  mealResultListEl.appendChild(mealResultImageEl);

  let mealResultNameEl = document.createElement("p");
  mealResultNameEl.classList.add("meal-results__name");
  mealResultNameEl.innerText = name;
  mealResultListEl.appendChild(mealResultNameEl);
  mealResultContainerEl.appendChild(mealResultListEl);

  let mealJokeEl = document.createElement("div");

  let mealJokeHeadingEl = document.createElement("p");
  mealJokeHeadingEl.innerText = "Food Quote";
  mealJokeHeadingEl.classList.add("meal-jokes__heading");

  mealJokeEl.appendChild(mealJokeHeadingEl);

let randomJoke = randomSelector(foodJokes);

let mealJokeContentEl = document.createElement("p");
mealJokeContentEl.innerText = randomJoke.joke;
mealJokeContentEl.classList.add("meal-jokes__content");

mealJokeEl.appendChild(mealJokeContentEl);

mealResultContainerEl.appendChild(mealJokeEl);
}

function incrementCounter() {
  return counter++;
}

function getCounter() {
  return counter;
}

// button fuctionality
let formEl = document.querySelector(".form");

let buttonSearchEl = document.getElementById("buttonSearch");

let buttonRandomEl = document.getElementById("buttonRandom");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let formInputCuisineValue = event.target.formInput.value;
  fetchByArea(formInputCuisineValue);
  incrementCounter();
  formEl.reset();
});

buttonRandomEl.addEventListener("click", (event) => {
  fetchRandom();
  incrementCounter();
});
