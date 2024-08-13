import styles from "../styles/posts.module.css";
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function PopularPosts() {
  function getRelativeTime(dateTimeString) {
    const now = new Date();
    const pastDate = new Date(dateTimeString);
    const seconds = Math.floor((now - pastDate) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return interval === 1 ? `a ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }

    return "just now";
  }

  const [dataArray, setDataArray] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("http://localhost:3000/allposts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const getDislikedArray = [...data].filter(
          (value) => value.postVotes.likes < 0
        );
        const popularArray = getDislikedArray.sort((a, b) => a - b);
        setDataArray(popularArray);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoader(true);
      });
  }, []);

  function postLikeFunc(postID) {
    const updatedDataArray = dataArray.map((post) => {
      if (post._id === postID) {
        const updatedPost = { ...post };
        if (updatedPost.postVotes.liked) {
          updatedPost.postVotes.likes -= 1;
          updatedPost.postVotes.liked = false;
        } else {
          updatedPost.postVotes.likes += 1;
          updatedPost.postVotes.liked = true;
          if (updatedPost.postVotes.disliked) {
            updatedPost.postVotes.likes += 1;
            updatedPost.postVotes.disliked = false;
          }
        }
        return updatedPost;
      }
      return post;
    });

    setDataArray(updatedDataArray);

    fetch(`http://localhost:3000/allposts/${postID}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(
        updatedDataArray.find((post) => post._id === postID)
      ),
    });
  }

  function postDislikeFunc(postID) {
    const updatedDataArray = dataArray.map((post) => {
      if (post._id === postID) {
        const updatedPost = { ...post };
        if (updatedPost.postVotes.disliked) {
          updatedPost.postVotes.likes += 1;
          updatedPost.postVotes.disliked = false;
        } else {
          updatedPost.postVotes.likes -= 1;
          updatedPost.postVotes.disliked = true;
          if (updatedPost.postVotes.liked) {
            updatedPost.postVotes.likes -= 1;
            updatedPost.postVotes.liked = false;
          }
        }
        return updatedPost;
      }
      return post;
    });

    setDataArray(updatedDataArray);

    fetch(`http://localhost:3000/allposts/${postID}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(
        updatedDataArray.find((post) => post._id === postID)
      ),
    });
  }

  return (
    <>
      {loader && <Loading />}
      <div className={styles.posts_container}>
        {(dataArray.length == 0 && !loader && (
          <p>No posts are disliked yet. Share and spark a conversation! 💬</p>
        )) ||
          (dataArray &&
            dataArray.slice(0, 10).map((value, key) => {
              return (
                <div key={key} className={styles.post_card}>
                  <div className={styles.texts_container}>
                    <h1>{value.postText}</h1>
                    <div className={styles.post_card_footer}>
                      <Link
                        to={`https://www.instagram.com/${value.socialHandle}/`}
                      >
                        <span>Qoute by {value.socialHandle}</span>
                      </Link>
                      <span>{getRelativeTime(value.createdAt)}</span>
                    </div>
                  </div>
                  <div className={styles.post_likes_button_container}>
                    <Button
                      onClick={() => postLikeFunc(value._id)}
                      colorScheme={!value.postVotes.liked ? "cyan" : "gray"}
                      size="sm"
                      margin={1}
                    >
                      <ArrowUpIcon backgroundColor="transparent" />
                    </Button>
                    <span>{value.postVotes.likes}</span>
                    <Button
                      colorScheme={!value.postVotes.disliked ? "cyan" : "gray"}
                      onClick={() => postDislikeFunc(value._id)}
                      size="sm"
                      margin={1}
                    >
                      <ArrowDownIcon backgroundColor="transparent" />
                    </Button>
                  </div>
                </div>
              );
            }))}
      </div>
      {dataArray.length == 0 ? (
        ""
      ) : (
        <div className="btn_area">
          <Link to="/createpost">
            <Button colorScheme="cyan">
              <AddIcon color="black" fontSize={18} background="transparent" />
              <span> Add qoute </span>
            </Button>
          </Link>
          <p>Looks like you hit rock bottom...</p>
        </div>
      )}
    </>
  );
}

export default PopularPosts;
