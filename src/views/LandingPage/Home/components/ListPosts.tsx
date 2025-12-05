import { IDataPostHome } from "@/types/landing-page";
import DateTime from "@/utils/DateTime";
import { Box, Card, CardContent, CardMedia, Chip, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef } from "react";

interface ListPostsProps {
  data: IDataPostHome[];
  onClickCard?: (post: IDataPostHome) => void;
}

const ListPosts: React.FC<ListPostsProps> = ({ data, onClickCard }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden", py: 1 }}>
      
      {/* Scrollable post list */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 1,
          px: 1,
          mt: 2,
          "&::-webkit-scrollbar": { display: "none" },
          position: "relative",
          zIndex: 1,   // Scroll phía dưới IconButton
        }}
      >
        {data.map((post, index) => {
            const infoParts = [post.natureOfWork, post.location].filter(Boolean);
            const extraParts  = [post.experience, post.salary].filter(Boolean);

            const infoText = infoParts.length ? `[${infoParts.join(" - ")}]` : "";
            const extraText  = extraParts.length ? `(${extraParts.join(",")})` : "";
            return (
                <Card
                    key={post.id ?? index}
                    onClick={() => onClickCard?.(post)}
                    sx={{
                    cursor: "pointer",
                    minWidth: 220,
                    maxWidth: 220,
                    flexShrink: 0,
                    }}
                >
                    <CardMedia
                    sx={{ height: 140, objectFit: 'cover' }}
                    image={post.imageUrl}
                    />
                    <CardContent>
                        <Chip
                            label={DateTime.FormatDate(post.date)}
                            color="error"
                            size="small"
                        />
                        <Typography sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }} mt={1} fontSize='15px'>
                            {`
                            ${infoText}
                            ${post.title}
                            ${extraText}
                            `}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })}
      </Box>

      {/* Left button */}
      <IconButton
        onClick={() => scroll(-250)}
        sx={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          bgcolor: "white",
          boxShadow: 2,
          border: "1px solid #c0bebeff",
          zIndex: 20,
          pointerEvents: "auto", // CLICK ĐƯỢC
          '&:hover': {
            bgcolor: '#fff'
          }
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Right button */}
      <IconButton
        onClick={() => scroll(250)}
        sx={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          bgcolor: "white",
          boxShadow: 2,
          border: "1px solid #c0bebeff",
          zIndex: 20,
          pointerEvents: "auto", // CLICK ĐƯỢC
          '&:hover': {
            bgcolor: '#fff'
          }
        }}
      >
        <ChevronRightIcon />
      </IconButton>

    </Box>
  );
};

export default ListPosts;
