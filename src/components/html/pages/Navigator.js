import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { useImperativeHandle, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { initialize } from '../../../modules/screen/write';

const Navigator = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useImperativeHandle(ref, () => ({
    writeNavigate,
    postNavigate,
  }));
  function writeNavigate() {
    dispatch(initialize());
    navigate('/write');
  }
  function postNavigate(currPostUsername, currPostId) {
    navigate(`/@${currPostUsername}/${currPostId}`);
  }
  return <div>Screen Root Page</div>;
});

export default Navigator;
