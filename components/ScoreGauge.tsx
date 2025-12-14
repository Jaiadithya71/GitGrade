import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const data = [{ name: 'score', value: score, fill: '#f59e0b' }]; // Amber-500
  
  let gradeColor = 'text-red-500';
  if (score >= 50) gradeColor = 'text-yellow-500';
  if (score >= 80) gradeColor = 'text-green-500';

  return (
    <div className="relative w-48 h-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="50%" 
          innerRadius="70%" 
          outerRadius="90%" 
          barSize={15} 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill="#f59e0b"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-4xl font-bold ${gradeColor}`}>{score}</span>
        <span className="text-slate-500 text-sm font-medium">/ 100</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
