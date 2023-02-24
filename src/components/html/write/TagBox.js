import styled from "styled-components";
import React, { useState, useCallback } from "react";
import { useEffect } from "react";

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid gray;
    padding-top: 2rem;

    h4 {
        color: gray;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid gray;
    input, button {
        outline: none;
        border: none;
        font-size: 1rem;
    }
    
    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }

    button {
        cursor: pointer;
        padding: 0 1rem 0 1rem;
        border: none;
        background: gray;
        color: white;
        font-weight: bold;
        &:hover {
            background: gray;
        }
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: gray;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const TagListBlock = styled.div`
    display: flex;
    margin-top: 0.5rem;
`;

// React.memo를 사용해 tag값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

// React.memo를 사용해 tags 값이 바뀔 때만 리렌더링 되도록 처리
const TagList = React.memo(({ tags, onRemove }) => {
  return (<TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>)
});

const TagBox = ({ onChangeTags, tags }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    tag => {
      if (!tag) return; // 공백이면 추가하지 않음
      if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim()); // 압뒤 공백을 없앤 후 등록
      setInput(''); // input 초기화
    },
    [input, insertTag],
  );

  // tags 값이 바뀔 때
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
