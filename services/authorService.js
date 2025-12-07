const { Author, Post } = require('../models');

const createAuthor = (data) => Author.create(data);

const getAllAuthors = () => Author.findAll();

const getAuthorById = (id) => Author.findByPk(id);

const updateAuthor = async (id, data) => {
  const author = await Author.findByPk(id);
  if (!author) return null;
  return author.update(data);
};

const deleteAuthor = async (id) => {
  const author = await Author.findByPk(id);
  if (!author) return null;
  await author.destroy(); // cascade posts
  return author;
};

const getPostsForAuthor = async (id) => {
  const author = await Author.findByPk(id);
  if (!author) return null;
  const posts = await Post.findAll({ where: { authorId: id } });
  return { author, posts };
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getPostsForAuthor,
};
