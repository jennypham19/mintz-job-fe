import Page from "@/components/Page"
import { Box, Paper, Typography } from "@mui/material";

const PostLandingPage = () => {
    return(
        <Page title="Đăng bài viết - Mintz Job">
           <Box
                bgcolor='#fff'
                display='flex'
                justifyContent='center'
                alignItems='center'
                
           >
            <Paper sx={{ p: 2, margin: 'auto 0px' }} variant="outlined">
                <Typography>
                    (*) Lưu ý: Do số lượng tin tuyển dụng lớn, Ban biên tập YBOX.VN sẽ mất khoảng 24 giờ để duyệt bài viết của bạn. Để công tác kiểm duyệt nhanh chóng và thuận lợi, vui lòng tuân thủ quy định đăng bài Tại Đây. Liên hệ hotline nếu cần hỗ trợ đăng bài, truyền thông và quảng cáo: 0989-340-342 hoặc 097-6689-762 hoặc xem chi tiết Tại Đây.
                </Typography>
            </Paper>

           </Box>
        </Page>
    )
}

export default PostLandingPage;