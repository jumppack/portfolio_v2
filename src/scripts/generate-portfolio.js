
const fs = require('fs');
const path = require('path');

const configName = process.argv[2];

if (!configName) {
  console.error('Please provide a configuration filename (e.g., sample.json)');
  process.exit(1);
}

const configPath = path.resolve(process.cwd(), 'data', 'configs', configName);
const contentPath = path.resolve(process.cwd(), 'src', 'resources', 'content.tsx');

if (!fs.existsSync(configPath)) {
  console.error(`Configuration file not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Helper to generate the content.tsx file string
const generateContent = (data) => {
  return `import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = ${JSON.stringify(data.person, null, 2)};

const newsletter: Newsletter = {
  display: ${data.newsletter.display},
  title: <>${data.newsletter.title}</>,
  description: <>${data.newsletter.description}</>,
};

const social: Social = ${JSON.stringify(data.social, null, 2)};

const home: Home = {
  path: "${data.home.path}",
  image: "${data.home.image}",
  label: "${data.home.label}",
  title: "${data.home.title}",
  description: "${data.home.description}",
  headline: <>${data.home.headline}</>,
  featured: ${JSON.stringify(data.home.featured, null, 2)},
  subline: <>${data.home.subline}</>,
};

const about: About = {
  path: "${data.about.path}",
  label: "${data.about.label}",
  title: "${data.about.title}",
  description: "${data.about.description}",
  tableOfContent: ${JSON.stringify(data.about.tableOfContent, null, 2)},
  avatar: ${JSON.stringify(data.about.avatar, null, 2)},
  calendar: ${JSON.stringify(data.about.calendar, null, 2)},
  intro: {
    display: ${data.about.intro.display},
    title: "${data.about.intro.title}",
    description: <>${data.about.intro.description}</>,
  },
  work: {
    display: ${data.about.work.display},
    title: "${data.about.work.title}",
    experiences: ${JSON.stringify(data.about.work.experiences, null, 2).replace(/"achievements": \[\n\s+("[^"]+"),?\n\s+\]/g, '"achievements": [<>$1</>]').replace(/"achievements": \[\n\s+("[^"]+"),\n\s+("[^"]+")\n\s+\]/g, '"achievements": [<>$1</>, <>$2</>]')},
  },
  studies: {
    display: ${data.about.studies.display},
    title: "${data.about.studies.title}",
    institutions: [
      ${data.about.studies.institutions.map(inst => `{
        name: "${inst.name}",
        description: <>${inst.description}</>,
      }`).join(',\n')}
    ],
  },
  technical: {
    display: ${data.about.technical.display},
    title: "${data.about.technical.title}",
    skills: [
      ${data.about.technical.skills.map(skill => `{
        title: "${skill.title}",
        description: <>${skill.description}</>,
        tags: ${JSON.stringify(skill.tags, null, 2)},
        images: ${JSON.stringify(skill.images, null, 2)},
      }`).join(',\n')}
    ],
  },
};

const blog: Blog = ${JSON.stringify(data.blog, null, 2)};

const work: Work = ${JSON.stringify(data.work, null, 2)};

const gallery: Gallery = ${JSON.stringify(data.gallery, null, 2)};

export { person, social, newsletter, home, about, blog, work, gallery };
`;
};

const content = generateContent(config);

fs.writeFileSync(contentPath, content);

console.log(`Successfully generated portfolio content from ${configName}`);
