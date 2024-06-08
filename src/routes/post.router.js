const express = require("express");
const postUseCase = require("../usecases/post.usecase");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

// GET /POST

router.get("/", async (request, response) => {
  try {
    let search = request.query.search || "";
    let posts = await postUseCase.getAllPosts(search = "");
    response.json({
      success: true,
      message: "All posts",
      data: {
        posts,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// POST /POST

router.post("/",auth, async (request, response) => {
  try {
    const userId = request.user.id;
    const post = request.body;
    const newPost = await postUseCase.createPost(post, userId);

    response.json({
      success: true,
      message: "Post created",
      data: {
        post: newPost,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// PATCH /posts/:id

router.patch("/:id", auth, async (request, response) => {
  try {
    const userId = request.user.id;
    const { id } = request.params;
    const post = request.body;
    const updatedPost = await postUseCase.updatePost(id, post, userId);
    response.json({
      success: true,
      message: "Post updated",
      data: {
        post: updatedPost,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE /posts/:id

router.delete("/:id", auth, async (request, response) => {
  try {
    const userId = request.user.id;
    const { id } = request.params;
    await postUseCase.deletePost(id, userId);
    response.json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
