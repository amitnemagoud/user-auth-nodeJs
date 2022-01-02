const router = require("express").Router();
const verify= require("./validate-token")

const database=require("../model/cust");


router.post("/", verify, (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const Database = new database({
    name: req.body.name,
    email: req.body.email,
    company: req.body.company,
    place: req.body.place
  });

  
  Database
    .save(Database)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user database."
      });
    });


});


router.get("/", verify, (req, res) => {
  
  const name= req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  database.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data."
      });
    });
});



router.get("/:id", verify, (req, res) => { 

     const id = req.params.id;
  
    database.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id=" + id });
      });
  

});

router.put("/:id", verify, (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  database.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else res.send({ message: "user was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });

});






router.delete("/:id", verify, (req, res) => {
  const id = req.params.id;

  database.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
});




module.exports = router;


