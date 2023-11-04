import { useNavigate } from "react-router-dom";
import { UserDetailsModalProps } from "./UserDetailsModal";
import { ROUTES } from "../../App.routing";

const useUserDetailsModalHook = (props: UserDetailsModalProps) =>{

    const {
        setUserDetails,
        setIsModalVisible
    } = props;

    function onInputChange(event: any){
        setUserDetails(event.target.value);
    }

    function onSubmit(event: any){
        event.preventDefault();
        setIsModalVisible(false);
    }

    return {
        onInputChange,
        onSubmit
    }
}

export default useUserDetailsModalHook;