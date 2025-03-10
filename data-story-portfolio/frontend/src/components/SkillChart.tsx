import { Radar } from 'react-chartjs-2';
import { Skill } from '@shared/types';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillChart = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetch('/mock_skills.json')
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  // May remove the career advice feature
  // const handleGetAdvice = async (skill: string) => {
  //   const response = await fetch(`/api/advice?skill=${skill}`);
  //   const advice = await response.text();
  //   alert(advice);
  // };
  

  const data = {
    labels: skills.map((s) => s.name),
    datasets: [{
      label: 'Proficiency',
      data: skills.map((s) => s.proficiency),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    }]
  };

  return (
    <div>
      <Radar data={data} />;
      {/* <button onClick={() => handleGetAdvice(skill.name)}>Get Advice</button> */}
    </div>
  );

};

export default SkillChart;

