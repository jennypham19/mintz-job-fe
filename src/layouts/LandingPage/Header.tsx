import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



import { AppRegistration, DensityMedium, Login, Notifications, PostAdd } from '@mui/icons-material';
import { Box, Button, IconButton as MuiIconButton, Typography, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import CollapsedSideBar from '../LandingPage/CollapsedSideBar';
import DialogConfirm from './components/DialogConfirm';
import CustomizedBadges from '@/components/Badge';
import IconButton from '@/components/IconButton/IconButton';
import CommonImage from '@/components/Image/index';



import mintz_logo from "@/assets/images/users/mintzjob-logo.png";
import { COLORS } from '@/constants/colors';
import { ROUTE_PATH } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';


interface Props {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapsed: () => void;
}

const Header = (props: Props) => {
  const theme = useTheme();
  const { profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const mdUp = useMediaQuery(theme.breakpoints.up('lg'));

  const isActive = (path: string) => location.pathname === path;

  const [activeMenu, setActiveMenu] = useState<string>('home')

  const handleMenuClick = (key: string, path: string) => {
    setActiveMenu(key);
    navigate(path)
  }

  const styleMenu = (path: string) => ({
    fontWeight: 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    pb: 1,
    mt: 1,
    borderBottom: isActive(path)? '2px solid black' : '2px solid transparent',
    transition: 'border-bottom 0.3s',
    '&:hover':{
      borderBottom: '2px solid black',
    },
  });

  const handleClick = () => {
    setOpenDialogConfirm(true)
  };


  if(mdUp){
    return (
      <AppBar
        position='fixed'
        sx={{
          color: 'common.black',
          backgroundColor: '#fff',
          height: '64px',
          borderBottom: 'thin solid #E6E8F0',
          marginLeft: 'auto',
          zIndex: 9,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 64,
            px: 6, // padding ngang để giới hạn chiều rộng
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CommonImage
              route={ROUTE_PATH.HOME}
              src={mintz_logo}
              alt='mintz logo'
              sx={{ width: 50, cursor: 'pointer' }}
            />
            <Typography sx={styleMenu('/home')} onClick={() => handleMenuClick('home', '/home')}>
              Trang chủ
            </Typography>
            <Typography
              sx={styleMenu('/about-us')}
              onClick={() => handleMenuClick('about-us', '/about-us')}
            >
              Mintz Job
            </Typography>
            <Typography sx={styleMenu('/news')} onClick={() => handleMenuClick('news', '/news')}>
              Tuyển dụng
            </Typography>
            <Typography sx={styleMenu('/news')} onClick={() => handleMenuClick('news', '/news')}>
              Tạo CV
            </Typography>
          </Box>
          <Box gap={2.5} display='flex' flexDirection='row'>
            {isAuthenticated && (
              <Typography>{profile?.fullName}</Typography>
            )}
            {!isAuthenticated && (
              <>
                <Typography
                  component='a'
                  href='/auth/login'
                  fontSize='15px'
                  mt={0.5}
                  sx={{
                    textDecoration: 'none',
                    color: '#000',
                    '&:hover': { color: COLORS.MAIN, fontWeight: 500 },
                  }}
                >
                  Đăng nhập
                </Typography>
                <Typography
                  component='a'
                  href='/auth/register'
                  fontSize='15px'
                  mt={0.5}
                  sx={{
                    textDecoration: 'none',
                    color: '#000',
                    '&:hover': { color: COLORS.MAIN, fontWeight: 500 },
                  }}
                >
                  Đăng ký
                </Typography>              
              </>
            )}

            <CustomizedBadges
              icon={<Notifications sx={{ width: 25, height: 25 }} />}
              count={4}
              colorHover={COLORS.MAIN}
            />
            <Button
              onClick={handleClick}
              sx={{
                bgcolor: COLORS.MAIN,
                '&:hover': {
                  fontWeight: 700,
                },
              }}
              startIcon={<PostAdd sx={{ width: 25, height: 25 }} />}
            >
              {`Đăng bài (Miễn phí)`.toUpperCase()}
            </Button>
          </Box>
        </Toolbar>
        {openDialogConfirm && (
          <DialogConfirm
            open={openDialogConfirm}
            onClose={() => {
              setOpenDialogConfirm(false);
            }}
          />
        )}
      </AppBar>
    );
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        color: 'common.black',
        backgroundColor: '#fff',
        height: '64px',
        borderBottom: 'thin solid #E6E8F0',
        marginLeft: 'auto',
        zIndex: 9,
        width: '100%',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
      }}
    >
      <Box display='flex' flexDirection='row'>
        <MuiIconButton
          onClick={handleToggleCollapsed}
          sx={{
            color: '#000',
            borderRadius: '4px',
            width: '36px',
            height: '36px',
            fontSize: '1rem',
            margin: 'auto 0px'
          }}
        >
          <DensityMedium />
        </MuiIconButton>
        
        <CommonImage
          route={ROUTE_PATH.HOME}
          src={mintz_logo}
          alt="mintz logo"
          sx={{ width: 50, margin: 'auto 0px' }}
        />
      </Box>   
      <Toolbar 
        disableGutters 
        sx={{ 
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 64, // padding ngang để giới hạn chiều rộng
          margin: 'auto 0px'
        }}>

          <Box display='flex' flexDirection='row'>
            <IconButton
              tooltip='Đăng nhập'
              icon={<Login sx={{ width: 25, height: 25 }}/>}
              handleFunt={() => navigate('/auth/login')}
            />
            <IconButton
              tooltip='Đăng ký'
              icon={<AppRegistration sx={{ width: 25, height: 25 }}/>}
              handleFunt={() => navigate('/auth/register')}
            />
            <CustomizedBadges tooltip='Thông báo' icon={<Notifications sx={{ width: 25, height: 25 }}/>} count={4}/>
            <IconButton
              handleFunt={handleClick}
              tooltip={`Đăng bài (Miễn phí)`.toUpperCase()}
              icon={<PostAdd sx={{ width: 25, height: 25 }}/>}
            />             
          </Box> 
      </Toolbar>
      <CollapsedSideBar
        collapsed={collapsed}
        onToggleCollapsed={handleToggleCollapsed}
      />
      {openDialogConfirm && (
        <DialogConfirm
          open={openDialogConfirm}
          onClose={() => {
            setOpenDialogConfirm(false)
          }}
        />
      )}
    </AppBar>
  );
};

export default Header;