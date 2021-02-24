import express from "express";
import path from "path";

const app = express();

app.use(
  "/static",
  express.static(path.resolve(__dirname, "assets"), {
    setHeaders(res, path) {
      console.log("static");

      const isRevved = /[a-f0-9]{7,}/.exec(path);
      res.setHeader(
        "Cache-Control",
        isRevved
          ? `public, max-age=31536000, immutable` // only stored by the browser cache
          : `public, max-age=0, s-maxage=31536000` // stored by the cdn cache
      );
    },
  })
);

app.get("/", function (request, response) {
  response.sendFile(path.resolve(__dirname, "build/index.html"));
});

const portArgIndex = process.argv.indexOf("-p");

const port =
  portArgIndex > -1
    ? process.argv[portArgIndex + 1]
    : process.env.PORT
    ? process.env.PORT
    : "3000";

if (isNaN(parseInt(port))) {
  throw new Error(
    `Port arg/env should be convertible to type number. Received, Value: ${port} Type: ${typeof port}`
  );
}

app.listen(port, () => console.log(`Listening on port ${port}`));
