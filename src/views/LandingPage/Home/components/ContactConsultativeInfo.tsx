import InputText from "@/components/InputText";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import mintz_logo from "@/assets/images/users/mintzjob-white.png";
import CommonImage from "@/components/Image/index";
import useNotification from "@/hooks/useNotification";
import { sendInformation } from "@/services/contact-service";
import { generateCaptcha } from "@/views/Manager/Account/components/DialogAddAccount";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  captchaCode: string,
}

type FormErrors = {
    [K in keyof ProfileFormData]?: string
}

const ContactConsultativeInfo: React.FC = () => {
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<ProfileFormData>({
        name: '', email: '', phone: '', captchaCode: ''
    });
    const notify = useNotification();
    const [captcha, setCaptcha] = useState<string>('');
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, [])

    const handleCustomInputChange = (name: string, value: string | null | Dayjs | number ) => {
        
        if (Object.prototype.hasOwnProperty.call(formData, name)) {
            const validName = name as keyof ProfileFormData; 
    
            setFormData((prevData) => ({
                ...prevData,
                [validName]: value, 
            }));
            
            if (validName === 'email' || validName === 'phone' || validName === 'name' || validName === 'captchaCode') {
                if(validName === 'phone' && typeof value === 'string'){
                    const phoneValid = value.replace(/\s|-/g, '');
                    if (!/^\d+$/.test(phoneValid)) {
                        setErrors(prev => ({
                            ...prev,
                            phone: 'Số điện thoại chỉ chứa số',
                        }));
                        return;
                    }
                    if(phoneValid.startsWith('0') && phoneValid.length !== 10){
                        setErrors(prev => ({
                            ...prev,
                            phone: 'Số điện thoại phải có 10 chữ số (nếu bắt đầu bằng 0)',
                        }));
                        return;
                    }

                    if(phoneValid.startsWith('+84') && (phoneValid.length < 11 || phoneValid.length > 12)){
                        setErrors(prev => ({
                            ...prev,
                            phone: 'Số điện thoại phải có 11-12 chữ số (nếu bắt đầu bằng +84)',
                        }));
                        return;
                    }

                    if(!phoneRegex.test(phoneValid)){
                        setErrors(prev => ({
                            ...prev,
                            phone: 'Số điện thoại không đúng định dạng (bắt đầu từ +84|03|05|07|08|09',
                        }));
                        return;
                    }
                }
                
                if(validName === 'email' && typeof value === 'string'){
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // chuẩn email đơn giản
                    if(!emailRegex.test(value)){
                        setErrors(prev => ({
                            ...prev,
                            email: "Email không hợp lệ"
                        }));
                        return;
                    }
                }

                if(validName === 'captchaCode' && typeof value === 'string'){
                    if(value !== captcha){
                        setErrors(prev => ({
                            ...prev,
                            captchaCode: "Captcha sai. Vui lòng nhập lại"
                        }))
                    }
                }

                if (errors[name as keyof typeof errors]) {
                    setErrors(prev => ({ ...prev, [name]: undefined}))
                }
            }
        } else {
            console.warn(`CustomInput called onChange with an unexpected name: ${name}`);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.name.trim()) newErrors.name = 'Tên đầy đủ là bắt buộc';
        if(!formData.email) newErrors.email = 'Email là bắt buộc';
        if(!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
        if(!formData.captchaCode) newErrors.captchaCode = 'Mã Captcha không được để trống';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // True nếu không có lỗi
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return
        }
        const payload = {
            ...formData,
        }
        try {
            const res = await sendInformation(payload);
            notify({ message: res.message, severity: 'success'})
            setFormData({ name: '', email: '', phone: '', captchaCode: ''})
            setCaptcha(generateCaptcha());
        } catch (error: any) {
            const errorMessage = ` Gửi thông tin thất bại ${error.message}`;
            notify({ message: errorMessage, severity: 'error'})
        }
    }

    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5}}>
                <Box
                    display= 'flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <CommonImage
                        src={mintz_logo}
                        sx={{
                            width: '100px',
                        }}
                    />
                    <Typography
                        fontWeight={600}
                        variant="h5"
                        sx={{ 
                            color: 'white',
                            pb: 1,
                            borderBottom: '2px solid white',
                            my: 2
                        }}
                    >
                        THÔNG TIN NHÀ TUYỂN DỤNG
                    </Typography>
                    <Stack alignItems='center' direction='column' sx={{ maxWidth: 500 }}>
                        <Typography fontWeight={500} fontSize='15px' sx={{ color: '#dbd5d4ff', textAlign: 'center', whiteSpace: 'pre-line', wordBreak: 'break-word'}}> Nếu bạn là nhà tuyển dụng muốn đăng tải bài để tuyển dụng thì liên hệ hợp tác với chúng tôi qua email bằng cách điền vào biểu mẫu sau.</Typography>
                        <Typography fontWeight={500} fontSize='15px' sx={{ color: '#dbd5d4ff', textAlign: 'center', whiteSpace: 'pre-line' }}>Sau đó chúng tôi sẽ gửi tài khoản qua email cho bạn.</Typography>
                    </Stack>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }} display='flex'>
                <Box id="create-task-form" margin='auto 0px'>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12}}>
                            <Stack direction={{ xs: 'column', md: 'row'}} spacing={{ xs: 0, md: 2}} sx={{ width: { xs: '100%', md: '80%'} }}>
                                <Box flexGrow={1} component='form'>
                                    <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'white'}}>Tên đầy đủ</Typography>
                                    <InputText
                                        label=""
                                        name="name"
                                        value={formData.name}
                                        onChange={handleCustomInputChange}
                                        type="text"
                                        sx={{ mt: 0 }}
                                        margin="dense"
                                        placeholder="Nhập thông tin"
                                        from="from-contact"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        autoComplete='off'
                                    />
                                </Box>
                                <Box flexGrow={1}>
                                    <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'white' }}>Email</Typography>
                                    <InputText
                                        label=""
                                        name="email"
                                        value={formData.email}
                                        onChange={handleCustomInputChange}
                                        type="text"
                                        sx={{ mt: 0}}
                                        margin="dense"
                                        placeholder="Nhập thông tin"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        from="from-contact"
                                        autoComplete='off'
                                    />
                                </Box>
                                <Box flexGrow={1}>
                                    <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'white'}}>Điện thoại</Typography>
                                    <InputText
                                        label=""
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleCustomInputChange}
                                        type="text"
                                        sx={{ mt: 0}}
                                        margin="dense"
                                        placeholder="Nhập thông tin"
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        from="from-contact"
                                        autoComplete='off'
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12}}>
                            <Stack direction={{ xs: 'column', md: 'row'}} spacing={{ xs: 0, md: 2}} sx={{ width: { xs: '100%', md: '80%'} }}>
                                <Box flexGrow={1}>
                                    <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'white'}}>Xác minh mã Captcha</Typography>
                                    <InputText
                                        label=""
                                        name="captchaCode"
                                        value={formData.captchaCode}
                                        onChange={handleCustomInputChange}
                                        type="text"
                                        sx={{ mt: 0}}
                                        margin="dense"
                                        placeholder="Nhập thông tin"
                                        error={!!errors.captchaCode}
                                        helperText={errors.captchaCode}
                                        from="from-contact"
                                        autoComplete='off'
                                    />
                                </Box>
                                <Box flexGrow={1}>
                                    <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: 'white'}}>Mã Captcha</Typography>
                                    <Box
                                        sx={{
                                            border: '1px solid #fff',
                                            borderRadius: '10px',
                                            px: 2,
                                            py: 0.5,
                                            display: 'flex',
                                            gap: 1,
                                            height: '40px',
                                             width: {xs: '100%', md: '50%'}
                                        }}
                                    >
                                        {captcha.split('').map((char, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    transform: `rotate(${Math.random() * 30 - 15}deg)`,
                                                    fontSize: '20px',
                                                    fontWeight: 700,
                                                    color: '#fff'
                                                }}
                                            >
                                                {char}
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12}}>
                            <Box display='flex' justifyContent='center' sx={{ width: { xs: '100%', md: '80%'} }}>
                                <Button
                                    sx={{
                                        px: 4,
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        borderRadius: '8px',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        width: '250px',
                                        '&:hover': {
                                            backgroundColor: 'black',
                                            color: 'white'
                                        },
                                    }}
                                    onClick={handleSubmit}
                                    >
                                    Gửi thông tin
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ContactConsultativeInfo;