const createError = require("http-errors");
const userUseCase = require("../usecases/user.usecase");
const jwt = require("../lib/jwt");

async function auth(request, response, next) {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createError(401, "Token is required");
    }
    const payload = jwt.verify(token);
    request.user = await userUseCase.getUserById(payload.id);
    next();
  } catch (error) {
    response.status(error.status || 400);
    response.json({
      success: false,
      message: error.message,
    });
  }
}
