export enum LearningPathSlug {
  FRONT_END = "front-end-development",
  BACK_END = "back-end-development",
}

export const learningPaths = [
  {
    id: "1",
    title: "Lộ trình học Front-end",
    description:
      "Lập trình viên Front-end là người xây dựng ra giao diện websites. Phần này sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.",
    imageUrl:
      "https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png",
    slug: LearningPathSlug.FRONT_END,
  },

  {
    id: "2",
    title: "Lộ trình học Back-end",
    description:
      "Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.",
    imageUrl:
      "https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png",
    slug: LearningPathSlug.BACK_END,
  },
];

export const learningPathsData = new Map([
  [
    LearningPathSlug.FRONT_END,
    {
      id: "1",
      title: "Lộ trình học Front-end",
      description:
        "Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là Front-end và Back-end. Front-end là phần giao diện người dùng nhìn thấy và có thể tương tác, đó chính là các ứng dụng mobile hay những website bạn đã từng sử dụng. Vì vậy, nhiệm vụ của lập trình viên Front-end là xây dựng các giao diện đẹp, dễ sử dụng và tối ưu trải nghiệm người dùng.",
      slug: LearningPathSlug.FRONT_END,
      parts: [
        {
          id: "1_1",
          title: "Tìm hiểu về ngành IT",
          description:
            "Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các bạn.",
          courses: [
            {
              id: "1_1_1",
              title: "Kiến Thức Nhập Môn IT",
              description:
                "Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.",
              imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
              courseSlug: "/courses/ki-thuc-nhap-mon-it",
            },
          ],
        },
        {
          id: "1_2",
          title: "HTML & CSS",
          description:
            "Để học web Front-end chúng ta luôn bắt đầu với ngôn ngữ HTML và CSS, đây là 2 ngôn ngữ có mặt trong mọi website trên internet. Trong khóa học này F8 sẽ chia sẻ từ những kiến thức cơ bản nhất. Sau khóa học này bạn sẽ tự làm được 2 giao diện websites là The Band và Shopee.",
          courses: [
            {
              id: "1_2_1",
              title: "HTML CSS Pro",
              description:
                "Từ cơ bản tới chuyên sâu, thực hành 8 dự án, hàng trăm bài tập, trang hỏi đáp riêng, cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.",
              imageUrl:
                "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
              courseSlug: "/courses/html-css-pro",
            },
            {
              id: "1_2_2",
              title: "Responsive Với Grid System",
              description:
                "Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự Bootstrap 4.",
              imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/3.png",
              courseSlug: "/courses/responsive-voi-grid-system",
            },
          ],
        },
      ],
    },
  ],
  [
    LearningPathSlug.BACK_END,
    {
      id: "2",
      title: "Lộ trình học Back-end",
      description:
        "Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là Front-end và Back-end. Front-end là phần giao diện người dùng nhìn thấy và có thể tương tác. Back-end là nơi xử lý dữ liệu và lưu trữ. Vì vậy, nhiệm vụ của lập trình viên Back-end là phân tích thiết kế dữ liệu, xử lý logic nghiệp vụ của các chức năng trong ứng dụng.",
      imageUrl:
        "https://files.fullstack.edu.vn/f8-prod/learning-paths/3/63b4641535b16.png",
      slug: LearningPathSlug.BACK_END,
      parts: [
        {
          id: "1_1",
          title: "Tìm hiểu về ngành IT",
          description:
            "Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các bạn.",
          courses: [
            {
              id: "1_1_1",
              title: "Kiến Thức Nhập Môn IT",
              description:
                "Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.",
              imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
              courseSlug: "/courses/ki-thuc-nhap-mon-it",
            },
          ],
        },
        {
          id: "1_2",
          title: "HTML & CSS",
          description:
            "Để học web Front-end chúng ta luôn bắt đầu với ngôn ngữ HTML và CSS, đây là 2 ngôn ngữ có mặt trong mọi website trên internet. Trong khóa học này F8 sẽ chia sẻ từ những kiến thức cơ bản nhất. Sau khóa học này bạn sẽ tự làm được 2 giao diện websites là The Band và Shopee.",
          courses: [
            {
              id: "1_2_1",
              title: "HTML CSS Pro",
              description:
                "Từ cơ bản tới chuyên sâu, thực hành 8 dự án, hàng trăm bài tập, trang hỏi đáp riêng, cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.",
              imageUrl:
                "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
              courseSlug: "/courses/html-css-pro",
            },
            {
              id: "1_2_2",
              title: "Responsive Với Grid System",
              description:
                "Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web responsive với Grid System, tương tự Bootstrap 4.",
              imageUrl: "https://files.fullstack.edu.vn/f8-prod/courses/3.png",
              courseSlug: "/courses/responsive-voi-grid-system",
            },
          ],
        },
      ],
    },
  ],
]);
