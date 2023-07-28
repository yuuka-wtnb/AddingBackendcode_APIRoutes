import { buildFeedbackPath, extractFeedback } from "./index";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  //array of all items
  const feedbackData = extractFeedback(filePath);

  //use .find() to find one single item
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  //feedbackDataというオブジェクトを、feedbackというキーを持つ形でJSON形式で返す
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
