import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2'
import { CONTENT_MISSION, CONTENT_SERVICE } from "@/constants/contentAbout";
import CommonImage from "@/components/Image/index";
import { IServices } from "@/types/settings";
import { getServices } from "@/services/settings-service";
import image_slide_12 from '@/assets/images/users/12.png';
import image_slide_10 from '@/assets/images/users/10.png';


interface ServicesData extends IServices{
    order: number | string,
    isReverse: boolean
}

const MissionDevelopment: React.FC = () => {
    const page = 0;
    const rowsPerPage = 10
    const [services, setServices] = useState<IServices[]>([]);

    useEffect(() => {
        const fetchServices = async() => {
            const res = await getServices({ page: page, size: rowsPerPage});
            const data = res.data?.services as any as IServices[];
            const newData: ServicesData[] = data?.map(
                (service, index) => {
                    const numericId = Number(service.id);
                    return {
                        id: service.id,
                        content: service.content,
                        title: service.title,
                        image_url: !isNaN(numericId) && numericId % 2 !== 0 ? service.image_url || image_slide_12 : service.image_url || image_slide_10,
                        createdAt: service.createdAt,
                        updatedAt: service.updatedAt,
                        order: String(index + 1).padStart(2, '0'),
                        isReverse: !isNaN(numericId) && numericId % 2 !== 0 //true nếu là số lẻ
                    }
                }
            )
            setServices(newData);
        }
        fetchServices()
    }, [page, rowsPerPage])
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
                Mintz Funi luôn tự hào là đơn vị uy tín hàng đầu trong lĩnh vực thiết kế nội thất khách sạn và resort, với thế mạnh lên ý tưởng sáng tạo, tư vấn tận tâm và đồng hành cùng khách hàng để mang đến những giải pháp thiết kế tối ưu, phù hợp từng mục tiêu kinh doanh.Khởi đầu xây dựng là những con người có đam mê và tâm huyết, sau nhiều năm hoạt động thì chúng tôi dần đã trờ thành đơn vị nhà thầu có độ tin cậy tuyệt đối với những khách hàng có nhu cầu về thiết kế nội thất hiện nay.
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