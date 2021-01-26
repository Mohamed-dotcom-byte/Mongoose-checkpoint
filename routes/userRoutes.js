const express = require("express");
const router = express.Router();
const Person = require("../model/person");

//CRUD
//Add a new person
router.post("/newUser", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, msg) => {
    if (err) throw err;
    else res.json({ msg: "new person added" });
  });
});

//Add a list of persons
router.post("/newUsers", (req, res) => {
  const arrayOfPerson = req.body;
  Person.create(arrayOfPerson, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "the list is added" });
  });
});

//Find all the people having a given name
router.get("/:name", (req, res) => {
  Person.find({ name: req.params.name }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Find just one person which has a certain food in the person's favorites
router.get("/favouriteFoods/:favouriteFoods", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Get all the people
router.get("/", (req, res) => {
  Person.find({}, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Find the only person having a given id
router.get("/person/:id", (req, res) => {
  Person.find({ _id: req.params.id }, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Update person by id
router.put("/updatePerson/:id", (req, res) => {
  let updatePerson = req.body;
  let personId = req.params.id;
  Person.findByIdAndUpdate({ _id: personId }, updatePerson, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Find a person by Name and update his age.
router.put("/updatePersonByName/:name", (req, res) => {
  let updatePerson = req.body;
  let personByName = req.params.name;
  Person.findOneAndUpdate({ name: personByName }, updatePerson, (err, data) => {
    if (err) throw err;
    else res.send(data);
  });
});

// Delete one person by the person's _id
router.delete("/:id", (req, res) => {
  Person.findByIdAndDelete({ _id: req.params.id }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "person is deleted" });
  });
});

// Delete all the people with the same given name
router.delete("/deletePeople/:name", (req, res) => {
  Person.deleteMany({ name: req.params.name }, (err, msg) => {
    if (err) throw err;
    else res.json({ msg: "all deleted" });
  });
});

// Find people who like pizza
router.get("/person/:favouriteFoods", (req, res) => {
  Person.find({ favouriteFoods: req.params.favouriteFoods })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) throw err;
      else res.send(data);
    });
});
module.exports = router;
