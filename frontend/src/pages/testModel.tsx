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
  { name: "Topics", active: false },
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="model" id="model">
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
        <div>
          <textarea required {...register("text")} />
        </div>
        <div>
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
        <h1>Results</h1>
        <div>
          {MODEL_ACTIONS.map(({ name }) => (
            <p key={name}>
              {name}: {results[name as keyof typeof results]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestModel;
