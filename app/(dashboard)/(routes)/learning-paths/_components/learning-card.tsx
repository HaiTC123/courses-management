import Image from "next/image";
import Link from "next/link";

export interface LearningCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  slug,
}) => {
  return (
    <Link href={`/learning-paths/${slug}`}>
      <div className="h-full overflow-hidden transition duration-300 ease-in-out border rounded-lg group hover:shadow-lg hover:scale-105">
        <div className="flex items-center p-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold pb-2">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>
          <div className="hidden md:flex flex-[0_115px] items-center justify-center ml-2">
            <Image
              width={98}
              height={98}
              className=" transition-transform duration-300 group-hover:scale-110"
              src={imageUrl}
              alt={title}
            />
          </div>
        </div>
        {/* <div className="relative w-full overflow-hidden rounded-t-lg aspect-video">
          <Image
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            src={imageUrl}
            alt={title}
          />
        </div> */}
        {/* <div className="flex flex-col p-3">
          <div className="flex flex-col pt-2">
            <div className="text-lg font-medium transition-colors duration-300 md:text-base group-hover:text-blue-600">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">{category?.name}</p>
          </div>
          <div className="flex items-center my-3 text-sm gap-x-2 md:text-xs">
            <div className="flex items-center gap-x-1">
              <IconBadge size="sm" icon={BookOpen} />
              <span>{progress}</span>
            </div>
          </div>
          {progress !== null ? (
            <div>a</div>
          ) : (
            <p className="font-medium transition-colors duration-300 text-md md:text-sm text-slate-600 group-hover:text-blue-600">
              {formatPrice(price)}
            </p>
          )}
        </div> */}
      </div>
    </Link>
  );
};
