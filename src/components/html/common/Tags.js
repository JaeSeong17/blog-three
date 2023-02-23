import styled from "styled-components";
import { Link } from "react-router-dom";

const TagsBlock = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: red;
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
            opacity: 0.75;
        }
    }
`;

const Tags = ({ tags }) => {
    return (
        <TagsBlock>
            {tags.map(tag => (
                <div key={tag}>#{tag}</div>
            ))}
        </TagsBlock>
    );
};

export default Tags;