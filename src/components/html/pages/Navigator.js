import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";
import { useImperativeHandle, forwardRef } from "react";

const Navigator = forwardRef((props, ref) => {
    const navigate = useNavigate();
    useImperativeHandle(ref, () => ({
        postNavigate
    }));
    function wirtNavigate() {
        navigate('/write');
    }
    function postNavigate(currPostUsername, currPostId) {
        navigate(`/@${currPostUsername}/${currPostId}`);
    }
    return (
        <div>
            스크린 루트 페이지
        </div>
    )
});

export default Navigator;