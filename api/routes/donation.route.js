import express from 'express';
import { 
  createDonation, 
  deleteDonation, 
  updateDonation, 
  getDonation, 
  getDonations 
} from '../controllers/donation.controller.js'; // Change listing.controller.js to donation.controller.js
import { verifyToken } from '../utils/verifyUser.js'; // Verify user for protected routes

const router = express.Router();

// Route to create a donation (user needs to be authenticated)
router.post('/create', verifyToken, createDonation);

// Route to delete a donation by ID (user needs to be authenticated)
router.delete('/delete/:id', verifyToken, deleteDonation);

// Route to update a donation by ID (user needs to be authenticated)
router.post('/update/:id', verifyToken, updateDonation);

// Route to get a specific donation by ID
router.get('/get/:id', getDonation);

// Route to get all donations
router.get('/get', getDonations);

export default router;
