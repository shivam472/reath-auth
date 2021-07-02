import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";

const ProfileForm = () => {
  const history = useHistory();

  const passwordInputRef = useRef();
  const { token } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDKK9gI-iCwIDZN_A8ObTN8hj27PYGQ8rE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Sucess");
          history.replace("/");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Something went wrong!";

            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
