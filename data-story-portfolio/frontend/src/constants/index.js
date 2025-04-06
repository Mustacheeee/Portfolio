import mobile from "../assets/mobile.png";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";
import web from "../assets/web.png";
import javascript from "../assets/tech/javascript.png";
import typescript from "../assets/tech/typescript.png";
import html from "../assets/tech/html.png";
import css from "../assets/tech/css.png";
import reactjs from "../assets/tech/reactjs.png";
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
import rockpet from "../assets/rockpet.png";
import bereal from "../assets/bereal.png";
import tripguide from "../assets/tripguide.png";
import threjs from "../assets/tech/threjs.png";

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
    icon: threjs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
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
      "Rock Pets is a playful web project designed as a creative exploration of web development and design.",
    tags: [
      {
        name: "#HTML",
        color: "blue-text-gradient",
        background: "black",
      },
      {
        name: "#CSS",
        color: "green-text-gradient",
      },
      {
        name: "#JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: rockpet,
    source_code_link: "https://github.com/Mustacheeee/Rock-pet",
  },
  {
    name: "BeReal",
    description:
      "Instaparse is a social media-inspired app that allows users to sign up, log in, and share photos while ensuring a unique engagement experience.",
    tags: [
      {
        name: "#Swift",
        color: "blue-text-gradient",
      },
    ],
    image: bereal,
    source_code_link: "https://github.com/Mustacheeee/BeReal",
  },
];

export { services, technologies, projects, navLinks };
