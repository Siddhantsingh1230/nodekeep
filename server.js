import { app } from "./app.js";

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode ,CORS valid for ${process.env.FRONTEND_URI}`);
  });
