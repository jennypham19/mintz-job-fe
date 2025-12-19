import { Box } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";

interface CreateAccountProps{
    onBack: () => void;
}

const CreateAccount = (props: CreateAccountProps) => {
    const { onBack } = props;
    const handleClose = () => {
        onBack()
    }
    return(
        <Box>
            <NavigateBack
                title="Quản lý tài khoản"
                onBack={handleClose}
            />
            
        </Box>
    )
}

export default CreateAccount;