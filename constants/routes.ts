import {
  Home,
  Book,
  LineChart,
  List,
  Computer,
  FileType,
  File,
  User,
  User2,
} from "lucide-react";

export const studentRoutes: any[] = [
  {
    icon: Home,
    label: "Trang chủ",
    href: "/",
  },
  {
    icon: Book,
    label: "Khóa học",
    href: "/courses",
  },
  {
    icon: LineChart,
    label: "Lộ trình",
    href: "/learning-paths",
  },
];

export const instructorRoutes: any[] = [
  {
    icon: Home,
    label: "Trang quản trị",
    href: "/instructor",
  },
  {
    icon: List,
    label: "Khóa học",
    href: "/instructor/courses",
  },
  {
    icon: Computer,
    label: "Lộ trình",
    href: "/instructor/learning-paths",
  },
  {
    icon: FileType,
    label: "Loại tài liệu",
    href: "/instructor/document-types",
  },
  {
    icon: File,
    label: "Tài liệu",
    href: "/instructor/documents",
  },
  {
    icon: File,
    label: "Điều kiện tiên quyết",
    href: "/instructor/prerequisites",
  },
];

export const adminRoutes: any[] = [
  {
    icon: Home,
    label: "Trang quản trị",
    href: "/admin",
  },
  {
    icon: User,
    label: "Người hướng dẫn",
    href: "/admin/instructors",
  },
  {
    icon: User2,
    label: "Học viên",
    href: "/admin/students",
  },
  {
    icon: List,
    label: "Khóa học",
    nestedRoutes: [
      {
        icon: Book,
        label: "Khóa học chờ duyệt",
        href: "/admin/courses",
      },
      {
        icon: Book,
        label: "Khóa học đã duyệt",
        href: "/admin/courses-approved",
      },
      {
        icon: Book,
        label: "Khóa học từ chối",
        href: "/admin/courses-rejected",
      },
      {
        icon: Book,
        label: "Khóa học đăng ký",
        href: "/admin/enrollments",
      },
    ],
  },
  {
    icon: FileType,
    label: "Loại tài liệu",
    href: "/admin/document-types",
  },
  {
    icon: File,
    label: "Tài liệu",
    href: "/admin/documents",
  },
];
