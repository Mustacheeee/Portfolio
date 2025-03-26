import mobile from "../assets/mobile.png";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";
import web from "../assets/web.png";
import javascript from "../assets/tech/javascript.png";
import typescript from "../assets/tech/typescript.png";
import html from "../assets/tech/html.png";
import css from "../assets/tech/css.png";
import reactjs from "../assets/tech/reactjs.png";
import redux from "../assets/tech/redux.png";
import tailwind from "../assets/tech/tailwind.png";
import nodejs from "../assets/tech/nodejs.png";
import mongodb from "../assets/tech/mongodb.png";
import git from "../assets/tech/git.png";
import figma from "../assets/tech/figma.png";
import java from "../assets/tech/java.png";
import python from "../assets/tech/python.png";
import blender from "../assets/tech/blender.png";
import swift from "../assets/tech/swift.png";
import sql from "../assets/tech/sql.png";
import aws from "../assets/tech/aws.png";
import unity from "../assets/tech/unity.png";
import jobit from "../assets/jobit.png";
import tripguide from "../assets/tripguide.png";
import threejs from "../assets/tech/threejs.svg";

const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  // {
  //   name: "MongoDB",
  //   icon: mongodb,
  // },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  // here
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Python",
    icon: python,
  },
  // {
  //   name: "Blender",
  //   icon: blender,
  // },
  // {
  //   name: "Swift",
  //   icon: swift,
  // },
  // {
  //   name: "SQL",
  //   icon: sql,
  // },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "Unity",
    icon: unity,
  }
];

const projects = [
  {
    name: "Rock Pet",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, projects, navLinks };
