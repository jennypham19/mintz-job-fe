import { Box,Typography } from '@mui/material';
import VisionIntroduction from './components/VisionIntroduction';
import ImageCarousel, { SrcSetWidth } from '../Home/components/ImageCarousel';
import MissionDevelopment from './components/MissionDevelopment';
import anh_xam from '@/assets/images/users/Background-xam-1.jpg';
import Page from '@/components/Page';

const AboutUs = () => {
  const fixedImages: SrcSetWidth[] = [
    {id: 1, name: 'anh_xam', url: `${anh_xam}`, srcSet1200: `${anh_xam}`, srcSet768: `${anh_xam}` },
  ]
  return (
    <Page title='Mintz - Giới thiệu'>
      <Box sx={{ bgcolor: '#031512', color: 'white',}}>
        <Box
          sx={{
            px: { xs: 2, sm: 8, md: 10 },
            py: { xs: 4, md: 6 },
            textAlign: 'left',
          }}
        >
          {/* Tiêu đề lớn */}
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            mb={2}
          >
            Giới thiệu
          </Typography>
          <Typography variant='body1' textAlign='center' mb={5}>Trang chủ/Giới thiệu</Typography>
          <VisionIntroduction/>
        </Box>
        <ImageCarousel fixedImages={fixedImages}/>
        <Box
          sx={{
            px: { xs: 2, sm: 8, md: 10},
            py: { xs: 4, md: 6},
            textAlign: 'left',
          }}
        >
          <MissionDevelopment/>
        </Box>
      </Box>
    </Page>
  );
};

export default AboutUs;
