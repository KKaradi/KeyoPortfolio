import type { NextPage } from "next/types";
import styles from "../../styles/components/multiwordle/Keyboard.module.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { ReactElement, useCallback, useEffect, useState } from "react";

const icons: { [key: string]: ReactElement } = {
  ":enter": <KeyboardReturnIcon />,
  ":backspace": <BackspaceIcon />,
};

const defaultKeyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [":enter", "z", "x", "c", "v", "b", "n", "m", ":backspace"],
];

type KeyboardProps = {
  onPress?: (userInput: string) => void;
  onSubmit?: (userInput: string) => void;
  keyboard?: string[][];
};

const isLetter = (char: string) => {
  return char.length == 1 && Boolean(char.match(/[A-Za-z]/g));
};

const Keyboard: NextPage<KeyboardProps> = ({ onPress, onSubmit, keyboard }) => {
  const [userInput, setUserInput] = useState("");

  const onKeyDown = useCallback(
    (key: string) => {
      key = key.replace(/:/g, "");
      let newUserInput = userInput;
      let onSubCalledFlag = false;
      if (key.toLowerCase() === "enter" && onSubmit) {
        newUserInput = "";
        onSubmit(userInput);
        onSubCalledFlag = true;
      }

      if (key.toLowerCase() === "backspace") {
        newUserInput = newUserInput.slice(0, -1);
      }

      if (isLetter(key)) newUserInput = newUserInput + key;

      if (newUserInput !== userInput && onPress && !onSubCalledFlag)
        onPress(newUserInput);
      setUserInput(newUserInput);
    },
    [onPress, onSubmit, userInput]
  );

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => onKeyDown(key);
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [onKeyDown]);

  return (
    <div className={styles.container}>
      {(keyboard ?? defaultKeyboard).map((row, rowIndex) => (
        <div className={styles.row} key={rowIndex}>
          {row.map((key, keyIndex) => (
            <button
              className={styles.button}
              onClick={() => onKeyDown(key)}
              key={keyIndex}
            >
              {key.startsWith(":") ? icons[key] : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
