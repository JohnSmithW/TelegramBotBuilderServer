exports.isAuthorized = async (req, res) => {
  if (req.body.isAuthorized) {
    res.send({ ok: true });
  } else {
    res.send({ ok: false });
  }
}