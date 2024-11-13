import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4 text-4xl font-bold">Không tìm thấy trang</h2>
      <p className="mb-6 text-gray-600">Không tìm thấy trang yêu cầu</p>
      <Link href="/" className="text-blue-500 underline hover:text-blue-700">
        Trở về trang chủ
      </Link>
    </div>
  );
}
