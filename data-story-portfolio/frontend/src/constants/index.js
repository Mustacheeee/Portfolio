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
import db from "../assets/DB.png";
import np from "../assets/imgdetct.png";
import safelinc from "../assets/safelinc.png";
import menuTranslatorCover from "../assets/menu-translator-cover.png";

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
    name: "SafeLINC",
    description:
      "A HIPAA-compliant mobile platform for therapists and adolescent clients to document sessions, track therapeutic progress, and stay aligned on care goals—with a strong emphasis on early support and suicide prevention for teens.",
    tags: [
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Expo", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
      { name: "AWS Cognito", color: "blue-text-gradient" },
      { name: "AppSync (GraphQL)", color: "green-text-gradient" },
      { name: "Lambda", color: "pink-text-gradient" },
      { name: "Amazon Aurora", color: "blue-text-gradient" },
    ],
    image: safelinc,
  },
  {
    name: "Menu Translator",
    description:
      "A mobile ordering companion that translates real-world menus and guides non-native speakers through browsing and checkout—so travelers can order with confidence abroad.",
    tags: [
      { name: "Flutter", color: "blue-text-gradient" },
      { name: "Dart", color: "green-text-gradient" },
      { name: "Supabase", color: "pink-text-gradient" },
      { name: "PostgreSQL", color: "blue-text-gradient" },
      { name: "OpenAI API (GPT-4o-mini)", color: "green-text-gradient" },
      { name: "Edge Functions", color: "pink-text-gradient" },
      { name: "AWS S3", color: "blue-text-gradient" },
      { name: "Docker", color: "green-text-gradient" },
    ],
    image: menuTranslatorCover,
    demo_video: "/videos/menu-translator-demo.mp4",
  },
  {
    name: "Rock Pet",
    description:
      "A playful web project exploring creative front-end development — interactive pet characters built with vanilla HTML, CSS, and JavaScript.",
    tags: [
      { name: "HTML", color: "blue-text-gradient" },
      { name: "CSS", color: "green-text-gradient" },
      { name: "JavaScript", color: "pink-text-gradient" },
    ],
    image: rockpet,
    source_code_link: "https://github.com/Mustacheeee/Rock-pet",
  },
  {
    name: "BeReal Clone",
    description:
      "A BeReal-inspired iOS app with user authentication, photo sharing, and timed engagement mechanics built natively in Swift.",
    tags: [
      { name: "Swift", color: "blue-text-gradient" },
    ],
    image: bereal,
    source_code_link: "https://github.com/Mustacheeee/BeReal",
  },
  {
    name: "Horror Game",
    description:
      "A first-person horror game featuring custom 3D environments modeled in Blender and scripted gameplay mechanics in Unity.",
    tags: [
      { name: "C#", color: "blue-text-gradient" },
      { name: "Unity", color: "green-text-gradient" },
      { name: "Blender", color: "pink-text-gradient" },
    ],
    image: db,
  },
  {
    name: "Image Filter & Detection",
    description:
      "An image processing pipeline for applying filters and detecting objects using NumPy, scikit-image, and OpenCV.",
    tags: [
      { name: "NumPy", color: "blue-text-gradient" },
      { name: "scikit-image", color: "green-text-gradient" },
      { name: "OpenCV", color: "pink-text-gradient" },
    ],
    image: np,
    source_code_link: "https://github.com/Mustacheeee/img-filtering-practice",
  },
];

export { services, technologies, projects, navLinks };
