import Header from "../../components/header";
import CreatePost from "../../components/create-post/create-post";
import Post from "../../components/post";
import { useState, useRef, useEffect } from "react";
import "./style.scss";

export default function Home({ setVisible, posts }) {
  // console.log(posts._id);
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <div className="home_middle" ref={middle}>
        <CreatePost setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
