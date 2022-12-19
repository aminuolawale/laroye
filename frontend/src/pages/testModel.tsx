import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import TextAreas from "../components/TextAreas";
import { useEvaluateMutation } from "../features/ai/aiApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTextAreas } from "../features/textarea/textAreaSlice";
import ResultCard from "../components/ResultCard";
import { getResults, setResults } from "../features/ai/aiSlice";
const MODEL_NAMES = [
  { name: "Fast Text", id: "fast-text", active: true },
  { name: "GPT-Neo", id: "gpt-neo", active: false },
  { name: "OPT", id: "opt", active: false },
];
const MODEL_ACTIONS = [
  { name: "Validation", id: "VALIDATION", active: true },
  { name: "Sentiment", id: "SENTIMENT", active: true },
  { name: "Topic", id: "TOPIC", active: true },
];
const TestModel = () => {
  const dispatch = useDispatch();
  const textAreas = useSelector(getTextAreas);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<string>();
  const [evaluate, { isLoading }] = useEvaluateMutation();
  const onSubmit = async (data: any) => {
    setLoading(true);
    const requestData = {
      model: data.model,
      action,
      payload: textAreas
        .filter(({ value }: { value: string }) => value.length > 0)
        .map(({ id, value }: { id: string; value: string }) => ({
          id,
          value: value.replace(/(\r\n|\n|\r)/gm, ""),
        })),
    };
    const {
      success,
      errors,
      data: evaluationData,
    } = (await evaluate(requestData).unwrap()) as any;
    dispatch(setResults({ results: evaluationData, action: action }));
    setLoading(false);
  };
  const handleAction = (name: string) => {};
  const results = useSelector(getResults);
  return loading ? (
    <Loading />
  ) : (
    <div className="testmodel">
      <form className="testmodel__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="testmodel__formgroup">
          <label className="testmodel__label" htmlFor="model" id="model">
            Choose a model
          </label>
          <select required id="model" {...register("model")}>
            {MODEL_NAMES.map(({ name: modelName, id, active }) => (
              <option key={id} value={id} disabled={!active}>
                {modelName}
              </option>
            ))}
          </select>
        </div>
        <TextAreas />
        <div className="testmodel__formgroup testmodel__actions">
          {MODEL_ACTIONS.map(({ name, active, id }) => (
            <button key={name} onClick={() => setAction(id)} disabled={!active}>
              {name}
            </button>
          ))}
        </div>
      </form>
      <div className="testmodel__results">
        <h3>Results</h3>
        {results.length > 0 &&
          results.map((resultItem: any) => (
            <ResultCard
              text={resultItem.text}
              id={resultItem.id}
              result={resultItem.result}
            />
          ))}
      </div>
    </div>
  );
};

export default TestModel;
