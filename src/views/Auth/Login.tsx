import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';



import { AccountCircle, Email, Facebook, Google, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, styled, Typography } from '@mui/material';
import MuiCard from '@mui/material/Card';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import CommonImage from '@/components/Image/index';
import Page from '@/components/Page';



import bg_logo from "@/assets/images/users/login-page.png";
import logo_mintz from "@/assets/images/users/mintzdg-logo-1.png";
import { COLORS } from '@/constants/colors';
import { ROLE } from '@/constants/roles';
import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { loginSchema } from '@/schemas/auth-schema';
import { signIn } from '@/services/auth-service';
import { setIsAuth } from '@/slices/auth';
import { setProfile } from '@/slices/user';
import { useAppDispatch } from '@/store';
import { setAccessToken } from '@/utils/AuthHelper';


export const ID_USER = 'user_id'
interface LoginFormInputs {
  username: string;
  password: string;
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

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { t } = useTranslation('auth');
  const [_loading, setLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const [_error, setError] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const onSubmit = async (values: LoginFormInputs) => {
    setLoading.on();
    try {
      const respAuth = await signIn({
        email: values.username,
        password: values.password,
      });
      
      const accessToken = respAuth.data?.accessToken;
      const userProfile = respAuth.data?.user;
      if (accessToken && userProfile) {
        setAccessToken(accessToken);

        // Xét trường is_default
        if(userProfile.is_default === 1){
          localStorage.setItem(ID_USER, String(userProfile.id));

          navigate(`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.CHANGE_PASSWORD}`)
        }else{
          // 3. Cập nhật state của Redux/Context
          // Thông tin user đã có sẵn từ response login, không cần gọi /me nữa
          dispatch(setProfile(userProfile));
          dispatch(setIsAuth(true));

          // 4. Thông báo và chuyển hướng
          notify({
            message: t('login_success'),
            severity: 'success',
          });
          switch (userProfile.role) {
            case ROLE.ADMIN:
              navigate(ROUTE_PATH.MANAGE, { replace: true });
              break;
            case ROLE.CANDIDATE:
              navigate(ROUTE_PATH.HOME, { replace: true });
              break;
            case ROLE.RECRUITER:
              navigate(ROUTE_PATH.HOME, { replace: true });
              break;
            case ROLE.EMPLOYEE:
            default:
              navigate(ROUTE_PATH.MANAGE, { replace: true });
              break;
          }        
        }


      } else {
        setError(respAuth.message || 'Login failed, no access token returned.');
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='Đăng nhập - Mintz Job'>
      <Box height='40px' bgcolor={COLORS.MAIN} display='flex' justifyContent='center'>
        <Typography fontSize='15px' margin='auto 0' color='#fff'>Góp ý và báo lỗi cho MINTZ JOB <span onClick={() => {}} style={{ cursor: 'pointer', color: '#eb5151ff'}}>tại đây</span></Typography>
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
            <Box mb={2} onClick={() => navigate(`${ROUTE_PATH.HOME}`)} display='flex' flexDirection='row' justifyContent='center' sx={{ cursor: 'pointer' }}>
              <CommonImage
                src={logo_mintz}
                alt='logo_mintz'
                sx={{ width: 80, height: 50 }}
              />
              <Typography margin='auto 0' fontWeight={600} variant='h4'>MINTZ JOB</Typography>
            </Box>
            <Typography
              fontWeight={500}
              sx={{ width: '100%', fontSize: '24px', textAlign: 'center' }}
            >
              ĐĂNG NHẬP
            </Typography>
          </Box>
          {_error && (
            <Alert variant='filled' severity='error'>
              {_error}
            </Alert>
          )}
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <ControllerTextField<LoginFormInputs>
              controllerProps={{
                name: 'username',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Email',
                error: !!errors.username,
                helperText: errors.username?.message,
                sx: { ariaLabel: 'username' },
              }}
              prefixIcon={AccountCircle}
            />
            <ControllerTextField<LoginFormInputs>
              controllerProps={{
                name: 'password',
                defaultValue: '',
                control: control,
              }}
              textFieldProps={{
                label: 'Mật khẩu',
                type: showPassword ? 'text' : 'password',
                error: !!errors.password,
                helperText: errors.password?.message,
                slotProps: {
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword.toggle()}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                },
              }}
              prefixIcon={Lock}
            />
            <div>
              <Box>
                <Typography
                  color={COLORS.MAIN}
                  component={RouterLink}
                  to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.FORGOT_PASSWORD}`}
                  sx={{ textAlign: 'end', display: 'block' }}
                >
                  Quên mật khẩu
                </Typography>
              </Box>
            </div>
            <LoadingButton 
              loading={_loading} type='submit' variant='contained' fullWidth
              sx={{
                color:"#fff",
                bgcolor: COLORS.MAIN,
                fontWeight:800
              }}
            >
              Đăng nhập
            </LoadingButton>
            <Button 
              fullWidth variant='contained'
              startIcon={<Facebook/>}
              sx={{
                color:"#fff",
                bgcolor: '#3a5a99',
                fontWeight: 800,
                fontSize: '15px',
              }}
            >
              Tiếp tục với Facebook
            </Button>
            <Button 
              fullWidth variant='contained'
              startIcon={<Google/>}
              sx={{
                color:"#fff",
                bgcolor: '#f4402d',
                fontWeight: 800,
                fontSize: '15px'
              }}
            >
              Đăng nhập với Google
            </Button>
            <Box display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
              <Typography>Chưa có tài khoản?</Typography>
              <Typography
                to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.REGISTRATION}`}
                component={RouterLink}
                color={COLORS.MAIN}
                sx={{ fontStyle: 'italic'}}
              >
                Đăng ký
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Page>
  );
}