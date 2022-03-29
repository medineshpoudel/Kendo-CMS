import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^[a-zA-Z0-9]{8,}/;

const emailValidator = (value: any) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const nameValidator = (value: any) =>
  usernameRegex.test(value)
    ? ""
    : "username must not contain special character";

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
const SignupForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (dataItem: any) =>
    alert(JSON.stringify(dataItem, null, 2));
  const [validEmail, setValidEmail] = useState("");
  const [validPassword, setValidPassword] = useState("");

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
              Please Sign Up
            </h2>
            <div className="mb-3">
              <Field
                name={"firstName"}
                component={FormInput}
                label={"First Name"}
                validator={nameValidator}
                icon={"k-icon k-i-user"}
              />
            </div>
            <div className="mb-3">
              <Field
                name={"lastName"}
                component={FormInput}
                label={"Last Name"}
                icon={"k-icon k-i-user"}
                validator={nameValidator}
              />
            </div>
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
                icon={"k-icon k-i-lock"}
                eyeIcon={"k-icon k-i-eye"}
                validator={passwordValidator}
              />
            </div>

            <div className="mb-3">
              <Field
                name={"phone"}
                component={FormInput}
                label={"Phone"}
                type="phone"
                icon={"k-icon k-i-call"}
              />
            </div>
            <div className="mb-3">
              <Field
                name={"address"}
                component={FormInput}
                label={"Address"}
                type="address"
                icon={"k-icon k-i-marker-pin"}
              />
            </div>
          </fieldset>
          <div className="k-form-buttons">
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
              Sign Up
            </button>
          </div>
          <div
            className="k-from-buttons"
            style={{ marginTop: "10px", display: "block" }}
          >
            <p style={{ margin: " 10px", display: "inline-block" }}>
              Have an account?
            </p>{" "}
            <Button
              onClick={() => {
                navigate("/");
              }}
              themeColor={"light"}
            >
              LogIn
            </Button>
          </div>
        </FormElement>
      )}
    />
  );
};
export default SignupForm;
