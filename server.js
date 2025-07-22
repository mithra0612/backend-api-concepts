const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/register", (req, res) => {
  const user = req.body;
  console.log(user);
  const { username, email, password } = user;
  function isAlphanumeric(str) {
    return /^[a-z0-9]+$/i.test(str);
  }
  if (
    isAlphanumeric(username) &&
    username.length >= 3 &&
    username.length <= 20
  ) {
    if (email.includes("@example.com")) {
      if (password.length >= 6) {
        res.status(201).send({
          message: "User registered successfully",
          user,
        });
        console.log(res);
      } else {
        res.status(400).send({
          error: "Password must be at least 6 characters",
        });
      }
    } else {
      res.status(400).send({
        error: "Email must contain .example.com",
      });
    }
  } else {
    res.status(401).send({
        error:"Username should only contain alphanumeric values",
    })
  }
});

PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
