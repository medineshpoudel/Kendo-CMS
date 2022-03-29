import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { RadioButton } from "@progress/kendo-react-inputs";
import { Switch } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import axios from "axios";
import { notification } from "../../store/store";
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";
const EmailInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};
const FormInput = () => {
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState<Date | null>(new Date());
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<any>("");
  const [selectedValue, setSelectedValue] = useState("male");
  const [agree, setAgree] = useState("No");
  const navigate = useNavigate();
  const handleChange = (event: DatePickerChangeEvent) => {
    setValue(event.value);
  };
  const { submit } = notification();
  const handleSubmit = (dataItem: { [name: string]: any }) => {
    axios
      .post("https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo", {
        product,
        description,
        value,
        email,
        size,
        selectedValue,
        agree,
      })
      .then(() => {
        submit();
        navigate("/data-grid");
      });
  };

  const handleChanges = useCallback(
    (e) => {
      setSelectedValue(e.value);
    },
    [setSelectedValue]
  );
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const filterData = (filter: any) => {
    const data = sizes.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event: any) => {
    setSize(filterData(event.filter));
  };

  return (
    <>
      <NotificationGroup
        style={{
          right: 0,
          bottom: 50,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <Fade>
          {success && (
            <Notification
              type={{
                style: "success",
                icon: true,
              }}
              closable={true}
              onClose={() => setSuccess(false)}
            >
              <span>Your data has been deleted.</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
      <div
        style={{
          margin: "10px",
          width: "800px",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <fieldset className={"k-form-fieldset"}>
                <legend className={"k-form-legend"}>
                  Please fill in the fields:
                </legend>
                <div className="mb-3">
                  <Field
                    name={"product"}
                    component={Input}
                    label={"product"}
                    onChange={(e) => {
                      setProduct(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"description"}
                    component={Input}
                    label={"description"}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <Field
                    name={"email"}
                    type={"email"}
                    component={EmailInput}
                    label={"Email"}
                    validator={emailValidator}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3" style={{ marginTop: "20px" }}>
                  <DatePicker value={value} onChange={handleChange} />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <DropDownList
                    style={{
                      width: "100%",
                      background: "white",
                    }}
                    data={sizes}
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    filterable={true}
                    onFilterChange={filterChange}
                  />
                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                  <RadioButton
                    name="group1"
                    value="male"
                    checked={selectedValue === "male"}
                    label="Male"
                    onChange={handleChanges}
                    style={{ marginLeft: "10px" }}
                  />

                  <RadioButton
                    name="group1"
                    value="female"
                    checked={selectedValue === "female"}
                    label="Female"
                    onChange={handleChanges}
                    style={{ marginLeft: "20px" }}
                  />
                </div>

                <div style={{ marginTop: "10px" }}>
                  I agree to license{" "}
                  <Switch
                    onLabel={"Yes"}
                    offLabel={"No"}
                    onChange={(e) => {
                      if (e.target.value === true) {
                        setAgree("agree");
                      } else {
                        setAgree("No");
                      }
                    }}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </button>
                <button
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  onClick={() => {
                    navigate("/data-grid");
                  }}
                >
                  Cancel
                </button>
              </div>
            </FormElement>
          )}
        />
      </div>
    </>
  );
};
export default FormInput;
