// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

// GET route - Create a movie
router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((allTheCelebritiesFromDB) => {
      console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDB);
      res.render("movies/new-movie", { celebrities: allTheCelebritiesFromDB });
    })
    .catch((error) => next(error));
});

// POST route - Create a movie
router.post("/movies/create", (req, res, next) => {
  
    // const { title, genre, plot, cast } = req.body;

    // Movie.create({ title, genre, plot })
    Movie.create(req.body)
      .then(() => res.redirect("/movies/movies"))
      .catch((err) => {
        console.log(err);
        res.render("movies/movies");
      });
});

// GET route - Show all movies
router.get("/movies/movies", (req, res) => {
    Movie.find()
      .then((allTheMoviesFromDB) => {
        //console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDB);
        res.render("movies/movies", {
          movies: allTheMoviesFromDB,
        });
      })
      .catch((error) => next(error));
});

// GET - Show a specific movie
router.get("/movies/:movieId", (req, res) => {
const { movieId } = req.params;

Movie.findById(movieId)
  .populate("cast")
  .then((foundMovie) => res.render("movies/movie-details", { foundMovie }))
  .catch((err) => {
    console.log(`Err while getting a single movie from the  DB: ${err}`);
    next(err);
  });
});

router.post("/movies/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then(res.redirect("/movies/movies"))
    .catch((err) => {
      console.log(err);
    });
});





module.exports = router;
