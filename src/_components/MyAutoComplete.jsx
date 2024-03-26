import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MyAutoComplete({
  label,
  data,
  acualizafun = () => {},
}) {
  return (
    <Autocomplete
      componentsProps={{
        paper: {
          sx: {
            width: "100%",
          },
        },
      }}
      style={{ paddingTop: "5px" }}
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, newValue) => {
        console.log("probando", newValue);
        acualizafun(newValue);
      }}
    />
  );
}
