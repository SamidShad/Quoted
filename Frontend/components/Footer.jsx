import styles from "../styles/footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className={styles.footer_area}>
        <footer className={styles.footer}>
          <div className={styles.links}>
            <h1>Discover</h1>
            <Link to="/">
              <p>New</p>
            </Link>
            <Link to="/popularposts">
              <p>Popular</p>
            </Link>
            <Link to="/hatedposts">
              <p>Hated</p>
            </Link>
          </div>
          <div className={styles.links}>
            <h1>Engage</h1>
            <Link to="/createpost">
              <p>Create qoutes</p>
            </Link>
          </div>
          <div className={styles.links}>
            <h1>More</h1>
            <Link target="_blank" to="https://www.instagram.com/samid.codes/">
              <p>Contact us</p>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
