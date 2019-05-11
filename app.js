import express from 'express';
import test_db from './lib/test_db';

const app = express();

app.get('/api/parks/magic_kingdom/attractions', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Magic Kingdom attractions received',
    attractions: test_db
  })
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})