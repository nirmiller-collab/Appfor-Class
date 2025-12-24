
import React from 'react';

interface Props {
  onNext: () => void;
}

const Introduction: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-5xl mb-4">
        🧬
      </div>
      <h2 className="text-2xl font-bold text-gray-800">ברוכים הבאים למעבדה האבולוציונית</h2>
      <div className="space-y-4 text-lg text-gray-600 max-w-2xl">
        <p>
          דמיינו יצור חי קדמון, פשוט מאוד. אין לו עדיין תכונות מיוחדות, מלבד היכולת הבסיסית להתרבות.
        </p>
        <p className="font-semibold text-indigo-700">
          הסביבה משתנה – ועליכם לבחור איך הוא ישרוד.
        </p>
        <p>
          במהלך הפעילות, תקבלו החלטות שיעצבו את המין החדש שלכם. כל בחירה פותחת הזדמנויות אך גם מציבה מגבלות.
        </p>
      </div>
      <button
        onClick={onNext}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
      >
        מתחילים במסע
      </button>
    </div>
  );
};

export default Introduction;
