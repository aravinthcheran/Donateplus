import Donation from '../models/donation.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new donation
export const createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create(req.body);
    return res.status(201).json(donation);
  } catch (error) {
    next(error);
  }
};

// Delete a donation
export const deleteDonation = async (req, res, next) => {
  const donation = await Donation.findById(req.params.id);

  if (!donation) {
    return next(errorHandler(404, 'Donation not found!'));
  }

  if (req.user.id !== donation.userRef) {
    return next(errorHandler(401, 'You can only delete your own donations!'));
  }

  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json('Donation has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Update a donation
export const updateDonation = async (req, res, next) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) {
    return next(errorHandler(404, 'Donation not found!'));
  }

  if (req.user.id !== donation.userRef) {
    return next(errorHandler(401, 'You can only update your own donations!'));
  }

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDonation);
  } catch (error) {
    next(error);
  }
};

// Get a specific donation by ID
export const getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return next(errorHandler(404, 'Donation not found!'));
    }
    res.status(200).json(donation);
  } catch (error) {
    next(error);
  }
};

// Get all donations with filters
export const getDonations = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let category = req.query.category;
    if (!category || category === 'all') {
      category = { $in: ['Clothes', 'Books', 'Electronics', 'Furniture', 'Toys'] };  // Add relevant categories
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const donations = await Donation.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      category,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(donations);
  } catch (error) {
    next(error);
  }
};
