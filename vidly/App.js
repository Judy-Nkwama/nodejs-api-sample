const express = require('express');
const App = express();
App.use(express.json());

const movieGenre = [
    {id : 1, title : "Action"},
    {id : 2, title : "Comedy"},
    {id : 3, title : "Drama"},
    {id : 4, title : "Fantasy"},
    {id : 5, title : "Horror"},
    {id : 6, title : "Mystery"},
    {id : 7, title : "Romance"},
    {id : 8, title : "Thriller"}
];

App.get("/genres", (req, res) => {
    res.send(JSON.stringify(movieGenre));
});

App.get("/genres/:id", (req, res) => {
    const genre = movieGenre.filter( g => g.id == parseInt(req.params.id));
    if(genre.length < 1) return res.status(404).send("Genre not fund...");
    res.send(genre);
});

App.post("/genres", (req, res) => {
    if (req.body.title.length < 4) return res.status(400).send("The title of the genre must contain more than 2 characteres");
    const genre = {
        id : movieGenre.length + 1,
        title : req.body.title
    };
    movieGenre.push(genre);
    res.send(genre);
});

App.put("/genres/:id", (req, res) => {

    const genreId = parseInt(req.params.id);
    let genre = movieGenre.filter( g => g.id == genreId);
    if(genre.length < 1) return res.status(404).send("Genre not fund...");
    
    movieGenre[genreId - 1].title = req.body.title;
    genre = movieGenre.filter( g => g.id == genreId);
    res.send(genre);

});

const PORT = process.env.PORT || 5000;
App.listen(PORT, () => console.log(`Listening on port ${PORT}...`));