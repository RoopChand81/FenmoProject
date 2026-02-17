const register = async (req, res) => {
  res.json({ message: "Register working" });
};

const login = async (req, res) => {
  res.json({ message: "Login working" });
};

module.exports = { register, login };
