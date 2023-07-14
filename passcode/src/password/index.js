import { useEffect, useState } from "react";
import { validation } from "./validator";
import axios from "axios";
import moment from "moment";
import "./password.scss";
const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    passwordLength: false,
    cases: false,
    repeatMode: false,
  });
  const [stepNeed, setStepNeed] = useState(0);
  const [passwordLists, setPasswordLists] = useState([]);

  const handleChangePassword = (e) => {
    let valueLength = e.target.value?.length;
    setPassword(e.target.value);
    if (valueLength < 6) {
      setStepNeed(6 - valueLength);
    } else if (valueLength > 20) {
      setStepNeed(valueLength - 20);
    } else {
      setStepNeed(0);
    }
  };
  const handleValidatePassword = (e) => {
    const errors = validation(e.target.value);
    setErrorMsg(errors);
  };
  const savePassword = () => {
    setPassword("");
    setStepNeed(0);
    axios
      .post("http://localhost:4500", {
        password: password,
      })
      .then((response) => {
        setPasswordLists([...passwordLists, response.data]);
        window.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4500")
      .then((response) => {
        setPasswordLists(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [passwordLists]);

  return (
    <div className="view-port">
      <div className="container">
        <div className="box-left">
          <div className="form-content">
            <div className="form-group">
              <div className="form-label">Enter Your password</div>
              <input
                type="text"
                className="form-input"
                value={password}
                onChange={handleChangePassword}
                onBlur={handleValidatePassword}
              />
            </div>
            <div
              className={`step-counter ${
                stepNeed === 0 ? "no-error" : "has-error"
              }`}
            >
              {stepNeed}
            </div>
          </div>
          {password?.length > 0 && (
            <ul className="conditions-list">
              <li className="conditions-list-item">
                <p
                  className={`error-msg ${
                    errorMsg?.passwordLength ? "is-error" : ""
                  }`}
                >
                  At Least 6 characters and at most 20 characters
                </p>
              </li>
              <li className="conditions-list-item">
                <p className={`error-msg ${errorMsg?.cases ? "is-error" : ""}`}>
                  It contains at least one lowercase letter, at least one
                  uppercase letter, and at least one digit.
                </p>
              </li>
              <li className="conditions-list-item">
                <p
                  className={`error-msg ${
                    errorMsg?.repeatMode ? "is-error" : ""
                  }`}
                >
                  It does not contain three repeating characters in a row
                </p>
              </li>
            </ul>
          )}

          <button
            className="btn-save"
            disabled={
              errorMsg.cases || errorMsg.passwordLength || errorMsg.repeatMode
            }
            onClick={savePassword}
          >
            Save Password
          </button>
        </div>
        <div className="box-right">
          <div className="entries-lists">
            <div className="entries-title">Your Entries</div>

            {passwordLists.map((item, index) => (
              <div className="list-row" key={index}>
                <div className="list-item">{index + 1}</div>
                <div className="list-item">{item.password}</div>
                <div className="list-item">
                  {moment(item.created_at).format("MM-DD-YYYY")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
