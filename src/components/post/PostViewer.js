import styled from "styled-components";

const PostViewerBlock = styled.div`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid gray;
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 { 
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    color: gray;

    span + span:before {
        color: gray;
        padding: 0 0.25rem 0 0.25rem;
        content: '\\B7';
    }
`;

const Tags = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: red;
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
            color: red;
        }
    }
`;

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: gray;
`;

const PostViewer = ({ post, error, loading }) => {
    // 에러 발생 시
    if (error) {
        if (error.response && error.response.status === 404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>
    }

    // 로딩 중이거나 아직 포스트 데이터가 없을 때
    if (loading | !post){
        return null;
    }

    const { title, body, user, publishedDate, tags } = post;

    return (
        <PostViewerBlock>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{user.username}</b>
                    </span>
                    <span>{new Date(publishedDate).toLocaleDateString()}</span>
                </SubInfo>
                <Tags>
                    {tags.map((tag, i) => (
                      <div key={i} className="tag">#{tag}</div>  
                    ))}
                </Tags>
            </PostHead>
            <PostContent
                dangerouslySetInnerHTML={{ __html: body}}
            />
        </PostViewerBlock>
    );
};

export default PostViewer;