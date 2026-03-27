import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  // End send data over http and ends a response
  if (req.url === "/api" && req.method === "GET") {
    res.end("This is some data \n");
  } else {
    res.end("Not found");
  }
});

server.listen(PORT, () => console.log(`Server running on port:${PORT}`));
