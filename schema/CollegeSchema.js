import mongoose from "mongoose";

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    jobRole: {
      type: [String],
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    companyVisitDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    userIds: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        jobRole: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
