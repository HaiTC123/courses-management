export const mapNotificationType = (message: any) => {
  let title = "Thông báo";
  let link = "";
  let profileURL = "";
  if (message.type === "Instructor_Send_Course_To_Admin_Approve") {
    const data = JSON.parse(message.rawData);
    title = "Có khóa học mới gửi đến cần duyệt";
    link = `/admin/courses/${data.courseId}`;
  } else if (message.type === "Admin_Reject_Course") {
    const data = JSON.parse(message.rawData);
    title = `Khóa học '${data.courseName}' đã bị từ chối`;
    link = `/instructor/courses/${data.courseId}`;
  } else if (message.type === "Admin_Approved_Course") {
    const data = JSON.parse(message.rawData);
    title = `Khóa học '${data.courseName}' đã được duyệt`;
    link = `/instructor/courses/${data.courseId}`;
  } else if (message.type === "Student_Buy_Course") {
    const data = JSON.parse(message.rawData);
    title = "Có sinh viên mua khóa học của bạn";
    link = ``;
  } else if (message.type === "Student_Send_Advising_To_Advisor") {
    const data = JSON.parse(message.rawData);
    title = "Có yêu cầu tư vấn mới từ sinh viên";
    link = `/instructor/advise?adviseId=${data.academicAdvisingID}`;
  } else if (message.type === "Advisor_Chat_Advising_To_Student") {
    const data = JSON.parse(message.rawData);
    title = "Có tin nhắn mới từ giáo viên";
    link = `/advise?adviseId=${data.academicAdvisingID}`;
    profileURL = data.profileURL;
  } else if (message.type === "Student_Chat_Advising_To_Advisor") {
    const data = JSON.parse(message.rawData);
    title = "Có tin nhắn mới từ sinh viên";
    link = `/instructor/advise?adviseId=${data.academicAdvisingID}`;
    profileURL = data.profileURL;
  } else if (message.type === "Advisor_Approve_Advising") {
    const data = JSON.parse(message.rawData);
    title = "Tư vấn đã được duyệt";
    link = `/advise?adviseId=${data.academicAdvisingID}`;
  } else if (message.type === "Advisor_Reject_Advising") {
    const data = JSON.parse(message.rawData);
    title = "Tư vấn đã bị từ chối";
    link = `/advise?adviseId=${data.academicAdvisingID}`;
  } else if (message.type === "Advisor_Cancel_Advising") {
    const data = JSON.parse(message.rawData);
    title = "Tư vấn đã bị hủy";
    link = `/advise?adviseId=${data.academicAdvisingID}`;
  } else if (message.type === "Advisor_Done_Advising") {
    const data = JSON.parse(message.rawData);
    title = "Tư vấn đã hoàn thành";
    link = `/advise?adviseId=${data.academicAdvisingID}`;
  } else if (message.type === "Student_Cancel_Advising") {
    const data = JSON.parse(message.rawData);
    title = "Tư vấn đã bị hủy";
    link = `/instructor/advise?adviseId=${data.academicAdvisingID}`;
  } else if (message.type === "System_Scheduled_Course") {
    const data = JSON.parse(message.rawData);
    title = `Đã đến thời gian học khóa '${data.courseName}'`;
    link = `/learning/${data.courseId}`;
  }
  return { title, link, profileURL };
};
