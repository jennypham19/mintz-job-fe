import { CategoryProps } from "@/types/post";
import { ROUTE_PATH } from "./routes";
import EventIcon from '@mui/icons-material/Event';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import DevicesIcon from '@mui/icons-material/Devices';
import StyleIcon from '@mui/icons-material/Style';
import post from "@/assets/images/users/post/post.png";
import post_1 from "@/assets/images/users/post/post-1.jpg";
import post_2 from "@/assets/images/users/post/post-2.png";
import post_3 from "@/assets/images/users/post/post-3.png";
import post_4 from "@/assets/images/users/post/post-4.png";
import post_5 from "@/assets/images/users/post/post-5.jpg";
import post_6 from "@/assets/images/users/post/post-6.png";
import post_8 from "@/assets/images/users/post/post-8.png";
import post_9 from "@/assets/images/users/post/post-9.png";
import post_10 from "@/assets/images/users/post/post-10.png";
import post_11 from "@/assets/images/users/post/post-11.jpg";
import post_12 from "@/assets/images/users/post/post-12.png";
import post_13 from "@/assets/images/users/post/post-13.png";
import post_14 from "@/assets/images/users/post/post-14.png";
import post_15 from "@/assets/images/users/post/post-15.png";
import { IDataPostHome } from "@/types/landing-page";
import { v4 as uuidv4 } from "uuid"
import dayjs from "dayjs";

export const DATA_ALL_GROUPS = [
    {
        id: 1,
        name: 'Nhóm quyền quản lý bài viết',
        permission: [
            {
                id: 1,
                code: '001',
                name: 'Trang chủ',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
                actions: [
                    { id: 1, code: '001001', name: 'Xem'},
                    { id: 2, code: '001005', name: 'Xem chi tiết'},
                ]
            },
            {
                id: 2,
                code: '003',
                name: 'Quản lý bài viết',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_BLOG}`,
                actions: [
                    { id: 1, code: '003001', name: 'Xem'},
                    { id: 2, code: '003002', name: 'Lưu/Tạo', path: `/${ROUTE_PATH.BLOG_CREATE}`},
                    { id: 3, code: '003003', name: 'Cập nhật/Chỉnh sửa', path: `/${ROUTE_PATH.BLOG_EDIT}`},
                    { id: 4, code: '003005', name: 'Xem chi tiết', path: `/${ROUTE_PATH.BLOG_DETAIL}`}
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Nhóm quyền quản lý thông tin khách hàng',
        permission: [
            {
                id: 1,
                code: '001',
                name: 'Trang chủ',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
                actions: [
                    { id: 1, code: '001001', name: 'Xem'},
                    { id: 1, code: '001005', name: 'Xem chi tiết'},
                ]
            },
            {
                id: 2,
                code: '002',
                name: 'Quản lý thông tin',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MY_PROFILE}`,
                actions: [
                    { id: 1, code: '002001', name: 'Xem'},
                    { id: 1, code: '002005', name: 'Xem chi tiết'},
                ]
            },
        ]
    },
    {
        id: 3,
        name: 'Nhóm quyền quản lý thông tin và bài viết',
        permission: [
            {
                id: 1,
                code: '001',
                name: 'Trang chủ',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
                actions: [
                    { id: 1, code: '001001', name: 'Xem'},
                    { id: 1, code: '001005', name: 'Xem chi tiết'},
                ]
            },
            {
                id: 2,
                code: '002',
                name: 'Quản lý thông tin',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MY_PROFILE}`,
                actions: [
                    { id: 1, code: '002001', name: 'Xem'},
                    { id: 1, code: '002005', name: 'Xem chi tiết'},
                ]
            },
            {
                id: 3,
                code: '003',
                name: 'Quản lý bài viết',
                path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_BLOG}`,
                actions: [
                    { id: 1, code: '003001', name: 'Xem'},
                    { id: 2, code: '003002', name: 'Lưu/Tạo', path: `/${ROUTE_PATH.BLOG_CREATE}`},
                    { id: 3, code: '003003', name: 'Cập nhật/Chỉnh sửa', path: `/${ROUTE_PATH.BLOG_EDIT}`},
                    { id: 4, code: '003005', name: 'Xem chi tiết', path: `/${ROUTE_PATH.BLOG_DETAIL}`}
                ]
            }
        ]
    }
];

export const modules = [
  {
    id: 1,
    code: "001",
    name: "Trang chủ",
    path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
    action: [
      { id: 1, code: "001001", name: "Xem" },
      { id: 2, code: "001005", name: "Xem chi tiết" }
    ]
  },
  {
    id: 2,
    code: "002",
    name: "Quản lý thông tin",
    path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MY_PROFILE}`,
    action: [
      { id: 1, code: "002001", name: "Xem" },
      { id: 2, code: "002005", name: "Xem chi tiết" }
    ]
  },
  {
    id: 3,
    code: "003",
    name: "Quản lý bài viết",
    path: `/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_BLOG}`,
    action: [
        { id: 1, code: '003001', name: 'Xem'},
        { id: 2, code: '003002', name: 'Lưu/Tạo', path: `/${ROUTE_PATH.BLOG_CREATE}`},
        { id: 3, code: '003003', name: 'Cập nhật/Chỉnh sửa', path: `/${ROUTE_PATH.BLOG_EDIT}`},
        { id: 4, code: '003005', name: 'Xem chi tiết', path: `/${ROUTE_PATH.BLOG_DETAIL}`}
    ]
  }
];

export const categoryPost: CategoryProps[] = [
  {
    category: 1,
    categor_label: 'Sự kiện',
    icon: EventIcon
  },
  {
    category: 2,
    categor_label: 'Kiến trúc',
    icon: ArchitectureIcon
  },
  {
    category: 3,
    categor_label: 'Đời sống',
    icon: StyleIcon
  },
  {
    category: 4,
    categor_label: 'Công nghệ',
    icon: DevicesIcon
  },
]

export const DATA_POST: IDataPostHome[] = [
  {
    id: uuidv4(),
    imageUrl: post,
    date: dayjs().toISOString(),
    natureOfWork: 'Online',
    location: 'HCM',
    title: 'Tập đoàn Công Nghệ Zalo Tuyển dụng cộng tác viên xử lý dữ liệu Part-time 2025'
  },
  {
    id: uuidv4(),
    imageUrl: post_1,
    date: dayjs().toISOString(),
    natureOfWork: 'Online',
    title: 'Kênh Thông Tin YBOX.VN Tuyển Dụng Đại Sứ Truyền Thông, CTV Social Engagement/ Threads,Tiktok/ Content Creator/ Designer, CTV HR Part-time 2024',
    experience: 'Không Yêu Cầu Kinh Nghiệm, Cơ Hội Trở Thành Thực Tập Sinh Chính Thức Sau 2 Tháng'
  },
  {
    id: uuidv4(),
    imageUrl: post_2,
    date: dayjs().toISOString(),
    natureOfWork: 'Online',
    title: 'Công Ty Tư Vấn Giáo Dục Dr Nhanh Tuyển Dụng Freelance Academic Writer Part-time/Full-time 2025',
    experience: 'Không Yêu Cầu Kinh Nghiệm',
    salary: 'Thu Nhập 10-15 Triệu/Tháng'
  },
  {
    id: uuidv4(),
    imageUrl: post_3,
    date: dayjs().toISOString(),
    location: 'HCM',
    title: 'Công Ty OnPoint E-commerce Tuyển Dụng Thực Tập Sinh & Nhân Viên Part-time/Full-time: Livestream Standby, Logistics, Supply Chain, Media, Video Editor, Campaign & Merchandise 2025',
  },
  {
    id: uuidv4(),
    imageUrl: post_4,
    date: dayjs().toISOString(),
    natureOfWork: 'Online',
    title: 'Tập Đoàn Công Nghệ VNG Corporation Tuyển Dụng Cộng Tác Viên Content Part-time 2025',
  },
  {
    id: uuidv4(),
    imageUrl: post_5,
    date: dayjs().toISOString(),
    location: 'HN/Bắc Ninh',
    title: 'Công Ty Xuất Nhập Khẩu ASA Hair Tuyển Dụng Nhân Viên Kinh Doanh Quốc Tế, E-Commerce Manager Full-time 2025',
    experience: 'Không Yêu Cầu Kinh Nghiệm',
    salary: 'Thu Nhập: 8-30 Triệu/Tháng'
  },
  {
    id: uuidv4(),
    imageUrl: post_6,
    date: dayjs().toISOString(),
    location: 'HCM',
    title: 'Tập Đoàn Concentrix Việt Nam Tuyển Dụng Nhân Viên Chăm Sóc Khách Hàng Ứng Dụng Du Lịch Full-time 2025',
    experience: 'Không Yêu Cầu Kinh Nghiệm',
    salary: 'Thu Nhập 10-12 Triệu/ Tháng'
  },
  {
    id: uuidv4(),
    imageUrl: post_8,
    date: dayjs().toISOString(),
    location: 'HCM',
    title: 'Công Ty Thương Mại Dịch Vụ We Are One Tuyển Dụng Nhân Viên Kinh Doanh & Trưởng Nhóm Kinh Doanh Full-time 2025',
    salary: 'Thu Nhập: 10-20 Triệu/Tháng, Lương Cố Định, Không Phụ Thuộc Doanh Số'
  },
  {
    id: uuidv4(),
    imageUrl: post_9,
    date: dayjs().toISOString(),
    natureOfWork: 'Online',
    title: 'Công Ty Giải Trí Đa Phương Tiện EMVN Tuyển Dụng Nhân Viên Full-time: YouTube Channel Optimizer, Digital Distribution Operator, Fresher Software Developers 2025',
    experience: 'Không Yêu Cầu Kinh Nghiệm',
    salary: 'Mức Lương 8-20 Triệu/Tháng'
  },
  {
    id: uuidv4(),
    imageUrl: post_10,
    date: dayjs().toISOString(),
    location: 'HCM',
    title: 'Trường Đại Học Văn Lang Tuyển Dụng Cộng Tác Viên Nhân Sự Part-time 2025',
  },
  {
    id: uuidv4(),
    imageUrl: post_11,
    date: dayjs().toISOString(),
    location: 'Toàn quốc',
    title: 'Chương Trình Tuyển Dụng Thực Tập Sinh Tại Ngân Hàng Sacombank 2026',
    salary: 'Hỗ Trợ 10,000,000 VNĐ, Cơ Hội Thành Quản Lý Sau 3 Năm'
  },
  {
    id: uuidv4(),
    imageUrl: post_12,
    date: dayjs().toISOString(),
    natureOfWork: 'Startup-Online',
    title: 'Nền Tảng Giáo Dục Online CLEVAI Tuyển Dụng Giáo Viên Dạy Giao Tiếp Cho Trẻ Part-time 2025',
  },
  {
    id: uuidv4(),
    imageUrl: post_13,
    date: dayjs().toISOString(),
    natureOfWork: 'Online',
    location: 'HCM',
    title: 'SNOW Việt Nam Tuyển Dụng Thực Tập Sinh Full-time: ZEPETO Motion Capture & ZEPETO Global Content 2025',
    salary: 'Mức Lương: 3,000,000 VNĐ/Tháng'
  },
  {
    id: uuidv4(),
    imageUrl: post_14,
    date: dayjs().toISOString(),
    location: 'HN/Quảng Ninh/Đà Nẵng/HCM',
    title: 'AEONMALL Việt Nam Tuyển Dụng Nhân Viên Kinh Doanh, Kế Hoạch Kinh Doanh, Hành Chính, Kế Toán, Cơ Sở Vật Chất, Marketing & An Ninh/ Chuyên Viên Kinh Doanh & Marketing Full-time 2025',
  },
  {
    id: uuidv4(),
    imageUrl: post_15,
    date: dayjs().toISOString(),
    location: 'HN',
    title: 'Công Ty Dịch Vụ Thông Tin Tài Chính Fiin Group Tuyển Dụng Thực Tập Sinh Phân Tích Dữ Liệu Tài Chính Full-time 2025',
  },
];