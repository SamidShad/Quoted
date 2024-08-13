import styles from "../styles/createpost.module.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePost() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    postText: "",
    socialHandle: "",
  });

  function writeFunc(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPostData({
      ...postData,
      [name]: value,
    });
  }

  function createPostFunc() {
    postData.postText.length == 1
      ? toast.error("Just one character?")
      : fetch("https://quotedapi-samidshads-projects.vercel.app/createpost", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(postData),
        })
          .then((res) => res.json())
          .then((data) => {
            data.message == "Fill all the inputs"
              ? toast.error(data.message)
              : toast.success(data.message) && navigate("/");
          });
  }

  return (
    <>
      <div className={styles.createpost_area}>
        <div className={styles.createpost_card}>
          <Link to="/">
            <Button colorScheme="cyan" color="white" size="lg">
              Back
            </Button>
          </Link>
          <h1>What's your fact ?</h1>

          <div className={styles.createpost_inputs_area}>
            <div>
              <p>Your fact</p>
              {postData.postText.length == 280 ? (
                <p style={{ color: "red" }}>{postData.postText.length}</p>
              ) : (
                <p>{postData.postText.length}</p>
              )}
            </div>
            <textarea
              name="postText"
              maxLength={280}
              minLength={2}
              onChange={writeFunc}
              value={postData.fact}
              placeholder="Write here..."
              rows={8}
              className={styles.createpost_inputs}
            ></textarea>

            <p>Showoff your instagram handel</p>
            <input
              placeholder="Write here..."
              maxLength={20}
              min={1}
              onChange={writeFunc}
              type="text"
              value={postData.socialHandle}
              name="socialHandle"
              className={styles.createpost_inputs}
            />
            <Button
              onClick={createPostFunc}
              colorScheme="cyan"
              color="white"
              size="lg"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
