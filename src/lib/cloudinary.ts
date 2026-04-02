const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Build an optimized Cloudinary image URL with automatic format and quality.
 *
 * @param publicId - The Cloudinary public ID (e.g. "basiq/hero-image")
 * @param options  - Width, height, crop, gravity, and extra transforms
 */
export function cloudinaryImage(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    gravity?: string;
    quality?: string | number;
    format?: string;
    transforms?: string;
  } = {}
): string {
  if (!cloudName || cloudName === "your-cloud-name") {
    return `/images/${publicId}`;
  }

  const parts: string[] = [];

  if (options.width) parts.push(`w_${options.width}`);
  if (options.height) parts.push(`h_${options.height}`);
  parts.push(`c_${options.crop || "fill"}`);
  if (options.gravity) parts.push(`g_${options.gravity}`);
  parts.push(`q_${options.quality || "auto"}`);
  parts.push(`f_${options.format || "auto"}`);
  if (options.transforms) parts.push(options.transforms);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${parts.join(",")}/${publicId}`;
}

/**
 * Build an optimized Cloudinary video URL.
 *
 * @param publicId - The Cloudinary public ID (e.g. "basiq/topiq-demo")
 * @param options  - Width, quality, format, and extra transforms
 */
export function cloudinaryVideo(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    transforms?: string;
  } = {}
): string {
  if (!cloudName || cloudName === "your-cloud-name") {
    return `/videos/${publicId}`;
  }

  const parts: string[] = [];

  if (options.width) parts.push(`w_${options.width}`);
  if (options.height) parts.push(`h_${options.height}`);
  parts.push(`q_${options.quality || "auto"}`);
  parts.push(`f_${options.format || "auto"}`);
  if (options.transforms) parts.push(options.transforms);

  return `https://res.cloudinary.com/${cloudName}/video/upload/${parts.join(",")}/${publicId}`;
}

/**
 * Generate a video poster/thumbnail from Cloudinary.
 */
export function cloudinaryVideoPoster(
  publicId: string,
  options: { width?: number; time?: string } = {}
): string {
  if (!cloudName || cloudName === "your-cloud-name") {
    return `/images/${publicId}-poster.jpg`;
  }

  const parts: string[] = [];
  if (options.width) parts.push(`w_${options.width}`);
  parts.push("q_auto");
  parts.push("f_auto");
  if (options.time) parts.push(`so_${options.time}`);

  return `https://res.cloudinary.com/${cloudName}/video/upload/${parts.join(",")}/${publicId}.jpg`;
}

/**
 * Generate a srcSet string for responsive images.
 */
export function cloudinaryImageSrcSet(
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600],
  options: { crop?: string; gravity?: string } = {}
): string {
  return widths
    .map(
      (w) =>
        `${cloudinaryImage(publicId, { ...options, width: w })} ${w}w`
    )
    .join(", ");
}
