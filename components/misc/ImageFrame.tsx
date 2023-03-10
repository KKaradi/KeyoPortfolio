import { NextPage } from "next";
import Image from "next/image";
import styles from "../../styles/components/misc/ImageFrame.module.css";

type ImageFrameProps = {
  path: string;
};

const ImageFrame: NextPage<ImageFrameProps> = ({ path }) => {
  return (
    <div className={styles.frame}>
      <div className={styles.image}>
        <Image
          src={path}
          width={14}
          height={10}
          layout="responsive"
          objectFit="cover"
          alt="Hint Image"
          priority
        />
      </div>
    </div>
  );
};

export default ImageFrame;
