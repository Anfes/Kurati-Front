import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RemoveIcon from "@mui/icons-material/Remove";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  checkBox: {
    color: "#D1E3F5",
    "&.Mui-checked": {
      color: "#4FDFC8",
    },
  },
}));

const CustomCollapsibleTable = (props) => {
  const { content, label, checked, onChange } = props;
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);
  
  const onChangeOp = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <div
   
        className={
          checked === false
            ? clsx(
                "w-full border-1 flex justify-between px-20 py-12 rounded-t-4 cursor-pointer"
              )
            : clsx(
                "w-full border-1 flex justify-between px-20 py-12 rounded-t-4 border-secondary cursor-pointer"
              )
        }
        style={
          checked === false
            ? { backgroundColor: "#F5FBFF", borderColor: "#D1E3F5" }
            : { backgroundColor: "#CDFFF7" }
        }
      >
        <div onClick={onChange} className="flex items-center cursor-pointer"  style={{width:'95%'}}>
          <div className="flex items-center mr-8">
            <Checkbox
              className={classes.checkBox}
              style={{ padding: 0 }}
              color="primary"
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              checked={checked}
              onChange={onChange}
            />
          </div>
          <Typography
            className="font-semibold text-16"
            style={
              checked === false ? { color: "#4C647A" } : { color: "#3ABDA8" }
            }
          >
            {label}
          </Typography>
        </div>

        <IconButton onClick={onChangeOp} style={{width:'5%'}}>
          <div className="border 1 border-secondary p-1 flex justify-center items-center w-min">
            {open === false ? (
              <AddIcon className="text-secondary" />
            ) : (
              <RemoveIcon className="text-secondary" />
            )}
          </div>
        </IconButton>
      </div>
      {open ? (
        <div
          className={
            checked === false
              ? clsx("w-full border-1 flex px-20 py-12 rounded-b-4")
              : clsx(
                  "w-full border-1 flex px-20 py-12 rounded-b-4 border-secondary"
                )
          }
          style={checked === false ? { borderColor: "#D1E3F5" } : {}}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
};

export default CustomCollapsibleTable;
