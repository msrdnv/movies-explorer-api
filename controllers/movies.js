const Movie = require('../models/movie');
const ForbiddenError = require('../utils/ForbiddenError');

const returnMovieInfo = (data) => ({
  country: data.country,
  director: data.director,
  duration: data.duration,
  year: data.year,
  description: data.description,
  image: data.image,
  trailerLink: data.trailerLink,
  thumbnail: data.thumbnail,
  owner: data.owner,
  movieId: data.movieId,
  nameRU: data.nameRU,
  nameEN: data.nameEN,
});

module.exports.findMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.send(data.map((item) => returnMovieInfo(item))))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    owner: req.user._id,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((data) => res.status(201).send(returnMovieInfo(data)))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалять чужие карточки!'));
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .orFail()
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch(next);
};
