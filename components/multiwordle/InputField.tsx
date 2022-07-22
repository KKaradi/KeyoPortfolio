import { NextPage } from "next";
import styles from "../../styles/components/multiwordle/InputField.module.css";
import { ReturnGameMode } from "../../pages/api/post/multiwordle";
import Square from "./Square";

type InputFieldProps = {
  gameState: ReturnGameMode;
  activeSlide: number;
};

const InputField: NextPage<InputFieldProps> = ({ gameState, activeSlide }) => {
  return (
    <div className={styles.body}>
      {gameState.inputs.map((input, inputIndex) => {
        const backgroundColor = activeSlide === inputIndex ? "#ddd" : undefined;
        return (
          <div
            key={inputIndex}
            className={styles.word}
            style={{ backgroundColor }}
          >
            {input.characters.map(({ character, status }, characterIndex) => {
              return (
                <a href={`#slide-${inputIndex + 1}`} key={characterIndex}>
                  <div className={styles.cell}>
                    <Square character={character} color={status} />
                  </div>
                </a>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default InputField;
