export const VideoPlayer = ({ url }: { url: string }) => {
  return <iframe src={url} allowFullScreen className="w-full h-[500px]" />;
};
