const INPUT_FIELD = document.getElementById("text__input__field");
const SEARCH_BUTTON = document.getElementById("search__btn");
let MOVIE_INFO_CONTAINER = document.getElementById("movie__info__container");
// add a click event to the search button
SEARCH_BUTTON.addEventListener("click", getMovieInfo);

// create a function called getMovieInfo
async function getMovieInfo(e) {
  // this is to prevent the form from auto refreshing
  e.preventDefault();
  // the movie to search for
  const movieTitle = INPUT_FIELD.value.trim();

  // show loading text while getting the movie
  MOVIE_INFO_CONTAINER.innerHTML = `<section class="flex justify-center items-center max-w-[600px] bg-white p-4 rounded-md gap-5">
  <div class="loader"></div>
  <h1 class="text-[2rem] bg-white p-2 rounded-md font-bold">Getting movie...</h1>
  </section>`;

  try {
    // make an https request to the movie api using the movie title
    const data = await fetch(
      `https://www.omdbapi.com/?apikey=d825d899&t=${movieTitle}`
    );
    const movieInfo = await data.json();

    console.log(movieInfo);
    // check if movie was not found
    if (movieInfo.Error) {
      MOVIE_INFO_CONTAINER.innerHTML = `<h1 class="text-[4rem] text-red-400 bg-white">${movieInfo.Error}</h1>`;
      return;
    }

    // show the actual movie info
    MOVIE_INFO_CONTAINER.innerHTML = `<section
          class="flex flex-col lg:flex-row gap-5 max-w-[600px] w-full justify-between bg-white p-4 rounded-lg"
        >
          <div>
            <h2 class="text-3xl font-bold tracking-wider">${movieInfo.Title}</h2>
            <p>
              <strong class="mr-2">Year:</strong>
              <span class="text-gray-500">${movieInfo.Year}</span>
            </p>
            <p>
              <strong class="mr-2">Released:</strong>
              <span class="text-gray-500">${movieInfo.Released}</span>
            </p>
            <p>
              <strong class="mr-2">Duration:</strong>
              <span class="text-gray-500">${movieInfo.Runtime}</span>
            </p>
            <p>
              <strong class="mr-2">Genre:</strong>
              <span class="text-gray-500">${movieInfo.Genre}</span>
            </p>
            <p>
              <strong class="mr-2">Director:</strong>
              <span class="text-gray-500">${movieInfo.Director}</span>
            </p>
            <p>
              <strong class="mr-2">Plot:</strong>
              <span class="text-gray-500">${movieInfo.Plot}</span>
            </p>
            <p>
              <strong class="mr-2">Awards:</strong>
              <span class="text-gray-500">${movieInfo.Awards}</span>
            </p>
          </div>
          <div>
            <img
              class="max-w-[600px] w-full rounded-md"
              src=${movieInfo.Poster}
              alt="movie poster"
            />
          </div>
        </section>`;
  } catch (error) {
    console.log(error);
  }
}
