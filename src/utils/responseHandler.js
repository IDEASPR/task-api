const handleSuccess = (res, data) => {
  res.status(200).json(data);
};

const handleError = (res, error) => {
  res.status(500).json({ error: error.message });
};

module.exports = {
  handleSuccess,
  handleError,
};
