import {
  Breadcrumb,
  BreadcrumbLinkMouseEvent,
  BreadcrumbLinkKeyDownEvent,
} from "@progress/kendo-react-layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { useState } from "react";
interface DataModel {
  id: string;
  text?: string;
  icon?: React.ReactNode;
  iconClass?: string;
}

const items: DataModel[] = [
  {
    id: "home",
    text: "Home",
    iconClass: "k-i-home",
  },
  {
    id: "products",
    text: "Products",
  },
  {
    id: "computer",
    text: "Computer",
  },
  {
    id: "gaming",
    text: "Gaming",
  },
  {
    id: "keyboard",
    text: "Keyboard",
  },
];

const BreadCrumb = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataModel[]>(items);

  const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
    const itemIndex: number = data.findIndex(
      (curValue) => curValue.id === event.id
    );
    const newData: DataModel[] = data.slice(0, itemIndex + 1);

    setData(newData);
  };

  //   const handleButtonClick = (event: React.MouseEvent) => {
  //     if (event) {
  //       setData(items);
  //     }
  //   };

  const handleKeyDown = (event: BreadcrumbLinkKeyDownEvent) => {
    if (event.nativeEvent.keyCode === 13) {
      const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
      const newData = data.slice(0, itemIndex + 1);

      setData(newData);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <Breadcrumb
        data={data}
        onItemSelect={handleItemSelect}
        onKeyDown={handleKeyDown}
        style={{
          width: "200",
          color: "#1F5DC9",
          background: "none",
        }}
      />
      <Button
        style={{
          marginRight: "10px",
          background: "#1976d2",
          color: "white",
          fontWeight: "600",
        }}
        className="btn"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create
      </Button>
    </div>
  );
};
export default BreadCrumb;
