module.exports.success = function (data) {
  return { status: 'success', data };
};

module.exports.error = function (message) {
  return { status: 'error', message };
};

module.exports.handleErr = function (res, err) {
  if (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Petit problème de serveur 😯 veuillez réessayer !',
      err,
    });
  }
};
