const SalesAssociate = require('../models/SalesAssociate');
const Store = require('../models/Store');

// Add sales associate to a specific store
const addAssociate = async (req, res) => {
  const { storeId } = req.params;
  const { name, photoUrl } = req.body;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const newAssociate = new SalesAssociate({
      name,
      photoUrl,
      storeId: store._id
    });

    await newAssociate.save();

    store.salesAssociates.push(newAssociate._id);
    await store.save();

    res.status(201).json({ message: 'Sales associate added successfully', associate: newAssociate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding sales associate' });
  }
};

// Remove sales associate from a specific store
const removeAssociate = async (req, res) => {
  const { storeId, associateId } = req.params;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    store.salesAssociates = store.salesAssociates.filter(id => id.toString() !== associateId);
    await store.save();

    await SalesAssociate.findByIdAndDelete(associateId);

    res.status(200).json({ message: 'Sales associate removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing sales associate' });
  }
};

module.exports = { addAssociate, removeAssociate };