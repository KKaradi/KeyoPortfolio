import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/components/ImageVote.module.css";
import { useAccount } from "wagmi";
import ErrorDialog from "./dialogs/ErrorDialog";
import { useEffect, useState } from "react";
import { post, getImageSetIndex } from "../helpers";

type ChoiceCount = { [key: number]: number };

const connectMessage = "Connect your wallet before voting!";
const votedMessage = "You already voted today!";
const reloadMessage = "You are out of date! Please reload the page.";

const START_DATE = process.env.START_DATE;
if (!START_DATE) throw new Error("START_DATE env var not present");

type ImageVoteProps = {
  incrementChoicesMade?: () => void;
};

const ImageVote: NextPage<ImageVoteProps> = ({ incrementChoicesMade }) => {
  const [imageSetIndex, setImageSetIndex] = useState<number | undefined>();
  const [choiceCount, setChoiceCount] = useState<ChoiceCount | undefined>();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const folder = getImageSetIndex();
    setImageSetIndex(folder);
    setPaths([1, 2].map((num) => `/choice/${folder}/${num}.jpg`));
  }, []);

  const [connectDialogIsOpen, setConnectDialogIsOpen] = useState(false);
  const [votedDialogIsOpen, setVotedDialogIsOpen] = useState(false);
  const [reloadDialogIsOpen, setReloadDialogIsOpen] = useState(false);

  const walletAddress = useAccount().data?.address;

  useEffect(() => {
    if (!walletAddress) setChoiceCount(undefined);
  }, [walletAddress]);

  const onClick = async (choiceIndex: number) => {
    if (!walletAddress) return setConnectDialogIsOpen(true);

    const body = { choiceIndex, walletAddress, imageSetIndex };
    const response = await post("/api/post/vote", body);

    // 461 signifies already voted, 462 to reload page
    if (response.status == 461) setVotedDialogIsOpen(true);
    if (response.status == 462) setReloadDialogIsOpen(true);

    if (response.status == 200) {
      const { choiceCount: count } = await response.json();
      if (count) setChoiceCount(count);

      if (incrementChoicesMade) incrementChoicesMade();
    }
  };

  const images = paths.map((path, index) => {
    const percentage = choiceCount ? choiceCount[index] ?? 0 : null;

    return (
      <div className={styles.choiceContainer} key={index}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            layout="fill"
            src={path}
            alt=""
            onClick={() => onClick(index)}
          />
        </div>
        <h1 className={styles.percentage}> VOTES: {percentage} </h1>
      </div>
    );
  });

  return (
    <div>
      <ErrorDialog
        text={connectMessage}
        isOpen={connectDialogIsOpen}
        setIsOpen={setConnectDialogIsOpen}
      />
      <ErrorDialog
        text={votedMessage}
        isOpen={votedDialogIsOpen}
        setIsOpen={setVotedDialogIsOpen}
      />
      <ErrorDialog
        text={reloadMessage}
        isOpen={reloadDialogIsOpen}
        setIsOpen={setReloadDialogIsOpen}
      />
      <div className={styles.imageRow}> {images} </div>
    </div>
  );
};

export default ImageVote;
