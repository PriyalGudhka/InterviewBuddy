import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

//Function to add emoji in post
export default function EmojiPickerBackground({
  text,
  newUserDetials,
  setText,
  type2,
}) {
  const [picker, setPicker] = useState(false); //useState for emoji picker
  const [cursorPosition, setCursorPosition] = useState(); //useState for curser
  const textRef = useRef(null); //text ref

  //use effect to set text and emoji in the text area of post
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionEnd);
    const newText = start + emoji + end;
    setText(newText);
    // console.log(emoji);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          ref={textRef}
          maxLength="100"
          value={text}
          placeholder={`What's on your mind`}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}

        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
