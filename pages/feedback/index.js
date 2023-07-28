import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState();

    //set id as a parameter
    function loadFeedbackHandler(id){
        //fetch(`/api/${id}`)でもOK // /api/some-feedback-id
        fetch('/api/' + id).then(response => response.json()).then(data => {
            setFeedbackData(data.feedback);
        });

    }
  return (
    //コンポーネントでfeedbackDataを使用して、条件付きレンダリングを行う
    //feedbackDataがセットされている場合、段落タグにfeedbackData.emailを出力して、フィードバックのメールアドレスを表示
    <Fragment>
        {feedbackData && <p>{feedbackData.email}</p>}
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>
            {item.text}<button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button></li>
      ))}
    </ul>
    </Fragment>
  );
}
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
