import express, { json } from 'express';


const app = express();
const PORT = process.env.port || 5000;


app.use(json());

app.get('/', (req, res) => {
  res.send('Backend is running! STATUS CODE: 200');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
