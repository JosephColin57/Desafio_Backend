const express = require("express");

const authUseCase = require("../usecases/auth.usecase");

const router = express.Router();

//POST /auth/login

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await authUseCase.login(email, password);
    response.json({
      success: true,
      message: "Logged in",
      data: {
        token,
      },
    });
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});
