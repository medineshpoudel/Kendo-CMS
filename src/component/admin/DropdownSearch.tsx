import { DropDownList } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
import { useState } from "react";
const allData = [
  {
    id: 1,
    text: "Small",
  },
  {
    id: 2,
    text: "Medium",
  },
  {
    id: 3,
    text: "Large",
  },
];
const DropDownSearch = () => {
  const [data, setData] = useState(allData.slice());

  const filterData = (filter: any) => {
    const data = allData.slice();
    return filterBy(data, filter);
  };

  const filterChange = (event: any) => {
    setData(filterData(event.filter));
  };

  return (
    <DropDownList
      style={{
        width: "300px",
      }}
      data={data}
      textField="text"
      filterable={true}
      onFilterChange={filterChange}
    />
  );
};
export default DropDownSearch;
