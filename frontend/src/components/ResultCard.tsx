import React, { useState, useEffect } from "react";
import { clearResult } from "../features/ai/aiSlice";
import { useDispatch } from "react-redux";
const ResultCard = (props: any) => {
  const [textValue, setTextValue] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.text.length > 240) {
      setTextValue(`${props.text.substring(0, 240)}...`);
    } else {
      setTextValue(props.text);
    }
  }, [props.text]);
  const handleClearResult = (id: string) => {
    dispatch(clearResult({ id }));
  };
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
        <div className="resultcard__results__inner">
          <p>Validation: {props.result.VALIDATION}</p>
          <p>Sentiment: {props.result.SENTIMENT}</p>
          <p>Topic: {props.result.TOPIC}</p>
        </div>
        <p
          className="resultcard__results__clear"
          onClick={() => handleClearResult(props.id)}
        >
          Clear
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
