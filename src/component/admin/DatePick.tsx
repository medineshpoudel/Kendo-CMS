import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { useState } from "react";
const DatePick = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  const handleChange = (event: DatePickerChangeEvent) => {
    setValue(event.value);
  };

  return (
    <div
      className="col-xs-12 col-md-12 example-col"
      style={{ marginTop: "20px" }}
    >
      <DatePicker value={value} onChange={handleChange} />
    </div>
  );
};
export default DatePick;
