import {
  Label,
  Error,
  Hint,
  FloatingLabel,
} from "@progress/kendo-react-labels";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Icon } from "@progress/kendo-react-common";
import { useState } from "react";
export const FormInput = (fieldRenderProps: any) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    optional,
    icon,
    eyeIcon,
    ...others
  } = fieldRenderProps;
  const [fieldType, setFieldType] = useState(type);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  return (
    <FieldWrapper>
      <Label
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        optional={optional}
      >
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <div
          style={{
            display: "flex",
            border: "1px solid  grey",
            borderRadius: "5px",
          }}
        >
          <Icon name={icon} style={{ margin: "10px" }}></Icon>
          <Input
            valid={valid}
            type={fieldType}
            id={id}
            style={{ border: "none", outline: "none", boxShadow: "none" }}
            disabled={disabled}
            ariaDescribedBy={`${hintId} ${errorId}`}
            {...others}
          />
          {eyeIcon ? (
            <Icon
              name={eyeIcon}
              style={{ margin: "10px" }}
              onClick={() => {
                fieldType === "password"
                  ? setFieldType("text")
                  : setFieldType("password");
              }}
            ></Icon>
          ) : (
            ""
          )}
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </div>
    </FieldWrapper>
  );
};
