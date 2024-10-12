import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,  // New field for categorizing donations (e.g., Clothes, Books, Electronics)
    },
    condition: {
      type: String,
      required: true,  // New field to describe the condition of the item (e.g., New, Used)
    },
    offer: {
      type: Boolean,
      required: true,  // If the donation is still available
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,  // Reference to the user donating the item
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
