const Post = require("../models/post.model");
const createError = require("http-errors");

async function createPost(postData, userId) {
  try {
    const post = new Post({ ...postData, user: userId });

    const savePost = await Post.createPost(post);

    return savePost;
  } catch (error) {
    throw createError(400, error.message);
  }
}

async function updatePost(postId, postData, userId) {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== userId) {
      throw createError(401, "Unauthorized");
    }

    const updatedPost = await Post.updatePost(postId, postData);

    return updatedPost;
  } catch (error) {
    throw createError(400, error.message);
  }
}

async function deletePost(postId, userId) {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== userId) {
      throw createError(401, "Unauthorized");
    }

    await Post.deletePost(postId);

    return;
  } catch (error) {
    throw createError(400, error.message);
  }
}

async function getAll(search = "") {
  try {
    let posts = await Post.find();
    if (search) {
      posts = posts.filter(function (post) {
        return post.title.includes(search);
      });
    }
    return posts;
  } catch (error) {
    throw createError(400, error.message);
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAll,
};
