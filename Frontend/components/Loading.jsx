import { CircularProgress } from "@chakra-ui/react";
import styles from "../styles/loading.module.css";

function Loading() {
  return (
    <>
      <div className={styles.loading_area}>
        <CircularProgress isIndeterminate color="cyan.300" />
      </div>
    </>
  );
}

export default Loading;
