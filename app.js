const express = require('express');
const { initDB } = require('./models');
const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());          // JSON body parser

app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running' });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
