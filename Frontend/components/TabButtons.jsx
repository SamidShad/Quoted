import styles from "../styles/navbar.module.css";
import { Tabs, Tab, TabList, TabIndicator } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function TabButtons() {
  return (
    <>
      <div className={styles.hero_section}>
        <h1>
          "<span>30 Essential</span> Quotes Curated by You and the
          <span> Web</span>"
        </h1>
        <p>
          Upvote & Downvote Your Favorite Quotes!
          <Link to="/createpost">
            <b> Create </b>
          </Link>
          your favorite quotes below. No account needed!
        </p>
      </div>

      <div className={styles.tabs_area}>
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Link to="/">
              <Tab fontSize={20}>New</Tab>
            </Link>
            <Link to="/popularposts">
              <Tab fontSize={20}>Popular</Tab>
            </Link>
            <Link to="/hatedposts">
              <Tab fontSize={20}>Hated</Tab>
            </Link>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="cyan.500"
            borderRadius="1px"
          />
        </Tabs>
      </div>
    </>
  );
}

export default TabButtons;
