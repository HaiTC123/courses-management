import { toPng } from "html-to-image";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { toast } from "react-hot-toast";

interface CertificateProps {
  courseName: string;
  userName: string;
  instructorName: string;
}

export const Certificate = forwardRef<any, CertificateProps>(
  ({ courseName, userName, instructorName }, ref) => {
    const certificateRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      downloadCertificate() {
        if (certificateRef.current) {
          toPng(certificateRef.current)
            .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = "certificate.png";
              link.href = dataUrl;
              link.click();
              toast.success("Tải xuống chứng chỉ thành công");
            })
            .catch((error) => {
              toast.error("Tải xuống chứng chỉ thất bại");
            });
        }
      },
    }));

    return (
      <div ref={certificateRef} className="relative">
        <Image
          src="/certificate.png"
          className="cursor-pointer"
          height={1414}
          width={2000}
          alt="Certificate Image"
        />
        <h1 className="absolute text-4xl font-bold text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {userName}
        </h1>
        <h3 className="absolute text-sm font-semibold text-black -translate-x-1/2 -translate-y-1/2 bottom-[33%] left-1/2">
          {courseName}
        </h3>
        <h5 className="absolute text-xs font-semibold text-black -translate-x-1/2 -translate-y-1/2 bottom-[16%] left-[30%]">
          {instructorName}
        </h5>
      </div>
    );
  }
);

Certificate.displayName = "Certificate";
