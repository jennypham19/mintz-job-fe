import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import { ROLE } from "@/constants/roles";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

interface DialogConfirmProps{
    open: boolean,
    onClose: () => void;
}

const DATA_ROLE: { id: string, value: string, label: string }[] = [
    {
        id: uuidv4(),
        label: 'Người tuyển dụng',
        value: 'recruiter'
    },
    {
        id: uuidv4(),
        label: 'Ứng viên',
        value: 'candidate'
    },
]

const DialogConfirm = (props: DialogConfirmProps) => {
    const { open, onClose } = props;
    const [role, setRole] = useState<string>('');

    const handleClose = () => {
        onClose()
    }

    const handleInputSelect = (name: string, value: any) => {
        setRole(value);
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogTitle="Thông báo"
            isActiveFooter={false}
        >
            <Typography mb={1}>Bạn là người tuyển dụng hay là ứng viên?</Typography>
            <InputSelect
                name="role"
                label=""
                value={role}
                placeholder="Chọn vai trò"
                options={DATA_ROLE}
                transformOptions={(data) => 
                    data.map((item) => ({
                        label: item.label,
                        value: item.value
                    }))
                }
                onChange={handleInputSelect}
            />
            {role === ROLE.RECRUITER && (
                <Stack mt={2} direction='column'>
                    <Typography>Bạn là người tuyển dụng, vui lòng quay về <b> Trang chủ</b> để lại thông tin ở mục <b>Thông tin nhà tuyển dụng</b> và chờ quản trị viên cấp tài khoản.</Typography>
                    <Typography component='a' href="/home">Quay lại trang chủ</Typography>
                </Stack>
            )}
            {role === ROLE.CANDIDATE && (
                <Stack mt={2} direction='column'>
                    <Typography component='a' href="/auth/login">Đi đến trang Đăng nhập</Typography>
                </Stack>
            )}
        </DialogComponent>
    )
}

export default DialogConfirm;