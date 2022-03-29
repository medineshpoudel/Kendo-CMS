import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import { notification } from "../../store/store";
const DataGrid = () => {
  const { isSuccess, dissolveSubmit } = notification();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const Actions = (e: any) => {
    const updateHandler = () => {
      navigate(`/update/${e.dataItem.id}`);
    };
    const deleteHandler = () => {
      axios
        .delete(
          `https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo/${e.dataItem.id}`
        )
        .then(() => {
          axios
            .get("https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo")
            .then((res: any) => {
              setDatas(res);
              setSuccess(true);
            });
        });
    };
    return (
      <td>
        <Button
          style={{ marginLeft: "10px", marginRight: "10px" }}
          onClick={updateHandler}
        >
          Update
        </Button>
        <Button onClick={deleteHandler}>Delete</Button>
      </td>
    );
  };
  const [datas, setDatas] = useState<any>();
  useEffect(() => {
    axios
      .get("https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo")
      .then((res: any) => {
        setDatas(res);
      });
  }, []);
  return (
    <div>
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
      <NotificationGroup
        style={{
          right: 0,
          bottom: 50,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <Fade>
          {isSuccess && (
            <Notification
              type={{
                style: "success",
                icon: true,
              }}
              closable={true}
              onClose={() => setSuccess(false)}
            >
              <span>Your data has been added.</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
      {success
        ? setTimeout(() => {
            setSuccess(false);
          }, 5000)
        : null}
      {isSuccess
        ? setTimeout(() => {
            dissolveSubmit();
          }, 5000)
        : null}

      <div style={{ marginTop: "10px" }}>
        {datas ? (
          <Grid data={datas}>
            <GridColumn field="id" title="ID" width="40px" />
            <GridColumn field="product" title="Product" />
            <GridColumn field="description" title="Description" />
            <GridColumn field="email" title="Email" width="250px" />
            <GridColumn field="value" title="Date" width="150px" />
            <GridColumn field="size" title="Size" width="100px" />
            <GridColumn field="selectedValue" title="Gender" width="100px" />
            <GridColumn field="agree" title="Agree?" width="100px" />
            <GridColumn
              title="Actions"
              cell={(e) => Actions(e)}
              width="250px"
            />
          </Grid>
        ) : (
          "Loading...."
        )}
      </div>
    </div>
  );
};
export default DataGrid;
