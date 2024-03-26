import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function MySelect({
  style,
  data,
  value,
  label,
  formikVal,
  keyLabel = null,
  ...props
}) {
  if (keyLabel) {
    return (
      <Box style={style || { padding: "5px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            {...props}
          >
            {data.map((item) => {
              return (
                <MenuItem
                  key={value + label + item[keyLabel]}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  } else {
    return (
      <Box style={style || { padding: "5px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            {...props}
          >
            {data.map((item) => {
              return (
                <MenuItem key={value + label} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
}
