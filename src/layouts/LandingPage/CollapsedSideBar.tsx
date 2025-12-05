import { AccountCircle, Close, Home, Newspaper } from "@mui/icons-material";
import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mintz_logo from "@/assets/images/users/mintzjob-logo.png";
import CommonImage from "@/components/Image/index";
import { ROUTE_PATH } from "@/constants/routes";


export const CollapseContext = createContext<boolean | null>(null);
export const SidebarContext = createContext<boolean | null>(null);

interface CollapsedSideBarProps{
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

const CollapsedSideBar = (props: CollapsedSideBarProps) => {
    const { collapsed, onToggleCollapsed} = props;
    const location = useLocation();
    const navigate = useNavigate();


    const menuItems = [
        { label: 'Trang chủ', icon: <Home/>, path: '/home' },
        { label: 'Mintz Job', icon: <AccountCircle/>, path: '/about-us' },
        { label: 'Tuyển dụng', icon: <Newspaper/>, path: '/news' },
        { label: 'Tạo CV', icon: <Newspaper/>, path: '/news' },
    ];

    return (
        <Drawer anchor="left" open={collapsed} onClose={onToggleCollapsed}>
            <Box
                sx={{
                width: '75vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        px: 2,
                        py: 1.5,
                        borderBottom: '1px solid #eee',
                    }}
                >
                <IconButton onClick={onToggleCollapsed}>
                    <Close />
                </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        px: 2,
                        py: 1.5,
                    }} 
                >
                    <CommonImage           
                        route={ROUTE_PATH.HOME}
                        src={mintz_logo}
                        alt="mintz logo" 
                        sx={{ width: 150, height: 150, borderRadius: '50%', border: '1px solid #cac5c5ff'}}
                    />

                {/* Menu Items */}
                <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem
                        key={item.path}
                        onClick={() => {
                            navigate(item.path);
                            onToggleCollapsed();
                        }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            mb: 1,
                        }}
                        >
                        <ListItemText
                            primary={
                                <Stack direction='row'>
                                    <IconButton>{item.icon}</IconButton>
                                    <Typography
                                        sx={{
                                            fontWeight: isActive ? 600 : 400,
                                            fontSize: '1rem',
                                            borderBottom: isActive ? '2px solid black' : 'none',
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            }
                            />
                    </ListItem>
                    );
                })}
                </List>
                </Box>
            </Box>
        </Drawer>
    )
}

export default CollapsedSideBar;