import { useNavigate } from "../../../../node_modules/react-router-dom/dist/index";
import { useImperativeHandle, forwardRef } from "react";

const Navigator = forwardRef((props, ref) => {
    const navigate = useNavigate();
    useImperativeHandle(ref, () => ({
        writeNavigate,
        postNavigate
    }));
    function writeNavigate() {
        navigate('/write');
    }
    function postNavigate(currPostUsername, currPostId) {
        navigate(`/@${currPostUsername}/${currPostId}`);
    }
    return (
        <div>
            Screen Root Page
        </div>
    )
});

export default Navigator;