import Page from "@/components/Page";
import SearchBox from "../components/SearchBox";
import { Alert, Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { Add, AdminPanelSettings, BuildCircle, BusinessCenter, CheckCircle, Create, Error, Filter, PauseCircle, PersonSearch, Work } from "@mui/icons-material";
import { useState } from "react";
import CreateAccount from "./components/CreateAccount";
import { useDataList } from "@/hooks/useDataList";
import { IUser } from "@/types/user";
import { getListAccounts } from "@/services/user-service";
import Tabs from "../components/Tabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2"
import CustomPagination from "@/components/Pagination/CustomPagination";
import { getRoleLabel, getUserGenderLabel } from "@/utils/labelEnToVi";
import { ROLE } from "@/constants/roles";

const DataStatus: {id: number, value: string, label: string, icon: React.ReactNode}[] = [
  {
    id: 1,
    value: 'all',
    label: 'Tất cả',
    icon: <Filter/>
  },
  {
    id: 2,
    value: 'admin',
    label: 'Quản trị viên',
    icon: <AdminPanelSettings color="success"/>
  },
  {
    id: 3,
    value: 'employee',
    label: 'Nhân viên',
    icon: <Work color="error"/>
  },
  {
    id: 4,
    value: 'candidate',
    label: 'Ứng viên',
    icon: <PersonSearch color="warning"/>
  },
  {
    id: 5,
    value: 'recruiter',
    label: 'Người tuyển dụng',
    icon: <BusinessCenter color="info"/>
  },
];

const ManagementAccount = () => {
    const [openAccount, setOpenAccount] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [viewMode, setViewMode] = useState<string>('all');
    const { fetchData, listData, rowsPerPage, page, loading, error, handlePageChange, total, searchTerm, handleSearch } = useDataList<IUser>(getListAccounts, 8, viewMode)

    const handleOpenCreateAccount = () => {
        setOpenAccount({ open: true, type: 'add' })
    }

    const handleCloseCreateAccount = () => {
        setOpenAccount({ open: false, type: 'add' });
    }
    return(
        <Page title="Quản lý tài khoản">
            {!openAccount.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, email, số điện thoại"
                    >
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN, width: 150 }}
                            startIcon={<Add/>}
                            onClick={handleOpenCreateAccount}
                        >
                            Tạo tài khoản
                        </Button>
                    </SearchBox>   
                    <Box m={2}>
                        <Tabs
                            data={DataStatus}
                            viewMode={viewMode}
                            onChange={setViewMode}
                        />    
                    </Box>
                    {listData.length === 0 && (
                        <Typography mx={2}>Không tồn tại bản ghi nào</Typography>
                    )}
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }} >{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid container spacing={2}>
                                {listData.map((account, index) => {
                                    const length = account.fullName.split(" ").length;
                                    const name = length && account.fullName.split(" ")[length - 1]
                                    return(
                                        <Grid sx={{ px: 1.5 }} key={index} size={{ xs: 12, md: 3 }}>
                                            <Card sx={{ borderRadius: 6, cursor: 'pointer' }}>
                                                <CardHeader
                                                    avatar={
                                                        <Box border='1px solid #b9b5b5ff' borderRadius='50%' p={0.5}>
                                                            <Avatar src={account.avatarUrl} sx={{ margin: 'auto 0', borderRadius: '50%', width: 100, height: 100 }}>
                                                                {name ? name.charAt(0).toUpperCase() : ''}
                                                            </Avatar>                                                            
                                                        </Box>
                                                    }
                                                    title={
                                                        <Typography fontSize='18px' fontWeight={600}>{account.fullName}</Typography>
                                                    }
                                                    subheader={
                                                        <Stack direction='column'>
                                                            <Chip
                                                                color="success"
                                                                label={getRoleLabel(account.role)}
                                                            />
                                                            <Typography variant="subtitle2">{getUserGenderLabel(account.gender)}</Typography>
                                                            <Typography variant="subtitle2">{account.phone}</Typography>
                                                        </Stack>
                                                    }
                                                />
                                                <CardContent>
                                                    {((account.role === ROLE.CANDIDATE) || (account.role === ROLE.RECRUITER)) && (
                                                        <Button
                                                            variant="outlined"
                                                            fullWidth
                                                            sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN, mr: 2 }}
                                                            onClick={() => {}}
                                                        >
                                                            Reset mật khẩu
                                                        </Button>
                                                    )}
                                                    {((account.role === ROLE.ADMIN) || (account.role === ROLE.EMPLOYEE)) && (                                                        
                                                        <Box mb={1} display='flex' justifyContent='space-between'>
                                                            <Button
                                                                variant="outlined"
                                                                fullWidth
                                                                sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN, mr: 2 }}
                                                                onClick={() => {}}
                                                            >
                                                                Chỉnh sửa
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                fullWidth
                                                                sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN }}
                                                                onClick={() => {}}
                                                            >
                                                                Reset mật khẩu
                                                            </Button>
                                                        </Box>
                                                    )}
                                                    {(account.role === ROLE.EMPLOYEE) && (
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <Button
                                                                variant="outlined"
                                                                fullWidth
                                                                sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN, mr: 2 }}
                                                                onClick={() => {}}
                                                            >
                                                                Vô hiệu hóa
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                fullWidth
                                                                sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN }}
                                                                onClick={() => {}}
                                                            >
                                                                Xóa
                                                            </Button>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Box display='flex' justifyContent='center'>
                                <CustomPagination
                                    page={page}
                                    count={total}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </Box>
                        </>
                    )}             
                </>
            )}
            {openAccount.open && openAccount.type === 'add' && (
                <CreateAccount
                    onBack={handleCloseCreateAccount}
                />
            )}
        </Page>
    )
}

export default ManagementAccount;