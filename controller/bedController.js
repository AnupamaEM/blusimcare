const bedService = require("../services/bedService");

const addBed = async (req, res) => {
  try {
    const bed = req.body;

    if (!bed.bid) {
      return res.status(400).send("Missing required field: bid");
    }

    await bedService.addBed(bed);
    res.send("Bed added successfully!");
  } catch (error) {
    res.status(500).send("Error adding bed: " + error.message);
  }
};


const deleteBedById = async (req, res) => {
  try {
    const { bid } = req.params;
    await bedService.deleteBedById(bid);
    res.send(`Bed with ID ${bid} deleted successfully!`);
  } catch (error) {
    res.status(500).send("Error deleting bed: " + error.message);
  }
};

const updateBedById = async (req, res) => {
  try {
    const { bid } = req.params;
    const updateData = req.body;

    await bedService.updateBedById(bid, updateData);
    res.send(`Bed with ID ${bid} updated successfully!`);
  } catch (error) {
    res.status(500).send("Error updating bed: " + error.message);
  }
};

const getAllBeds = async (req, res) => {
  try {
    const beds = await bedService.getAllBeds();
    res.json(beds);
  } catch (error) {
    res.status(500).send("Error fetching beds: " + error.message);
  }
};

const getBedById = async (req, res) => {
  try {
    const bed = await bedService.getBedById(req.params.bid);

    if (!bed) {
      return res.status(404).send("Bed not found");
    }

    res.json(bed);
  } catch (error) {
    res.status(500).send("Error fetching bed: " + error.message);
  }
};

module.exports = {

    deleteBedById,
    addBed,
    updateBedById,
    getAllBeds,
    getBedById,

};
