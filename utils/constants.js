module.exports.urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/;

module.exports.messages = {
  successfulFilmRemoval: 'Фильм удалён',
  badRequestError: 'Переданы некорректные данные',
  unauthorizedError: 'Необходима авторизация',
  autorizationDataError: 'Неправильные почта или пароль',
  forbiddenRemovalError: 'Вы не можете удалять чужие фильмы!',
  documentNotFoundError: 'Запрашиваемый объект не найден',
  notFoundError: 'Ресурс не найден. Проверьте URL и метод запроса',
  emailConflictError: 'Пользователь с таким email уже зарегистрирован',
  serverError: 'На сервере произошла ошибка',
};
