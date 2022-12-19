import React, { useState } from "react";
import {
  getTextAreas,
  removeTextArea,
} from "../features/textarea/textAreaSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTextArea, setTextArea } from "../features/textarea/textAreaSlice";
import { removeResult } from "../features/ai/aiSlice";

const TextAreas = () => {
  const textAreas = useSelector(getTextAreas);
  const dispatch = useDispatch();
  const handleChange = (e: any, id: string) => {
    dispatch(setTextArea({ id, value: e.target.value }));
  };
  const handleAddTextArea = () => {
    if (textAreas[textAreas.length - 1] === "") return;
    dispatch(addTextArea());
  };
  const handleRemove = (id: string) => {
    dispatch(removeTextArea({ id }));
    dispatch(removeResult({ id }));
  };
  return (
    <div className="textareas">
      <div className="textareas__list">
        {textAreas.map(
          ({ id, value }: { id: string; value: string }, index: number) => (
            <div className="textareas__list__group">
              <textarea
                value={value}
                required={index === 0}
                onChange={(e) => handleChange(e, id)}
              />
              <button type="button" onClick={() => handleRemove(id)}>
                Remove
              </button>
            </div>
          )
        )}
      </div>
      <button
        className="textareas__addbutton"
        type="button"
        onClick={handleAddTextArea}
      >
        Add
      </button>
    </div>
  );
};

export default TextAreas;
