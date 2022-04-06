const handleNonExcistPage = (req, res) => {
  res.status(404).send({ message: 'Requested resource not found, please try again !' });
};

module.exports = { handleNonExcistPage };
