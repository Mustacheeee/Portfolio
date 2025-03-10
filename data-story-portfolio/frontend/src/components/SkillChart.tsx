import { Skill } from "@shared/types";
import { normalizeData } from "@shared/utils";

const SkillChart = ({ skills }: { skills: Skill[] }) => {
  const normalized = normalizeData(skills.map(s => s.proficiency));
  // use normalized 数据渲染图表
};