// controllers/DataController.js
const DataModel = require('../model/DataModel');

// Get all data
exports.getAllData = (req, res) => {
  DataModel.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch data' });
    });
};

exports.getDistinctValues = async (req, res) => {
  try {
    const penicillinValues = await DataModel.distinct('penicillin');
    const streptomycinValues = await DataModel.distinct('streptomycin');
    const neomycinValues = await DataModel.distinct('neomycin');
    const gramValues = await DataModel.distinct('gram');

    res.json({
      Penicillin: penicillinValues,
      Streptomycin: streptomycinValues,
      Neomycin: neomycinValues,
      Gram: gramValues
    });
  } catch (error) {
    console.error('Error fetching distinct values:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific data entry by ID
// exports.getDataById = (req, res) => {
//   const id = req.params.id;
//   DataModel.findById(id)
//     .then(data => {
//       if (!data) {
//         return res.status(404).json({ error: 'Data not found' });
//       }
//       res.status(200).json(data);
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Failed to fetch data' });
//     });
// };

// // Add a new data entry
// exports.createData = (req, res) => {
//   const newData = new DataModel({
//     date,
//     usage_kWh,
//     lagging_current_reactive_power_kVarh,
//     leading_current_reactive_power_kVarh,
//     CO2_tCO2,
//     lagging_current_power_factor,
//     leading_current_power_factor,
//     NSM,
//     weekStatus,
//     dayOfWeek,
//     loadType
//   });

//   newData.save()
//     .then(() => {
//       res.status(201).json({ message: 'Data added successfully!' });
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Failed to save data' });
//     });
// };

// // Update an existing data entry by ID
// exports.updateData = (req, res) => {
//   const id = req.params.id;
//   DataModel.findByIdAndUpdate(id, req.body, { new: true })
//     .then(data => {
//       if (!data) {
//         return res.status(404).json({ error: 'Data not found' });
//       }
//       res.status(200).json({ message: 'Data updated successfully', data });
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Failed to update data' });
//     });
// };

// // Delete a data entry by ID
// exports.deleteData = (req, res) => {
//   const id = req.params.id;
//   DataModel.findByIdAndDelete(id)
//     .then(data => {
//       if (!data) {
//         return res.status(404).json({ error: 'Data not found' });
//       }
//       res.status(200).json({ message: 'Data deleted successfully' });
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Failed to delete data' });
//     });
//};
