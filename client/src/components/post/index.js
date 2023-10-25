import "./style.scss";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import { useState, useEffect } from "react";
import ReactsPopup from "./reactPopup";
import CreateComment from "./createComment";
import { getReacts, reactPost } from "../../functions/post";
import axios from "axios";

export default function Post({ post, registers }) {
  const [visible, setVisible] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(post.registers);
        const res = await axios.get(
          `http://localhost:5050/api/get-profile-data/${post.registers._id}`
        );
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    getPostReact();
  }, [post]);

  const getPostReact = async () => {
    const res = await getReacts(post._id);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
  };
  const reactHandler = async (type) => {
    reactPost(post._id, type);
    if (check == type) {
      setCheck();
      let index = reacts.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts.findIndex((x) => x.react == type);
      let index1 = reacts.findIndex((x) => x.react == type);
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = ++reacts[index1].count)]);
        setTotal((prev) => ++prev);
      }
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    }
  };

  console.log(user);

  return (
    <div className="post">
      <div className="post_header">
        <div className="header_col">
          <div className="post_profile_name">
            <span>
              {user?.firstname} {user?.lastname}
            </span>
          </div>
          <div className="post_profile_privacy_date">
            <Moment fromNow interval={30}>
              {post.createdAt}
            </Moment>
            . <Public color="#828387" />
          </div>
        </div>
      </div>
      <div className="post_text">{post.text}</div>
      {post.images && post.images.length && (
        <div
          className={
            post.images.length === 1
              ? "grid_1"
              : post.images.length === 2
              ? "grid_2"
              : post.images.length === 3
              ? "grid_3"
              : post.images.length === 4
              ? "grid_4"
              : post.images.length >= 5 && "grid_5"
          }
        >
          {post.images.slice(0, 5).map((image, i) => (
            <img src={image.url} key={i} alt="" className={`img-${i}`} />
          ))}
          {post.images.length > 5 && (
            <div className="more-pics-shadow">+{post.images.length - 5}</div>
          )}
        </div>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react) =>
                    react.count > 0 && (
                      <img src={`../../../reacts/${react.react}.svg`} alt="" />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check ? check : "like")}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=""
              className="small_react"
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}

          <span
            style={{
              color: `${
                check === "like"
                  ? "#4267b2"
                  : check === "love"
                  ? "#f63459"
                  : check === "haha"
                  ? "#f7b125"
                  : check === "sad"
                  ? "#f7b125"
                  : check === "wow"
                  ? "#f7b125"
                  : check == "angry"
                  ? "#e4605a"
                  : ""
              }`,
            }}
          >
            {check ? check : "Like"}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComment user={registers} />
      </div>
    </div>
  );
}
