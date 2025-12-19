import Page from "@/components/Page"
import { useFetchData } from "@/hooks/useFetchData";
import { getInformations } from "@/services/contact-service";
import { IInformation } from "@/types/contact-types";
import SearchBox from "../components/SearchBox";
import { Alert, Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from "@mui/material";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2"
import CustomPagination from "@/components/Pagination/CustomPagination";
import { COLORS } from "@/constants/colors";
import { red } from "@mui/material/colors";

const ManagementInformation = () => {
    const { rowsPerPage, page, listData, searchTerm, handlePageChange, handleSearch, fetchData, loading, error, total } = useFetchData<IInformation>(getInformations, 9)
    return(
        <Page title="Quản lý thông tin">
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên, email, số điện thoại, mã captcha"
            />
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
                        {listData.map((information, index) => {
                            const length = information.name.split(" ").length;
                            const name = length && information.name.split(" ")[length - 1]
                            return(
                                <Grid sx={{ p: 1.5}} size={{ xs: 12, md: 3 }} key={index}>
                                    <Card sx={{ borderRadius: 5 }}>
                                        <CardHeader
                                            avatar={
                                                <Box border='1px solid #b9b5b5ff' borderRadius='50%' p={0.5}>
                                                    <Avatar sx={{ bgcolor: red[500], borderRadius: '50%' }}>
                                                        {name ? name.charAt(0).toUpperCase() : ''}
                                                    </Avatar>
                                                </Box>
                                            }
                                            title={information.name}
                                        />
                                        <CardContent>
                                            <Typography fontSize='15px'><b>Email: </b>{information.email}</Typography>
                                            <Typography fontSize='15px'><b>Sđt: </b>{information.phone}</Typography>
                                            <Divider sx={{ mt: 1 }}/>
                                            <Box mt={1} display='flex' justifyContent='space-between'>
                                                <Button variant="outlined" fullWidth sx={{ mr: 2, border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN }}>Tạo tài khoản</Button>
                                                <Button variant="outlined" fullWidth sx={{ border: `1px solid ${COLORS.MAIN}`, color: COLORS.MAIN }}>Gửi tài khoản</Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Box my={1} display='flex' justifyContent='center'>
                        <CustomPagination
                            page={page}
                            count={total}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </>
            )}
        </Page>
    )
}

export default ManagementInformation;