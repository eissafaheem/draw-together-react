import {useNavigate, useParams} from 'react-router-dom'

const useRoomHook = () => {
    const navigate = useNavigate();
    const params = useParams();

    return {
        params
    };
}

export default useRoomHook;