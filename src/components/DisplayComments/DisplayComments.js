import React from "react";
import { CommentTile } from "../";

export const DisplayComments = (props) => {
  const { comments } = props;

  const formatDate = (date) => {
    const d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    month = month >= 10 ? month : `0${month}`;
    day = day >= 10 ? day : `0${day}`;
    return `${d.getFullYear()}-${month}-${day}`;
  };

  return (
    <div>
      {comments &&
        comments.map((comment, index) => (
          <CommentTile
            key={index}
            name={comment.user.name}
            comment={comment.comment}
            time={formatDate(comment.date)}
          />
        ))}
    </div>
  );
};
