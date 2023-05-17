import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String, required: true},
    cpf: {type: String, required: true},
    email: {type: String, required: true},
    birthDate: {type: String, required: true}, // MUST BE A DATE FORMAT
    phoneNumber: {type: String},
    password: {type: String, required: true}, // MUST BE ENCRYPTED
    profilePhoto: {type: String},
    balanceAccount: {type: Number},
    // city: {type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true} // MUST BE RELATIONAL - CITY.NAME
  }
);

const users = mongoose.model('users', userSchema);

export default users;