export const mapNotificationType = (message: any) => {
  let title = "Thông báo";
  let link = "";
  if (message.type === "Instructor_Send_Course_To_Admin_Approve") {
    const data = JSON.parse(message.rawData);
    title = "Có khóa học mới gửi đến cần duyệt";
    link = `/admin/courses/${data.courseId}`;
  } else if (message.type === "Admin_Reject_Course") {
    const data = JSON.parse(message.rawData);
    title = `Khóa học '${data.courseName}' đã bị từ chối`;
    link = `/instructor/courses/${data.courseId}`;
  } else if (message.type === "Admin_Approve_Course") {
    const data = JSON.parse(message.rawData);
    title = `Khóa học '${data.courseName}' đã được duyệt`;
    link = `/instructor/courses/${data.courseId}`;
  }
  return { title, link };
};
