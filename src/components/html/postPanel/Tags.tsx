import styled from 'styled-components';

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  display: flex;
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

const Tags = ({ tags }: { tags: Array<string> }) => {
  return (
    <TagsBlock>
      {tags.map(tag => (
        <div className="tag" key={tag}>
          #{tag}
        </div>
      ))}
    </TagsBlock>
  );
};

export default Tags;
