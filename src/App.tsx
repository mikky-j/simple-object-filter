import React, { useState } from "react";
import "./App.css";

interface Value {
  not_accepted: string;
  accepted: string;
}

interface Props {
  title: string;
  items: string[];
  value: string;
  setValue: (t: React.ChangeEvent<HTMLInputElement>) => void;
  updateItems: () => void;
  removeItems: (index: number) => void;
}

const ArrayView: React.FC<Props> = ({
  items,
  title,
  setValue,
  removeItems,
  value,
  updateItems,
}) => {
  return (
    <div className="list-container">
      {title}
      <ul>
        {items?.map((value, index) => (
          <li key={index}>
            {value}{" "}
            <button onClick={() => removeItems(index)} className="remove-btn">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e);
        }}
      />
      <button
        onClick={() => {
          updateItems();
        }}
      >
        Add
      </button>
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState<Value>({ not_accepted: "", accepted: "" });
  const [accepted, setAccepted] = useState<string[]>([]);
  const [notAccepted, setNotAccepted] = useState<string[]>([]);
  const [result, setResult] = useState<string[]>([]);
  return (
    <div className="App">
      <div className="info">
        <h1>Object Filter</h1>
        <p>
          This is an object filter that is meant to remove all the items from
          the "Accepted" list that are in the "Not Accepted" list
        </p>
      </div>
      <div className="inputs">
        <ArrayView
          title={"Accepted"}
          items={accepted}
          value={value.accepted}
          setValue={(e) => {
            setValue({ ...value, accepted: e.target.value });
          }}
          updateItems={() => {
            setAccepted([...accepted, value.accepted]);
            setValue({ ...value, accepted: "" });
          }}
          removeItems={(index) => {
            accepted.splice(index, 1);
            setAccepted(accepted);
            // console.log(accepted);
            setValue({
              accepted: value.accepted,
              not_accepted: value.not_accepted,
            });
          }}
        />
        <ArrayView
          title={"Not Accepted"}
          items={notAccepted}
          value={value.not_accepted}
          setValue={(e) => {
            setValue({ ...value, not_accepted: e.target.value });
          }}
          updateItems={() => {
            setNotAccepted([...notAccepted, value.not_accepted]);
            setValue({ ...value, not_accepted: "" });
          }}
          removeItems={(index) => {
            notAccepted.splice(index, 1);
            setNotAccepted(notAccepted);
            setValue({
              accepted: value.accepted,
              not_accepted: value.not_accepted,
            });
          }}
        />
      </div>
      <button
        className="filter"
        onClick={() =>
          setResult(accepted.filter((value) => !notAccepted.includes(value)))
        }
      >
        Filter
      </button>
      <div className="result">
      Result
        <ul className="result-list">
          {result?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
