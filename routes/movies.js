const router = require('express').Router();

const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validators');
const { findMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', findMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
