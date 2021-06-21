exports.isAuthorized = async (req, res) => {
  console.log(req.session.isAuthorized);

  if (req.session.isAuthorized) {
    res.send({ ok: true });
  } else {
    res.send({ ok: false });
  }
};
