const fs = require("fs");
const http = require("http");
// const { type } = require("os");
// const { join } = require("path/posix");
const url = require("url");
const replaceFunc = require("./module/newFunc");

// Blocking synchronous way
// const hello = "Hello World";
// console.log(hello);
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the file ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("Done");

// Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return console.log("ERROR :D");
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("FILE HAS BEEN WRITTEN");
//       });
//     });
//   });
// });

// const testCall = fs.readFile("./txt/final.txt", "utf-8", (err, data) => {
//   console.log("Reading");
// });
// console.log(testCall);

// making a server
// const server = http.createServer((req, res) => {
//   res.end("Hello! Welcome to the server boi");
// });

// server.listen(8000, "localhost", () => {
//   // 8000 is the port and  127.0.0.1 is the ip address where we want to deploy the server
//   console.log("Now listening on port 8000");
// });

// routing and building an api
//method 2 : won't have to read the data each time teh call is made

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const template = fs.readFileSync(`${__dirname}/templates/temp.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // console.log(query);
  // console.log(pathName);
  // const packageName = req.url;

  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const tempObj = dataObj.map((el) => replaceFunc(template, el)).join(" ");
    const output = tempOverview.replace("{%PRODUCT_CARD%}", tempObj);
    res.end(output);
    // res.end("hello");
  } else if (pathname === "/products") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceFunc(tempProduct, product);
    res.end(output);

    res.end("Hello there");
  } else if (pathname === "/api") {
    //Method 1 : reads the data each time the call is made(kinda inefficient)
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const dataRead = JSON.parse(data);
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end("Hello! Welcome to the server boi");
  }
});

server.listen(8000, "localhost", () => {
  // 8000 is the port and  127.0.0.1 is the ip address where we want to deploy the server
  console.log("Now listening on port 8000");
});
