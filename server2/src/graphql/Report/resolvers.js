import Report from "../../models/Report.js";
import { GraphQLError } from "graphql";
import { validateEmbededReport } from "../../helpers.js";

export default {
  Query: {
    getAllReport: async (parent, {}, context) => {
      const Reports = Report.find();
      return Reports;
    },
    getReport: async (parent, { userName }, context) => {
      const Report = Report.findOne({ userName: userName });
      if (!Report) {
        throw new GraphQLError(err?.message || "CVR report not found");
      }
      return Report;
    },
  },
  Mutation: {
    addReport: async (parent, { userName, reportLink }, context) => {
      try {
        const embedReport = await validateEmbededReport(reportLink);
        return await Report.create({
          userName,
          reportLink: embedReport,
        });
      } catch (err) {
        throw new GraphQLError(
          err?.message || "Something is wrong while adding Report link."
        );
      }
    },
    updateReport: async (_, { id, userName, reportLink }, context) => {
      const embedReport = await validateEmbededReport(reportLink);
      return await Report.findByIdAndUpdate(
        id,
        { userName, reportLink: embedReport },
        {
          new: true,
        }
      ).populate("client");
    },
    deleteReport: async (_, { id }, context) => {
      return await Report.findByIdAndDelete(id);
    },
  },
};
