const { Author, Post } = require('../models');

const createPost = async (data) => {
  // validate author existence
  const author = await Author.findByPk(data.authorId);
  if (!author) return null; // invalid authorId
  return Post.create(data);
};

const getAllPosts = (authorId) => {
  const where = {};
  if (authorId) where.authorId = authorId;

  // include author → JOIN → avoids N+1 problem
  return Post.findAll({
    where,
    include: [{
      model: Author,
      as: 'author',
      attributes: ['id', 'name', 'email'],
    }],
  });
};

const getPostById = (id) => {
  return Post.findByPk(id, {
    include: [{
      model: Author,
      as: 'author',
      attributes: ['id', 'name', 'email'],
    }],
  });
};

const updatePost = async (id, data) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  return post.update(data);
};

const deletePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
