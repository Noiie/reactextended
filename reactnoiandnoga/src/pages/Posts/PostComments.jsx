import { useOutletContext } from "react-router-dom";

function PostComments() {
  const { currentPostId } = useOutletContext();
  console.log(currentPostId);

  return <div>PostComments</div>;
}

export default PostComments;
