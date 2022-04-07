import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  MultiSelectTree,
  getMultiSelectTreeValue,
} from "@progress/kendo-react-dropdowns";
import {
  processMultiSelectTreeData,
  expandedState,
} from "./multiselecttree-data-operations";
import { data } from "./tree-data";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
const dataItemKey = "id";
const checkField = "checkField";
const checkIndeterminateField = "checkIndeterminateField";
const subItemsField = "items";
const expandField = "expanded";
const textField = "text";
const fields = {
  dataItemKey,
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};
const permissonApi = [
  {
    roleid: 1,
    title: ["Dinesh"],
    permisson: [
      {
        permissonId: 1,
        title: "news.create",
        hasPermission: true,
      },
      {
        permissonId: 2,
        title: "news.edit",
        hasPermission: false,
      },
      {
        permissonId: 3,
        title: "news.delete",
        hasPermission: true,
      },
    ],
  },
  {
    roleid: 1,
    title: ["Dinesh"],
    permisson: [
      {
        permissonId: 1,
        title: "news.create",
        hasPermission: true,
      },
      {
        permissonId: 2,
        title: "news.edit",
        hasPermission: false,
      },
      {
        permissonId: 3,
        title: "news.delete",
        hasPermission: true,
      },
    ],
  },
];
const Roles = () => {
  const [value, setValue] = React.useState<any>([]);
  const [expanded, setExpanded] = React.useState<any>([data[0][dataItemKey]]);

  const onChange = (event: any) =>
    setValue(getMultiSelectTreeValue(data, { ...fields, ...event, value }));

  const onExpandChange = React.useCallback(
    (event: any) =>
      setExpanded(expandedState(event.item, dataItemKey, expanded)),
    [expanded]
  );
  const treeData = React.useMemo(
    () =>
      processMultiSelectTreeData(data, {
        expanded,
        value,
        ...fields,
      }),
    [expanded, value]
  );
  return (
    <div style={{ margin: 20, display: "flex" }}>
      <Form
        render={(formRenderProps: FormRenderProps) => (
          <FormElement>
            <div className="mb-2">
              <Field name={"title"} component={Input} label={"Title"} />
            </div>
            <style>
              {`
                .k-treeview-lines {
                  display: flex;
                  flex-direction: column;
                }
                `}
            </style>
            <MultiSelectTree
              style={{
                width: "440px",
                display: "flex",
                flexDirection: "column",
                marginTop: 5,
              }}
              data={treeData}
              value={value}
              onChange={onChange}
              placeholder="Select ..."
              textField={textField}
              dataItemKey={dataItemKey}
              checkField={checkField}
              checkIndeterminateField={checkIndeterminateField}
              subItemsField={subItemsField}
              expandField={expandField}
              onExpandChange={onExpandChange}
              label={"Permission"}
            />

            <div className="k-form-buttons">
              <button
                type={"submit"}
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              >
                Submit
              </button>
            </div>
          </FormElement>
        )}
      />
    </div>
  );
};

export default Roles;
