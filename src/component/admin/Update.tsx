import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { RadioButton } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import { Switch } from "@progress/kendo-react-inputs";
import axios from "axios";

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
const Update = () => {
  const [size, setSize] = useState<any>("");
  const [agree, setAgree] = useState("No");
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const filterData = (filter: any) => {
    const data = sizes.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event: any) => {
    setSize(filterData(event.filter));
  };
  const { id } = useParams();
  const [data, setData] = useState<any>();

  const [value, setValue] = useState<Date | null>(new Date());
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValue, setSelectedValue] = useState("male");
  const navigate = useNavigate();
  const handleChange = (event: DatePickerChangeEvent) => {
    setValue(event.value);
  };
  useEffect(() => {
    axios
      .get(`https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo/${id}`)
      .then((res: any) => {
        setData(res.data);
        setProduct(res.data.product);
      });
  }, []);
  const handleSubmit = (dataItem: { [name: string]: any }) => {
    axios
      .put(`https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo/${id}`, {
        product,
        description,
        email,
        value,
        selectedValue,
        size,
        agree,
      })
      .then(() => {
        navigate("/data-grid");
      });
  };
  const handleChanges = useCallback(
    (e: any) => {
      setSelectedValue(e.value);
    },
    [setSelectedValue]
  );

  return (
    <div
      style={{
        margin: "10px",
        width: "800px",
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      {data ? (
        <Form
          onSubmit={handleSubmit}
          initialValues={{
            product: data.product,
            description: data.description,
            email: data.email,
            agree: data.agree,
            size: data.size,
            selectedValue: data.selectedValue,
            value: data.value,
          }}
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
                    value={product}
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
                <div style={{ marginTop: "20px" }}>
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
                    name={"agree"}
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
      ) : (
        "Loading...."
      )}
    </div>
  );
};
export default Update;
