exports.isAuthorized = async (req, res) => {
  console.log(req.session);
  if (req.user) {
    res.send({ ok: true });
  } else {
    res.send({ ok: false });
  }
};
