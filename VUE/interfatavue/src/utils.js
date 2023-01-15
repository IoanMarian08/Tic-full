let url = "http://127.0.0.1:8080/";

let globalRequestParameters = {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

let sortarepret = function (a, b) {
  if (a.pret < b.pret) {
    return -1;
  }
  if (a.pret > b.pret) {
    return 1;
  }
  return 0;
};

module.exports.globalRequestParameters = globalRequestParameters;
module.exports.url = url;
module.exports.sortarepret = sortarepret;
