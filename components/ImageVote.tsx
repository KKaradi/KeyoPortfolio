import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/components/ImageVote.module.css";

type ImageVoteProps = {
  paths: [string, string];
  walletAddress?: string;
};

const ImageVote: NextPage<ImageVoteProps> = ({ paths }) => {
  const [hasPicked, setHasPicked] = useState(false);

  const onClick = async (index: number) => {
    if (hasPicked) return;
    setHasPicked(true);

    await fetch("/api/post/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    });
  };

  const images = paths.map((path, index) => (
    <div className={styles.imageContainer} key={index}>
      <Image
        className={styles.image}
        layout="fill"
        src={path}
        alt=""
        onClick={() => onClick(index)}
      />
    </div>
  ));

  return <div className={styles.imageRow}> {images} </div>;
};

export default ImageVote;
