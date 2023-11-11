import { ToasterProps } from "./Toaster";

const useToasterHook = (props: ToasterProps) => {

    const { text, setIsToasterVisible } = props;

    function closeToaster() {
        setIsToasterVisible(false);
    }

    return {
        text,
        closeToaster
    };
}

export default useToasterHook;