import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "lctwv21k",
  dataset: "production",
  useCdn: true
});
