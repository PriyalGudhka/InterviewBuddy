import "./post-styles.scss";
import { Feeling, Photo } from "../../svg";

//Function to create a new post
export default function CreatePost({ setVisible }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <div
          className="open-post hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          Create a new post, {localStorage.getItem("firstname")}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div
          className="createPost_icon hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <Photo color="#4bbf67" />
          Photo
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling
        </div>
      </div>
    </div>
  );
}
