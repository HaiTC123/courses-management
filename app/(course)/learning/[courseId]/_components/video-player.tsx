export const VideoPlayer = ({
  url,
  onEnded,
}: {
  url: string;
  onEnded: () => void;
}) => {
  return (
    <iframe
      src={url}
      allowFullScreen
      className="w-full h-[600px]"
      onEnded={onEnded}
    />
  );
};
