import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utility/sendJSONResponse.js";
import { getDataByPathParams } from "./utility/getDataByPathParams.js";
import { getDataByQueryParams } from "./utility/getDataByQueryParams.js";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();

  const urlObj = new URL(req.url, `http://${req.headers.host}`);

  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (urlObj.pathname === "/api" && req.method === "GET") {
    let filteredDestinations = getDataByQueryParams(destinations, queryObj);

    sendJSONResponse(res, 200, destinations);
  } else if (req.url.startsWith("/api/continent") && req.method === "GET") {
    const continent = req.url.split("/").pop();
    const filteredData = getDataByPathParams(
      destinations,
      "continent",
      continent,
    );
    sendJSONResponse(res, 200, filteredData);
  } else if (req.url.startsWith("/api/country") && req.method === "GET") {
    const country = req.url.split("/").pop();
    const filteredData = getDataByPathParams(destinations, "country", country);

    sendJSONResponse(res, 200, filteredData);
  } else {
    res.setHeader("Content-Type", "application/json");
    sendJSONResponse(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
