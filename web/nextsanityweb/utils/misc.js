import sanity from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

export const imageUrlFor = source => imageBuilder.image(source);

