import type { Image } from "../types/Image";

export default function ImagesList({ images }: { images: Array<Image> }) {
  return (
    <div className="flex gap-x-8 justify-center">
      {images.map((image, i) => {
        const scale = image.id % 2 === 0 ? "scale-75" : "scale-100";
        return (
          <div key={image.id}>
            <img
              src={image.url}
              className={"rounded-lg " + scale}
              alt={"image " + image.id}
            />
          </div>
        );
      })}
    </div>
  );
}
