import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export { MyInput };

function MyInput({ label, ...props }) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{ padding: "5px" }}
    >
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        {...props}
      />
    </Box>
  );
}
