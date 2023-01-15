const express = require("express");
var cors = require("cors");
var jwt = require("jsonwebtoken");
const app = express();
var morgan = require("morgan");
var faker = require("faker");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var db = require("../Firebase/firebase.js");

const port = 8080;

const saltRounds = 10;
const secret = "secret";

function checkAuthorization(req, res, next) {
  const bearerHeader = req.headers["Authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {

          res.json({ message: "Your token expired!" });
        } else {
          res.json({ message: "Decoding error!" });
        }
      } else {
        console.log(decoded.email);
        next();
      }
    });
  } else {
    res.json({ message: "Missing token!" });
  }
}

app.listen(port, () => {
  console.log(`Serverul a pornit pe portul ${port}`);
});

app.post("/register", async (req, res) => {
  let data = req.body;
  let emailExist = false;

  const userRef = db.collection("Users");
  const snapshot = await userRef.where("email", "==", data.email).get();
  if (!snapshot.empty) {
    emailExist = true;
  }
  if (emailExist) {
    res.send(
      "Utilizator deja existent. Adresa de mail exista deja in baza de date"
    );
  } else {
    bcrypt.hash(data.password, saltRounds).then(async function (hash) {
      data.password = hash;
      const user = await db.collection("Sellers").add(data);
      console.log(`TE-AI INREGISTRAT CU ID-UL :  ${user.id}`);
      res.send("Inregistrarea a fost efectuata cu succes");
    });
  }
});

app.post("/login", async (req, res) => {
  let data = req.body;
  let emailFound = false;
  const usersRef = db.collection("Sellers");
  const snapshot = await usersRef.where("email", "==", data.email).get();
  if (snapshot.empty) {
    res.json("Nu a fost gasita nici-o adresa de mail");
  } else {
    emailFound = true;
    snapshot.forEach((doc) => {
      bcrypt
        .compare(data.password, doc.data().password)
        .then(async function (result) {
          if (result) {
            let token = jwt.sign(
              {
                email: doc.data().email,
              },
              secret,
              { expiresIn: 60 * 60 }
            );
            let response = {
              message: "Te-ai logat cu succes",
              token: token,
              seller: {
                id: doc.id,
                nume: doc.data().nume,
                email: doc.data().email,
                username: doc.data().username,
              },
            };
            response.token = token;
            console.log(response);
            res.json(response);
          } else {
            let response = {};
            response.message =
              "Parola nu corespunde adresei de mail mentionate";
            res.json(response);
          }
        });
    });
  }
});

//populare random laptopuri / telefoane / desktopuri
app.post("/laptopuri", async (req, res) => {
  let usersIds = await getIDSellers(res);
  for (let i = 0; i < 10; i++) {
    let obj = {
      idVanzator: usersIds[Math.floor(Math.random() * usersIds.length)].id,
      nume: "Laptop " + faker.commerce.productName(),
      pret: faker.commerce.price(),
      descriere: faker.commerce.productDescription(),
      culoare: faker.commerce.color(),
    };
    await db.collection("Laptopuri").add(obj);
  }
  res.send("Acestea sunt laptopurile puse la dispozitie");
});

app.post("/telefoane", async (req, res) => {
  let usersIds = await getIDSellers(res);
  for (let i = 0; i < 10; i++) {
    let obj = {
      idVanzator: usersIds[Math.floor(Math.random() * usersIds.length)].id,
      nume: "Telefon " + faker.commerce.productName(),
      pret: faker.commerce.price(),
      descriere: faker.commerce.productDescription(),
      culoare: faker.commerce.color(),
    };
    await db.collection("Telefoane").add(obj);
  }
  res.send("Acestea sunt telefoanele puse la dispozitie");
});

app.post("/desktopuri", async (req, res) => {
  let usersIds = await getIDSellers(res);
  for (let i = 0; i < 10; i++) {
    let obj = {
      idVanzator: usersIds[Math.floor(Math.random() * usersIds.length)].id,
      nume: "Desktop " + faker.commerce.productName(),
      pret: faker.commerce.price(),
      descriere: faker.commerce.productDescription(),
      culoare: faker.commerce.color(),
    };
    await db.collection("Desktopuri").add(obj);
  }
  res.send("Acestea sunt desktopurile puse la dispozitie");
});

//adaugare 1 laptop / telefon / desktop
app.post("/laptop", async (req, res) => {
  await db.collection("Sellers").doc(body.idVanzator).get();
  let laptop = {
    idVanzator: body.idVanzator,
    nume: body.nume,
    pret: body.pret,
    descriere: body.culoare,
    culoare: body.culoare,
  };
  await db.collection("Laptopuri").add(laptop);
});

app.post("/telefon", async (req, res) => {
  await db.collection("Sellers").doc(body.idVanzator).get();
  let telefon = {
    idVanzator: body.idVanzator,
    nume: body.nume,
    pret: body.pret,
    descriere: body.culoare,
    culoare: body.culoare,
  };
  await db.collection("Telefoane").add(telefon);
});

app.post("/desktop", async (req, res) => {
  let usersIds = await getIDSellers(res);
  await db.collection("Sellers").doc(usersIds).get();
  let bod = req.body;
  let desktop = {
    idVanzator: usersIds,
    nume: bod.nume,
    pret: bod.pret,
    descriere: bod.culoare,
    culoare: bod.culoare,
  };
  await db.collection("Desktopuri").add(desktop);
});

//populare random cu vanzatori
app.post("/sellers", async (req, res) => {
  for (let i = 0; i < 3; i++) {
    let seller = {
      nume: faker.name.firstName(),
      prenume: faker.name.lastName(),
      email: faker.internet.email(),
    };
    await db.collection("Sellers").add(seller);
  }
  res.send("Acestia sunt vanzatorii magazinului");
});

//get all sellers
app.get("/sellers", async (req, res) => {
  await getSellers(res);
});

app.get("/sellers/ids", async (req, res) => {
  await getIDSellers(res);
});

//get desktopuri in functie de idSeller
app.get("/sellers/:idVanzator", async (req, res) => {
  let obiecte = [];
  let desktops = [];
  let telefoane = [];
  let laptopuri = [];
  let exist = false;
  try {
    const idSeller = req.query.idVanzator;
    const snapShot = await db
      .collection("Desktopuri")
      .where("idVanzator", "==", idSeller)
      .get();
    snapShot.forEach((doc) => {
      let desktop = {
        id: doc.id,
        idVanzator: doc.data().idVanzator,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      desktops.push(desktop);
      exist = true;
    });
    ///////
    const idSeller2 = req.query.idVanzator;
    const snapShot2 = await db
      .collection("Laptopuri")
      .where("idVanzator", "==", idSeller2)
      .get();
    snapShot2.forEach((doc) => {
      let laptop = {
        id: doc.id,
        idVanzator: doc.data().idVanzator,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      laptopuri.push(laptop);
      exist = true;
    });
    //////
    const idSeller3 = req.query.idVanzator;
    const snapShot3 = await db
      .collection("Telefoane")
      .where("idVanzator", "==", idSeller3)
      .get();
    snapShot3.forEach((doc) => {
      let telefon = {
        id: doc.id,
        idVanzator: doc.data().idVanzator,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      telefoane.push(telefon);
      exist = true;
    });

    obiecte.push(desktops);
    obiecte.push(telefoane);
    obiecte.push(laptopuri);
    if (exist) {
      res.status(200).send(obiecte);
    } else {
      res.status(404).send("Nu exista niciun desktop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get dupa culoare pentru laptop / telefon / desktop
app.get("/laptopuri/culoare", async (req, res) => {
  let laptops = [];
  let exist = false;
  try {
    const culoare = req.query.culoare;
    const snapShot = await db
      .collection("Laptopuri")
      .where("culoare", "==", culoare)
      .get();
    snapShot.forEach((doc) => {
      let laptop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      laptops.push(laptop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(laptops);
    } else {
      res.status(404).send("Nu exissta");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/telefoane/culoare", async (req, res) => {
  let telefoane = [];
  let exist = false;
  try {
    const culoare = req.query.culoare;
    const snapShot = await db
      .collection("Telefoane")
      .where("culoare", "==", culoare)
      .get();
    snapShot.forEach((doc) => {
      let telefon = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      telefoane.push(telefon);
      exist = true;
    });
    if (exist) {
      res.status(200).send(telefoane);
    } else {
      res.status(404).send("Nu exista niciun telefon");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/desktopuri/culoare", async (req, res) => {
  let desktops = [];
  let exist = false;
  try {
    const culoare = req.query.culoare;
    const snapShot = await db
      .collection("Desktopuri")
      .where("culoare", "==", culoare)
      .get();
    snapShot.forEach((doc) => {
      let desktop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      desktops.push(desktop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(desktops);
    } else {
      res.status(404).send("Nu exista niciun desktop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//ruta de afisare toate obiectele
app.get("/laptopuri", async (req, res) => {
  let vLaptops = [];
  let exist = false;
  try {
    const snapShot = await db.collection("Laptopuri").get();
    snapShot.forEach((doc) => {
      let laptop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
        idVanzator: doc.data().idVanzator,
      };
      vLaptops.push(laptop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(vLaptops);
    } else {
      res.status(404).send("Nu exista niciun laptop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/telefoane", async (req, res) => {
  let vTelefoane = [];
  let exist = false;
  try {
    const snapShot = await db.collection("Telefoane").get();
    snapShot.forEach((doc) => {
      let telefon = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
        idVanzator: doc.data().idVanzator,
      };
      vTelefoane.push(telefon);
      exist = true;
    });
    if (exist) {
      res.status(200).send(vTelefoane);
    } else {
      res.status(404).send("Nu exista niciun laptop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/desktopuri", async (req, res) => {
  let vDesktops = [];
  let exist = false;
  try {
    const snapShot = await db.collection("Desktopuri").get();
    snapShot.forEach((doc) => {
      let desktop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
        idVanzator: doc.data().idVanzator,
      };
      vDesktops.push(desktop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(vDesktops);
    } else {
      res.status(404).send("Nu exista niciun laptop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get dupa pret pentru laptop / telefon / desktop
app.get("/laptopuri/pret", async (req, res) => {
  let laptops = [];
  let exist = false;
  try {
    const pret = req.query.pret;
    const snapShot = await db
      .collection("Laptopuri")
      .where("pret", "==", pret)
      .get();
    snapShot.forEach((doc) => {
      let laptop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
        idVanzator: doc.data().idVanzator,
      };
      laptops.push(laptop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(laptops);
    } else {
      res.status(404).send("Nu exista niciun laptop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/telefoane/pret", async (req, res) => {
  let telefoane = [];
  let exist = false;
  try {
    const pret = req.query.pret;
    const snapShot = await db
      .collection("Telefoane")
      .where("pret", "==", pret)
      .get();
    snapShot.forEach((doc) => {
      let telefon = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
        idVanzator: doc.data().idVanzator,
      };
      telefoane.push(telefon);
      exist = true;
    });
    if (exist) {
      res.status(200).send(telefoane);
    } else {
      res.status(404).send("Nu exista niciun telefon");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/desktopuri/pret", async (req, res) => {
  let desktops = [];
  let exist = false;
  try {
    const pret = req.query.pret;
    const snapShot = await db
      .collection("Desktopuri")
      .where("pret", "==", pret)
      .get();
    snapShot.forEach((doc) => {
      let desktop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
        idVanzator: doc.data().idVanzator,
      };
      desktops.push(desktop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(desktops);
    } else {
      res.status(404).send("Nu exista niciun desktop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get dupa dupa pentru laptop / telefon / desktop
app.get("/laptopuri/nume", async (req, res) => {
  let laptops = [];
  let exist = false;
  try {
    const nume = req.query.nume;
    const snapShot = await db
      .collection("Laptopuri")
      .where("nume", "==", nume)
      .get();
    snapShot.forEach((doc) => {
      let laptop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      laptops.push(laptop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(laptops);
    } else {
      res.status(404).send("Nu exista niciun laptop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/telefoane/nume", async (req, res) => {
  let telefoane = [];
  let exist = false;
  try {
    const nume = req.query.nume;
    const snapShot = await db
      .collection("Telefoane")
      .where("nume", "==", nume)
      .get();
    snapShot.forEach((doc) => {
      let telefon = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      telefoane.push(telefon);
      exist = true;
    });
    if (exist) {
      res.status(200).send(telefoane);
    } else {
      res.status(404).send("Nu exista niciun desktop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/desktopuri/nume", async (req, res) => {
  let desktops = [];
  let exist = false;
  try {
    const nume = req.query.nume;
    const snapShot = await db
      .collection("Desktopuri")
      .where("nume", "==", nume)
      .get();
    snapShot.forEach((doc) => {
      let desktop = {
        id: doc.id,
        culoare: doc.data().culoare,
        nume: doc.data().nume,
        pret: doc.data().pret,
        descriere: doc.data().descriere,
      };
      desktops.push(desktop);
      exist = true;
    });
    if (exist) {
      res.status(200).send(desktops);
    } else {
      res.status(404).send("Nu exista niciun desktop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//ruta de cautare obiect cu id
app.get("/laptop/:id", async (req, res) => {
  try {
    let ids = req.params.id;
    let laptop = await db.collection("Laptopuri").doc(ids).get();
    let obj = {
      id: laptop.id,
      nume: laptop.data().nume,
      pret: laptop.data().pret,
      culoare: laptop.data().culoare,
      descriere: laptop.data().descriere,
    };
    if (laptop.exists) {
      res.send(obj);
    } else {
      res.status(404).send("N-avem sherifule");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/telefon/:id", async (req, res) => {
  try {
    let ids = req.params.id;
    let telefon = await db.collection("Telefoane").doc(ids).get();
    let obj = {
      id: telefon.id,
      nume: telefon.data().nume,
      pret: telefon.data().pret,
      culoare: telefon.data().culoare,
      descriere: telefon.data().descriere,
    };
    if (telefon.exists) {
      res.send(obj);
    } else {
      res.status(404).send("N-avem sherifule");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/desktop/:id", async (req, res) => {
  try {
    let ids = req.params.id;
    let desktop = await db.collection("Desktopuri").doc(ids).get();
    let obj = {
      id: desktop.id,
      nume: desktop.data().nume,
      pret: desktop.data().pret,
      culoare: desktop.data().culoare,
      descriere: desktop.data().descriere,
    };
    if (desktop.exists) {
      res.send(obj);
    } else {
      res.status(404).send("N-avem sherifule");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//ruta de postat un laptop/telefon/desktop
app.post("/addlaptop", async (req, res) => {
  try {
    let data = req.body;
    let laptop = {
      nume: data.nume,
      descriere: data.descriere,
      pret: data.pret,
      culoare: data.culoare,
      idVanzator: data.idVanzator,
    };
    let snapShot = await db.collection("Laptopuri").add(laptop);
    if (!snapShot.exist) {
      res.send("Laptopul tau a fost postat cu succes!");
    } else {
      res.send("Nu s-a putut adauga niciun laptop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/addtelefon", async (req, res) => {
  try {
    let data = req.body;
    let telefon = {
      nume: data.nume,
      descriere: data.descriere,
      pret: data.pret,
      culoare: data.culoare,
      idVanzator: data.idVanzator,
    };
    let snapShot = await db.collection("Telefoane").add(telefon);
    if (!snapShot.exist) {
      res.send("Telefonul tau a fost postat cu succes!");
    } else {
      res.send("Nu s-a putut adauga niciun telefon");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/adddesktop", async (req, res) => {
  try {
    let data = req.body;
    let desktop = {
      nume: data.nume,
      descriere: data.descriere,
      pret: data.pret,
      culoare: data.culoare,
      idVanzator: data.idVanzator,
    };
    let snapShot = await db.collection("Desktopuri").add(desktop);
    if (!snapShot.exist) {
      res.send("Desktopul tau a fost postat cu succes!");
    } else {
      res.send("Nu s-a putut adauga niciun desktop");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//ruta de update pentru un laptop/telefon/desktop
app.put("/laptop/:id", async (req, res) => {
  try {
    let ids = req.params.id;
    let data = req.body;
    let snapshot = await db.collection("Laptopuri").doc(ids).update(data);
    if (!snapshot.exist) {
      res.send("S-a actualizat dupa dorinta ta Sherifule");
    } else {
      res.send("N-am inteles ce vrei");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/telefon/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let snapshot = await db.collection("Telefoane").doc(id).update(data);
    if (!snapshot.exist) {
      res.send("S-a actualizat dupa dorinta ta Sherifule");
    } else {
      res.send("N-am inteles ce vrei");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/desktop/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let snapshot = await db.collection("Desktopuri").doc(id).update(data);
    if (!snapshot.exist) {
      res.send("S-a actualizat dupa dorinta ta Sherifule");
    } else {
      res.send("N-am inteles ce vrei");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//ruta de delete pentru un laptop/telefon/desktop
app.delete("/laptop/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let snapshot = await db.collection("Laptopuri").doc(id).delete();
    if (!snapshot.exist) {
      res.send("Laptopul a fost sters cu succes!");
    } else {
      res.send(
        "Nu s-a gasit produsul specificat de tine. Nu se poate sterge nimic."
      );
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/telefon/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let snapshot = await db.collection("Telefoane").doc(id).delete();
    if (!snapshot.exist) {
      res.send("Telefonul a fost sters cu succes!");
    } else {
      res.send(
        "Nu s-a gasit produsul specificat de tine. Nu se poate sterge nimic."
      );
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/desktop/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let snapshot = await db.collection("Desktopuri").doc(id).delete();
    if (!snapshot.exist) {
      res.send("Desktopul a fost sters cu succes!");
    } else {
      res.send(
        "Nu s-a gasit produsul specificat de tine. Nu se poate sterge nimic."
      );
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = app;
module.exports = db;

async function getSellers(res) {
  let sellers = [];
  let exist = false;
  try {
    let snap = await db.collection("Sellers").get();
    snap.forEach((doc) => {
      let seller = {
        id: doc.id,
        nume: doc.data().nume,
        prenume: doc.data().prenume,
        sex: doc.data().sex,
        email: doc.data().email,
      };
      sellers.push(seller);
      exist = true;
    });
    if (exist) {
      res.status(200).send(sellers);
      return sellers;
    } else {
      res.status(404).send("Nu exista niciun vanzator");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getIDSellers(res) {
  let sellers = [];
  let exist = false;
  try {
    let snap = await db.collection("Sellers").get();
    snap.forEach((doc) => {
      let seller = {
        id: doc.id,
      };
      sellers.push(seller);
      exist = true;
    });
    console.log(sellers, exist);
    if (exist) {
      return sellers;
    } else {
      return "Nu exista vanzatori";
    }
  } catch (error) {
    return error.message;
  }
}
