const express = require("express");
const router = express.Router();
const bedController = require("../controller/bedController");

router.post("/addbed", bedController.addBed);
router.delete("/deletebed/:bid", bedController.deleteBedById); 
router.put("/editbed/:bid", bedController.updateBedById);
router.get("/beds", bedController.getAllBeds);
router.get("/getbed/:bid", bedController.getBedById);

module.exports = router;

