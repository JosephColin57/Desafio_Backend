const express = require("express");
const userUseCase = require("../usecases/user.usecase");

const router = express.Router();

//GET

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await userUseCase.getUserById(id);
    response.json({
      success: true,
      message: "User found",
      data: {
        user,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
})

//POST

router.post("/", async (request, response) => {
  try {
    const user = request.body;
    const newUser = await userUseCase.createUser(user);
    response.json({
      success: true,
      message: "User created",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
})

module.exports = router;