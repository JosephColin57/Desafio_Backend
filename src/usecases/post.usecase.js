const Post = require("../models/post.model");
const createError = require("http-errors");

async function createPost(postData, userId) {
  try {
    const post = new Post({ ...postData, user: userId });

    const savePost = await post.save();

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

    const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
      new: true,
    });

    return updatedPost;
  } catch (error) {
    throw createError(400, error.message);
  }
}

async function deletePost(postId, userId) {
  try {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      throw createError(404, "Post not found");
    }

    if (post.user.toString() !== userId) {
      throw createError(401, "Unauthorized");
    }
  } catch (error) {
    throw createError(400, error.message);
  }
}

async function getAllPosts(search = "") {
  try {
    let query = {}

    if (search) {
      query = { title: { $regex: search, $options: "i" } };
    }

    const posts = await Post.find(query).populate("user");
    return posts;
    
  } catch (error) {
    throw createError(400, error.message);
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
