import useAuth from "@/hooks/useAuth";
import { signOut } from "@/services/auth-service";
import { setIsAuth, setProfile } from "@/slices/auth";
import { useAppDispatch } from "@/store";
import { removeAccessToken } from "@/utils/AuthHelper";
import { Bookmark, Create, Description, EditOutlined, Logout, Person, Rocket, Settings, WorkHistory } from "@mui/icons-material";
import { Avatar, ButtonBase, Card, ClickAwayListener, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import avatar1 from '@/assets/images/users/avatar-1.png';
import { ROLE } from "@/constants/roles";

const Profile = () => {
    const theme = useTheme();
    const { profile } = useAuth();
    const dispatch = useAppDispatch();
    const mdUp = useMediaQuery(theme.breakpoints.up('lg'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleLogout = async () => {
        await signOut();
        dispatch(setIsAuth(false));
        dispatch(setProfile(null));
        removeAccessToken();
    };

    const open = Boolean(anchorEl);
    const length = profile?.fullName.split(" ").length;
    const name = length && profile?.fullName.split(" ")[length - 1]
    
    return(
        <>
            {!mdUp ? (
                <Tooltip title={profile?.fullName}>
                    <IconButton
                        onClick={handleClick}
                    >
                        <Person sx={{ width: 25, height: 25 }}/>
                    </IconButton>
                </Tooltip>
            ) : (
                <ButtonBase
                    sx={{
                    p: 0.25,
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' },
                    '&:focus-visible': {
                        outline: `2px solid ${theme.palette.secondary.dark}`,
                        outlineOffset: 2,
                    },
                    }}
                    aria-label='open profile'
                    aria-controls={open ? 'profile-grow' : undefined}
                    aria-haspopup='true'
                    onClick={handleClick}
                >
                    <Stack direction='row' spacing={1.25} alignItems='center' sx={{ p: 0.5 }}>
                        <Avatar
                            alt='profile user'
                            src={profile?.avatarUrl}
                            sx={{ width: 32, height: 32, borderRadius: '100%' }}
                        >
                            {name ? name.charAt(0).toUpperCase() : ''}
                        </Avatar>
                        <Typography variant='subtitle1'>{profile?.fullName}</Typography>
                    </Stack>
                </ButtonBase>
            )}
            <Popper
                open={open}
                anchorEl={anchorEl}
                sx={{
                    zIndex: 999,
                    marginTop: '10px !important'
                }}
                placement="bottom-start"
            >
                <Paper sx={{ maxWidth: 250 }}>
                    <ClickAwayListener onClickAway={handleClick}>
                        <Card>
                            <List component='nav' sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 24 } }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EditOutlined/>
                                    </ListItemIcon>
                                    <ListItemText
                                        onClick={() => {}}
                                        primary='Trang cá nhân'
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: '13px'
                                            }
                                        }}
                                    />
                                </ListItemButton>
                                {profile?.role === ROLE.CANDIDATE && (
                                    <>
                                        <ListItemButton>
                                            <ListItemIcon><WorkHistory/></ListItemIcon>
                                            <ListItemText
                                                onClick={() => {}}
                                                primary='Việc làm đã ứng tuyển'
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '13px'
                                                    }
                                                }}
                                            />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon><Bookmark/></ListItemIcon>
                                            <ListItemText
                                                onClick={() => {}}
                                                primary='Bài đã lưu'
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '13px'
                                                    }
                                                }}
                                            />
                                        </ListItemButton>
                                    </>
                                )}
                                {profile?.role === ROLE.RECRUITER && (
                                    <>
                                        <ListItemButton>
                                            <ListItemIcon><Description/></ListItemIcon>
                                            <ListItemText
                                                onClick={() => {}}
                                                primary='Quản lý CV ứng tuyển online'
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '13px'
                                                    }
                                                }}
                                            />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon><Create/></ListItemIcon>
                                            <ListItemText
                                                onClick={() => {}}
                                                primary='Bài đã viết'
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: '13px'
                                                    }
                                                }}
                                            />
                                        </ListItemButton>                                    
                                    </>

                                )}
                                <ListItemButton>
                                    <ListItemIcon><Settings/></ListItemIcon>
                                    <ListItemText
                                        onClick={() => {}}
                                        primary='Cài đặt'
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: '13px'
                                            }
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon><Logout/></ListItemIcon>
                                    <ListItemText
                                        onClick={handleLogout}
                                        primary='Đăng xuất'
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: '13px'
                                            }
                                        }}
                                    />
                                </ListItemButton>  
                            </List>
                        </Card>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    )
}

export default Profile