import "./style.scss";
import { useState, useRef, useEffect } from "react";
import Picker from "emoji-picker-react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside.js";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import dataURItoBlob from "../../helpers/dataURItoBlob.js";
import { uploadImages } from "../../functions/uploadImages";

export default function CreatePostPopup({ newUserDeatils, setVisible }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const textRef = useRef(null);
  const popup = useRef(null);
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState("");
  const [error, setError] = useState("");

  useClickOutside(popup, () => {
    setVisible(false);
  });

  const postSubmit = async () => {
    if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${localStorage.getItem("firstname")}/post Images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      console.log("formdata", formData);
      console.log("post", postImages);
      const response = await uploadImages(formData, path);
      console.log(response);
      await createPost(text, response, localStorage.getItem("userId"));
      setLoading(false);
      setText("");
      setImages("");
      setVisible(false);
    } else if (text) {
      setLoading(true);
      const res = await createPost(
        text,
        // newUserDeatils.localStorage.getItem("userId"),
        null,
        localStorage.getItem("userId")
        //null
        //newUserDeatils.token
      );
      setLoading(false);
      setText("");
      setVisible(false);
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <div className="box_col">
            <div className="box_profile_name">
              {localStorage.getItem("firstname")}{" "}
              {localStorage.getItem("lastname")}
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackground
              text={text}
              setText={setText}
              user={newUserDeatils}
              showPrev={showPrev}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            showPrev={showPrev}
            user={newUserDeatils}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            // setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "post"}
        </button>
      </div>
    </div>
  );
}
