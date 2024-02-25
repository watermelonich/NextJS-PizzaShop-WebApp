//connecting sanity to next js

import {createClient} from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "q30gmkyn",
  dataset: "production",
  apiVersion: "2022-07-16",
  useCdn: true,
  token:
    "skIPyORq4rttAksARnFDnCxCoSZzjmd96MHkg5MujNdAPEVJPWwoZ2HST9OqjHPa4n3Ef39SnVMUv00jyq0nUgnsHdnKfA9Ch144N7z1FeTFHKZlucuNZPGDJUwUykI04Z8KqIbaBLQNNHa6acPpS8Hgd31qiiJ5YQnJgNvboyHo8kwGoSK5",
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source); //for fetching sanity image source
