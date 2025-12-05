import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';



import { Email, Lock, Person } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, styled, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import CommonImage from '@/components/Image/index';
import Page from '@/components/Page';



import bg_logo from "@/assets/images/users/login-page.png";
import logo_mintz from "@/assets/images/users/mintzdg-logo-1.png";
import { COLORS } from '@/constants/colors';
import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { registrationSchema } from '@/schemas/auth-schema';
import { signUp } from '@/services/auth-service';


interface RegistrationFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '650px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function Registration() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setFocus,
    trigger,
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema),
  });
  const password = watch('password');
  const [_loading, setLoading] = useBoolean();
  const navigate = useNavigate();
  const notify = useNotification();
  const { t } = useTranslation('auth');
  const [_error, setError] = useState('');

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  useEffect(() => {
    if (password && password?.length === getValues('confirmPassword')?.length) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const onSubmit = async (values: RegistrationFormInputs) => {
    setLoading.on();
    try {
      await signUp(values);
      notify({
        message: t('registration_success'),
        severity: 'success',
      });
      navigate(ROUTE_PATH.TO_LOGIN);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='Đăng ký - Mintz Job'>
      <Box height='40px' bgcolor={COLORS.MAIN} display='flex' justifyContent='center'>
        <Typography fontSize='15px' margin='auto 0' color='#fff'>
          Góp ý và báo lỗi cho MINTZ JOB{' '}
          <span onClick={() => {}} style={{ cursor: 'pointer', color: '#eb5151ff' }}>
            tại đây
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: 'calc(100vh - 40px)', // trừ thanh thông báo trên cùng
          backgroundImage: `url(${bg_logo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Card variant='outlined'>
          <Box>
            <Box
              mb={2}
              onClick={() => navigate(`${ROUTE_PATH.HOME}`)}
              display='flex'
              flexDirection='row'
              justifyContent='center'
              sx={{ cursor: 'pointer' }}
            >
              <CommonImage src={logo_mintz} alt='logo_mintz' sx={{ width: 80, height: 50 }} />
              <Typography margin='auto 0' fontWeight={600} variant='h4'>
                MINTZ JOB
              </Typography>
            </Box>
            <Typography
              fontWeight={500}
              sx={{ width: '100%', fontSize: '24px', textAlign: 'center' }}
            >
              ĐĂNG KÝ
            </Typography>
          </Box>
          {_error && (
            <Alert variant='filled' severity='warning'>
              {_error}
            </Alert>
          )}
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'fullName',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Họ và tên',
                error: !!errors.fullName,
                helperText: errors.fullName?.message,
              }}
              prefixIcon={Person}
            />
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'email',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Email',
                error: !!errors.email,
                helperText: errors.email?.message,
              }}
              prefixIcon={Email}
            />
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'password',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Mật khẩu',
                type: 'password',
                error: !!errors.password,
                helperText: errors.password?.message,
              }}
              prefixIcon={Lock}
            />
            <ControllerTextField<RegistrationFormInputs>
              controllerProps={{
                name: 'confirmPassword',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Nhập lại mật khẩu',
                type: 'password',
                error: !!errors.confirmPassword,
                helperText: errors.confirmPassword?.message,
              }}
              prefixIcon={Lock}
            />
            <LoadingButton
              loading={_loading}
              type='submit'
              variant='contained'
              fullWidth
              sx={{ my: 2, bgcolor: COLORS.MAIN, fontWeight: 600 }}
            >
              Đăng ký
            </LoadingButton>
            <Box display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
              <Typography>Đã có tài khoản?</Typography>
              <Typography
                to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.LOGIN}`}
                component={RouterLink}
                color={COLORS.MAIN}
                sx={{ fontStyle: 'italic' }}
              >
                Đăng nhập ngay
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Page>
  );
}