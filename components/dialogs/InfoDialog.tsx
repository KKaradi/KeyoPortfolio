import { useState, ReactElement } from "react";
import Button from "@mui/material/Button";
import styles from "../../styles/components/ImageDialog.module.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { NextPage } from "next/types";
import SlideTransition from "./SlideTransition";
import { colors } from "../../constants/colors";
import { Typography } from "@mui/material";
import Box from "@mui/system/Box";

type InfoDialogProps = {
  children: ReactElement;
};

const InfoDialog: NextPage<InfoDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog
        open={isOpen}
        TransitionComponent={SlideTransition}
        keepMounted
        onClose={() => setIsOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: colors.background,
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle>
          <h1 className={styles.dialogtitle}>What Am I Looking At?</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.dialogcontent}>
            Short answer is: you'll see. We're working on some pretty cool stuff
            right now, but it's not quite ready to be released yet. In the
            meantime, connect your wallet and try your hand at voting. Who
            knows, there might be something in for you at the end of all this.
          </DialogContentText>
        </DialogContent>
        
          
            <Button
              variant="contained"
              className={styles.dialogbutton}
              size="large"

              onClick={() => setIsOpen(false)}
            >
              OK
            </Button>
          
  
      </Dialog>
    </div>
  );
};

export default InfoDialog;
