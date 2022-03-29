import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Icon } from "@progress/kendo-react-common";
import { FormInput } from "./FormInput";
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const passwordRegex = /^[a-zA-Z0-9]{8,}/;
const emailValidator = (value: any) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";
const passwordValidator = (value: any) =>
  passwordRegex.test(value) ? "" : "password must contain 8 characters";
const EmailInput = (fieldRenderProps: any) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
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
  const handleSubmit = (dataItem: any) => navigate("/");
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const setType = (val: any) => {
    alert(val);
  };
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
                label={" New Password"}
                type="password"
                icon="k-icon k-i-lock"
                eyeIcon={"k-icon k-i-eye"}
                validator={passwordValidator}
              />
            </div>
            <div className="mb-3">
              <Field
                name={"newpassword"}
                component={FormInput}
                label={" Confirm Password"}
                type="password"
                icon="k-icon k-i-lock"
                eyeIcon={"k-icon k-i-eye"}
                validator={passwordValidator}
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
              Change
            </button>
          </div>
        </FormElement>
      )}
    />
  );
};
export default LoginForm;
