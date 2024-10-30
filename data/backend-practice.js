const xhr = new XMLHttpRequest();
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
xhr.open("GET", "https://supersimplebackend.dev");
//1. type of HTTP message, "GET", "POST", "PUT", "DELETE"
//2. URL to where to send this HTTP message
xhr.send(); //not asunchonise code, i.e. response is late
