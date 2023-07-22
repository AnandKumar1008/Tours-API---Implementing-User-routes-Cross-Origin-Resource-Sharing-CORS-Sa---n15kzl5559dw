const fs = require("fs");
const express = require("express");
const app = express();

//Middleware
app.use(express.json());

const tourDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

app.get("/tours", (req, res) => {
  //write a code here to get all the tours from tours.json
  try {
    res.status(200).json({
      message: "Success",

      data: [...tourDetails],
    });
  } catch (err) {
    res.status(404).json({
      message: "Success",
    });
  }
});

app.post("/tours", (req, res) => {
  const { name, description, duration, price } = req.body;
  const data = req.body;
  data.id = tourDetails.length + 1;
  tourDetails.push(data);
  fs.writeFile(
    `${__dirname}/data/tours.json`,
    JSON.stringify(tourDetails),
    (err) => {
      res.json({
        message: "Tour added successfully",
      });
    }
  );
  //Write a code here for creating new tour from data/tours.json
  //For creating new id use this logic
  // const newId = tourDetails[tourDetails.length - 1].id + 1;
});

app.put("/tours/:id", (req, res) => {
  const tourId = parseInt(req.params.id);
  const updatedTour = req.body;
  updatedTour.id = tourId;
  let present = false;
  const item = tourDetails.map((user) => {
    if (user.id == tourId) {
      present = true;
      return { ...user, ...updatedTour };
    }
    return user;
  });
  if (!present) {
    return res.status(404).json({ message: "Tour not found" });
  }
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(item), (err) => {
    res.status(200).json({
      message: "Tour updated successfully",
    });
  });

  //write a code here for updating a tour
});

app.delete("/tours/:id", (req, res) => {
  const tourId = parseInt(req.params.id);
  //Write a code here for deleting a tour from data/tours.json
  const filteredItem = tourDetails.filter((user) => user.id != tourId);
  if (filteredItem.length == tourDetails.length)
    return res.status(404).json({ message: "Tour not found" });
  fs.writeFile(
    `${__dirname}/data/tours.json`,
    JSON.stringify(filteredItem),
    (err) => {
      res.json({
        message: "Tour deleted successfully",
      });
    }
  );
});

module.exports = app;
