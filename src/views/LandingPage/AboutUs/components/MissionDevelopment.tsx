import { Box, Typography } from "@mui/material";
import React from "react";
import Grid from '@mui/material/Grid2'
import { CONTENT_MISSION } from "@/constants/contentAbout";
import CommonImage from "@/components/Image/index";

const MissionDevelopment: React.FC = () => {
    return (
        <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                px:10
            }}
        >
            <Typography variant="h5" fontWeight={600}>Sứ mệnh phát triển</Typography>
            <Typography textAlign='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-word', mt: 3, fontSize: {xs: '12px', md: '16px'}}}>
                Mintz Job mang trong mình sứ mệnh nâng cao chất lượng tuyển dụng tại Việt Nam,
                xây dựng cầu nối vững chắc giữa ứng viên tiềm năng và nhà tuyển dụng uy tín.
                Chúng tôi hướng đến việc tạo ra một hệ sinh thái tuyển dụng hiện đại, minh bạch,
                nhanh chóng và hiệu quả – nơi mọi cơ hội nghề nghiệp đều được tiếp cận dễ dàng,
                đúng người và đúng nhu cầu doanh nghiệp.
            </Typography>
            <Grid container spacing={3}>
                {CONTENT_MISSION.map((content, index) => {
                    return(
                        <Grid size={{ xs: 12, sm: 6, lg: 3}}>
                            <Box
                                display='flex'
                                flexDirection='column'
                                key={index}
                                alignItems='center'
                                gap={1}
                                mt={3}
                                
                            >

                                <Box
                                    sx={{
                                        bgcolor: '#fff',
                                        width: { xs: 250, md: 350},
                                        height: { xs: 200, md: 250},
                                        borderRadius: 3,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CommonImage
                                        src={content.image}
                                        sx={{
                                            bgcolor: '#fff',
                                            width: { xs: 100, md: 120},
                                            height: { xs: 100, md: 120},
                                            borderRadius: 3
                                        }}
                                    />
                                </Box>
                                <Typography mt={2} textAlign='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-word', fontSize: {xs: '13px', md: '16px'}}}>
                                    {content.label}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
        </>
    )
}
export default MissionDevelopment;