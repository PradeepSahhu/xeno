import { Campaign } from "../../models/campaign.models.js";
import { CommunicationLog } from "../../models/communicationLog.models.js";
import DatabaseConnection from "../../utils/DatabaseConnection.utils.js";
import { getGeminiResponse } from "../AI/GeminiConnection.ai.js";

const PerformSendingMessages = async (
  CampaignID = "6839bb85bdff80eb5539be2d"
) => {
  console.log("Fetching the campaign Record");

  DatabaseConnection();

  const campaign = await Campaign.findById(CampaignID);

  const res = await getGeminiResponse(
    campaign.audienceSize,
    campaign.name,
    campaign.rule
  );

  //   const result = JSON.parse(res.candidates[0].content);
  //   console.table(res.candidates[0].content);

  const content = res.candidates[0].content;

  const data = content.parts[0].text;
  //   console.log(content.parts[0].text);

  const cleanJsonString = data.replace(/```json|```/g, "").trim();
  console.log(JSON.parse(cleanJsonString));

  const aiResponse = JSON.parse(cleanJsonString);

  //   const resp = JSON.parse(content);
  //   console.log(resp);
  //   console.log(result);

  let messagesArray = [];

  const communicationExist = await CommunicationLog.findOne({
    campaign: CampaignID || campaign._id,
  });

  if (Array.isArray(aiResponse)) {
    messagesArray = aiResponse.map((item) => ({
      customerName: item.customerName || item.name,
      customerEmail: item.customerEmail || item.email,
      message: item.personalizedMessage,
      status: Math.random() < 0.9 ? "SENT" : "FAILED",
    }));
  }

  // if (communicationExist.message.length < campaign.audienceSize) {
  //   communicationExist.message.push(...messagesArray);
  // }
  // await communicationExist.save();
  // console.log("saving completed");

  if (communicationExist) {
    if (communicationExist.message.length < campaign.audienceSize) {
      communicationExist.message.push(...messagesArray);
    }

    await communicationExist.save();

    console.log("saving completed");

    return;
  } else {
    const res = await CommunicationLog.create({
      campaign: campaign?._id || CampaignID,
      message: messagesArray,
    });

    if (res.ok) {
      console.log(
        "Successfully created a new CommunicationLog for " + CampaignID
      );
    }
  }
};

// PerformSendingMessages();
export { PerformSendingMessages };
