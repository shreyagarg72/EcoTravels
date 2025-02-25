import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  firebaseUid: { type: String, required: true, unique: true },  // Ensure this field is unique
  createdAt: { type: Date, default: Date.now },
  
  // EcoPoints system fields
  ecoPoints: { 
    total: { type: Number, default: 0 },
    tier: { type: String, enum: ['Basic', 'Silver', 'Gold'], default: 'Basic' },
    history: [{
      points: Number,
      activityType: { 
        type: String, 
        enum: ['search', 'view', 'save_trip', 'login', 'review_submission', 'referral', 'eco_choice','payments','signup','travel_preference'] 
      },
      description: String,
      timestamp: { type: Date, default: Date.now }
    }]
  },
  
  // Payment information
  paymentMethods: [{
    type: { 
      type: String, 
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'], 
      required: true 
    },
    isDefault: { type: Boolean, default: false },
    lastUsed: Date,
    
    // For cards (credit/debit)
    cardDetails: {
      lastFourDigits: String,
      expiryMonth: Number,
      expiryYear: Number,
      cardholderName: String
    },
    
    // For PayPal
    paypalEmail: String,
    
    // For bank transfers
    bankDetails: {
      accountLastFourDigits: String,
      bankName: String
    },
    
    // For crypto
    cryptoAddress: String,
    cryptoCurrency: String
  }]
});

// Indexes for better query performance
userSchema.index({ 'ecoPoints.total': -1 }); // For tier-based queries
userSchema.index({ firebaseUid: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;