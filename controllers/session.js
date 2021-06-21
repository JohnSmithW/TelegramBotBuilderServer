exports.isAuthorized = async (req, res) => {
  if (req.session.isAuthorized) {
    res.send({ ok: true });
  } else {
    res.send({ ok: false });
  }
};
