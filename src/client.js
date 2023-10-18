import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'wm3svlwv',
  dataset: 'production',
  apiVersion: '2023-06-12',
  useCdn: true,
  token:
    'skIJM0ABFmuRDiAZBovwXyINUh155VEKe8aB2onUrG2HaPv8Z7gHUhJVmpYKe7AYzkqZeT2inmVMUf7N9riAsiGy3M7uNwzIlP5Z19BUxRvsbGDVEyUZqlThLsEFE2NGaO1QebZh24oUSJduMPAybt9GgOodjmymY9HT58kJMDR4ylsH35hy',
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
