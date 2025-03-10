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

  const data = {
    labels: skills.map((s) => s.name),
    datasets: [{
      label: 'Proficiency',
      data: skills.map((s) => s.proficiency),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
    }]
  };

  return <Radar data={data} />;
};

export default SkillChart;