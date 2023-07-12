import app from './app';
import { Database } from './server/data/data';

const port = 8000;

// Define your routes and middleware here

app.listen(port, () => {
  Database.connect();
  console.log(`Server is running on port ${port}.`);
});
