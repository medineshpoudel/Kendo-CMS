import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Icon } from "@progress/kendo-react-common";
import { FormInput } from "./FormInput";
import { userAuthStore } from "../../store/Authstore";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^[a-zA-Z0-9]{8,}/;
const emailValidator = (value: any) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const nameValidator = (value: any) =>
  usernameRegex.test(value) ? "" : "please enter the valid username";
const passwordValidator = (value: any) =>
  passwordRegex.test(value) ? "" : "password must contain 8 characters";
// const EmailInput = (fieldRenderProps: any) => {
//   const { validationMessage, visited, ...others } = fieldRenderProps;
//   return (
//     <div>
//       <Input {...others} />
//       {visited && validationMessage && (
//         <Error data-typeId="email-validation-error">{validationMessage}</Error>
//       )}
//     </div>
//   );
// };
const DUMMY_DETAILS = {
  email: "dinesh@gmail.com",
  password: "password",
};
const NameInput = (fieldRenderProps: any) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};
const LoginForm = () => {
  const navigate = useNavigate();
  const login = userAuthStore((state: any) => state.login);

  const handleSubmit = (dataItem: any) => {
    if (dataItem.password === DUMMY_DETAILS.password) {
      // navigate("/app");
      setLoginError(false);
      login();
    } else {
      setLoginError(true);
    }
  };
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement
          style={{
            width: 450,
            margin: "auto ",
            marginTop: "100px",
            padding: "20px",
            boxShadow: "5px 5px 25px ",
            borderRadius: "20px",
          }}
        >
          <fieldset className={"k-form-fieldset"}>
            <h2 style={{ textAlign: "center", fontWeight: "500" }}>
              Please Log in
            </h2>
            <div className="mb-3">
              <Field
                name={"email"}
                type={"email"}
                component={FormInput}
                label={"Email"}
                validator={emailValidator}
                icon={"k-icon k-i-email"}
              />
            </div>

            <div className="mb-3">
              <Field
                name={"password"}
                component={FormInput}
                label={"Password"}
                type="password"
                validator={passwordValidator}
                icon="k-icon k-i-lock"
                eyeIcon={"k-icon k-i-eye"}
              />
            </div>
          </fieldset>
          <div className="k-form-buttons mb-3">
            <button
              type={"submit"}
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              disabled={!formRenderProps.allowSubmit}
              style={{
                width: "100%",
                backgroundColor: "#0288d1",
                fontSize: "20px",
                fontWeight: "600",
                color: "white",
              }}
            >
              Login
            </button>
          </div>
          {loginError ? (
            <div data-typeId="login-error" style={{ color: "red" }}>
              <p>Please enter correct password</p>
            </div>
          ) : (
            ""
          )}
          <div style={{ marginTop: "10px" }}>
            <Checkbox label={"Remember Me"} />
          </div>
          <div
            className="k-from-buttons"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              themeColor={"light"}
            >
              Create User
            </Button>
            <Button
              onClick={() => {
                navigate("/forgot");
              }}
              fillMode="flat"
            >
              Forgot Password
            </Button>
          </div>
        </FormElement>
      )}
    />
  );
};
export default LoginForm;
