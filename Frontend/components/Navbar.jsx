import styles from "../styles/navbar.module.css";
import { Button, Avatar } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div className={styles.navbar_area}>
        <nav className={styles.navbar}>
          <Link to="/createpost">
            <Button size="md" colorScheme="cyan">
              <AddIcon color="black" fontSize={18} background="transparent" />
            </Button>
          </Link>
          <Link to="/">
            <h1>Quoted</h1>
          </Link>
          <Tooltip label="Build By Samid">
            <Link target="_blank" to="https://www.instagram.com/samid.codes/">
              <Avatar name="Samid Shad" src="samid.webp" />
            </Link>
          </Tooltip>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
