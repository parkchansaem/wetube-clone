import "./db";
import "./models/Video";
import app from "./server";
const PORT = 5001;
const handlelistening = () =>
  console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handlelistening);
