import styled, { css } from "styled-components";
import SubInfo from "./SubInfo";
import Tags from "./Tags";

const PostItemBlock = styled.div`
    background-color: white;
    width: 480px;
    height: 180px;
    overflow-y: hidden;
    padding: 0 1rem 0 1rem;
`;

const PostItem = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    return (
        <PostItemBlock>
            <h2>{title}</h2>
            <SubInfo
                username={user.username}
                publishedDate={new Date(publishedDate)}
            />
            <Tags tags={tags} />
            <p>{body}</p>
        </PostItemBlock>
    );
};

export default PostItem;