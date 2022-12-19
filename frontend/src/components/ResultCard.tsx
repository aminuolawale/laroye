import React, { useState, useEffect } from "react";
import { text } from "stream/consumers";

const ResultCard = (props: any) => {
  const [textValue, setTextValue] = useState<string>("");
  useEffect(() => {
    if (props.text.length > 240) {
      setTextValue(`${props.text.substring(0, 240)}...`);
    } else {
      setTextValue(props.text);
    }
  }, [props.text]);
  return (
    <div className="resultcard">
      <p
        className="resultcard__results__text"
        onClick={() =>
          textValue.length === 243 || textValue.length < 240
            ? setTextValue(props.text)
            : setTextValue(`${props.text.substring(0, 240)}...`)
        }
      >
        {textValue}
      </p>
      <div className="resultcard__results">
        <p>Validation: {props.result.VALIDATION}</p>
        <p>Sentiment: {props.result.SENTIMENT}</p>
        <p>Topic: {props.result.TOPIC}</p>
      </div>
    </div>
  );
};

export default ResultCard;
