import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import { useEvaluateMutation } from "../features/ai/aiApiSlice";

const MODEL_NAMES = [
  { name: "Fast Text", id: "fast-text" },
  { name: "GPT-Neo", id: "gpt-neo" },
  { name: "OPT", id: "opt" },
];
const MODEL_ACTIONS = [
  { name: "Validation", active: true },
  { name: "Sentiment", active: false },
  { name: "Topic", active: false },
];
const TestModel = () => {
  const { register, handleSubmit, watch } = useForm();
  const [action, setAction] = useState<string>();
  const [evaluate, { isLoading }] = useEvaluateMutation();
  const [results, setResults] = useState({
    Validation: "-",
    Sentiment: "-",
    Topic: "-",
  });
  const onSubmit = async (data: any) => {
    console.log(data, "this is the data");
    const {
      success,
      errors,
      data: evaluationData,
    } = (await evaluate({ ...data, action }).unwrap()) as any;
    const resultData = { ...results };
    console.log("---", evaluationData);
    resultData[action as keyof typeof results] = evaluationData;
    console.log(resultData);
    setResults(resultData);
  };
  const handleAction = (name: string) => {
    console.log(name);
  };
  return (
    <div className="testmodel">
      <form className="testmodel__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="testmodel__formgroup">
          <label className="testmodel__label" htmlFor="model" id="model">
            Choose a model
          </label>
          <select required id="model" {...register("model")}>
            {MODEL_NAMES.map(({ name: modelName, id }) => (
              <option key={id} value={id}>
                {modelName}
              </option>
            ))}
          </select>
        </div>
        <div className="testmodel__formgroup testmodel__textarea">
          <textarea required {...register("text")} />
        </div>
        <div className="testmodel__formgroup testmodel__actions">
          {MODEL_ACTIONS.map(({ name, active }) => (
            <button
              key={name}
              onClick={() => setAction(name)}
              disabled={!active}
            >
              {name}
            </button>
          ))}
        </div>
      </form>
      <div>
        <h3>Results</h3>
        <div className="testmodel__resultsarea">
          {MODEL_ACTIONS.map(({ name }) => (
            <p className="testmodel__resultsarea__items" key={name}>
              {name}:{" "}
              <span
                className={`testmodel__resultsarea__items--${
                  results[name as keyof typeof results] == "YES"
                    ? "green"
                    : "red"
                }`}
              >
                {results[name as keyof typeof results]}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestModel;
