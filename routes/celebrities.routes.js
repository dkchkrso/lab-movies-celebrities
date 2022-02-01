// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// GET route - Create a celebrity
router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

// POST route - Create a celebrity
router.post("/celebrities/create", (req, res, next) => {
    //console.log(req.body)
    const { name, occupation, catchPhrase } = req.body;
    //console.log(name, occupation, catchPhrase);

    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => res.redirect("/celebrities"))
      .catch((error) => next(error));
});

// GET route - Show all celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((allTheCelebritiesFromDB) => {
            //console.log("Retrieved celebrities from DB:", allTheCelebritiesFromDB);
            res.render("celebrities/celebrities", { celebrities: allTheCelebritiesFromDB });
        })
        .catch((error) => next(error));
});



module.exports = router;
