import mongoose from "mongoose";

const { Schema } = mongoose;

const companyCredentialsSchema = new Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      default: "company",
      type: String,
    },
    

  },
  { timestamps: true }
);

export default mongoose.model("CompanyCredentials", companyCredentialsSchema);
