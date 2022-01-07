import billIcon from "./images/icon-dollar.svg";
import personIcon from "./images/icon-person.svg";
import { useState } from "react";

export default function Calculator() {
  let errorMessage = {
    notNumber: "Please enter a number",
    zero: "Can't be zero",
    startingWithZero: "Can't start with zero",
  };

  let tipPerPerson = (0).toFixed(2);
  let totalPerPerson = (0).toFixed(2);

  let [billMessage, setBillMessage] = useState("");
  let [tipMessage, setTipMessage] = useState("");
  let [peopleMessage, setPeopleMessage] = useState("");

  let [bill, setBill] = useState({
    value: "",
    valid: false,
  });

  let [tipPercent, setTipPercent] = useState({
    value: "",
    valid: false,
  });

  let [customTip, setCustomTip] = useState({
    value: "",
    valid: false,
  });

  let [numOfPeople, setNumOfPeople] = useState({
    value: "",
    valid: false,
  });

  if (
    bill.valid &&
    (tipPercent.valid || customTip.valid) &&
    numOfPeople.valid
  ) {
    let tip;
    let totalBill = Number(bill.value);
    let totalPeople = Number(numOfPeople.value);
    if (tipPercent.valid === true) {
      tip = Number(tipPercent.value);
    } else {
      tip = Number(customTip.value);
    }
    tipPerPerson = (((totalBill / 100) * tip) / totalPeople).toFixed(2);
    totalPerPerson = (
      (tipPerPerson * totalPeople + totalBill) /
      totalPeople
    ).toFixed(2);
  } else {
    tipPerPerson = (0).toFixed(2);
    totalPerPerson = (0).toFixed(2);
  }

  function handleTipClick(e) {
    e.preventDefault();
    let value = e.target.value;
    let newTipPercent = {
      value: value,
      valid: true,
    };
    setTipPercent(newTipPercent);
    customTip.valid = false;
  }

  function handleCustomTipClick(e) {
    e.preventDefault();
    let value = e.target.value;
    let isValid;
    if (value == "0" || value == "" || value[0] == "0") {
      isValid = false;
      if (value == "0") {
        setTipMessage(errorMessage.zero);
      } else if (value[0] == "0") {
        setTipMessage(errorMessage.startingWithZero);
      } else if (value == "") {
        setTipMessage("");
      } else {
        setTipMessage("");
      }
    } else {
      isValid = /^[0-9,.]*$/.test(value);
      if (!isValid) {
        setTipMessage(errorMessage.notNumber);
      } else {
        setTipMessage("");
      }
    }
    let newCustomTipPercent = {
      value: value,
      valid: isValid,
    };
    setCustomTip(newCustomTipPercent);
    tipPercent.valid = false;
  }

  function handleResetClick() {
    setBill({ value: "", valid: false });
    setCustomTip({ value: "", valid: false });
    setTipPercent({ value: "", valid: false });
    setNumOfPeople({ value: "", valid: false });
  }

  return (
    <div className="tip-calculator">
      <div className="calculator-container">
        <div className="bill">
          <div className="info">
            <h3>Bill</h3>
            <h3 id="error-message">{billMessage}</h3>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="0"
              onChange={(e) => {
                e.preventDefault();
                let value = e.target.value;
                let isValid;
                if (value == "0" || value == "" || value[0] == "0") {
                  isValid = false;
                  if (value == "0") {
                    setBillMessage(errorMessage.zero);
                  } else if (value[0] == "0") {
                    setBillMessage(errorMessage.startingWithZero);
                  } else {
                    setBillMessage("");
                  }
                } else {
                  isValid = /^[0-9,.]*$/.test(value);
                  if (!isValid) {
                    setBillMessage(errorMessage.notNumber);
                  } else {
                    setBillMessage("");
                  }
                }
                if (value == "") {
                  setBillMessage("");
                }
                let newBill = {
                  value: value,
                  valid: isValid,
                };
                setBill(newBill);
              }}
              value={bill.value}
            />
            <img src={billIcon} alt="bill" />
          </div>
        </div>
        <div>
          <div className="info">
            <h3>Select Tip %</h3>
            <h3 id="error-message">{tipMessage}</h3>
          </div>
          <div className="tip-percent">
            <button value="5" onClick={handleTipClick} className="tipButton">
              5%
            </button>
            <button value="10" onClick={handleTipClick} className="tipButton">
              10%
            </button>
            <button value="15" onClick={handleTipClick} className="tipButton">
              15%
            </button>
            <button value="25" onClick={handleTipClick} className="tipButton">
              25%
            </button>
            <button value="50" onClick={handleTipClick} className="tipButton">
              50%
            </button>
            <input
              type="text"
              className="custom-tip"
              placeholder="Custom"
              onChange={handleCustomTipClick}
              value={customTip.value}
            />
          </div>
        </div>
        <div className="people">
          <div className="info">
            <h3>Number of People</h3>
            <h3 id="error-message">{peopleMessage}</h3>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="0"
              onChange={(e) => {
                let value = e.target.value;
                let isValid;
                if (value == "0" || value == "" || value[0] == "0") {
                  isValid = false;
                  if (value == "0") {
                    setPeopleMessage(errorMessage.zero);
                  } else if (value[0] == "0") {
                    setPeopleMessage(errorMessage.startingWithZero);
                  } else if (value == "") {
                    setPeopleMessage("");
                  } else {
                    setPeopleMessage("");
                  }
                } else {
                  isValid = /^[0-9]*$/.test(value);
                  if (!isValid) {
                    setPeopleMessage(errorMessage.notNumber);
                  } else {
                    setPeopleMessage("");
                  }
                }
                if (value == "") {
                  setPeopleMessage("");
                }
                let newNumOfPeople = {
                  value: value,
                  valid: isValid,
                };
                setNumOfPeople(newNumOfPeople);
              }}
              value={numOfPeople.value}
            />
            <img src={personIcon} alt="person" />
          </div>
        </div>
      </div>
      <div className="calculation-results">
        <div className="tip-container">
          <div className="tip">
            <div>
              <h3>Tip Amount</h3>
              <p>/ person</p>
            </div>
            <h1>${tipPerPerson}</h1>
          </div>
          <div className="tip">
            <div>
              <h3>Total</h3>
              <p>/ person</p>
            </div>
            <h1>${totalPerPerson}</h1>
          </div>
        </div>
        <button
          className="reset"
          onClick={(e) => {
            e.preventDefault();
            handleResetClick();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
