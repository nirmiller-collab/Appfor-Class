
import React from 'react';
import { Evaluation } from '../types';

interface Props {
  onRestart: () => void;
  onBack: () => void;
  evaluation?: Evaluation;
}

const Reflection: React.FC<Props> = ({ onRestart, onBack, evaluation }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
        <span className="text-3xl">🎓</span> סיכום ורפלקציה
      </h2>
      
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl animate-bounce">🏆</span>
          <p className="text-xl text-indigo-900 font-bold text-center">מזל טוב! השלמתם את המסלול האבולוציוני של החיה החדשה שלכם.</p>
          {evaluation && (
            <div className="mt-2 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-full font-black text-indigo-800 shadow-sm animate-pulse">
              רמת ביצוע: {evaluation.summaryCategory}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <span className="absolute -right-2 -bottom-2 text-5xl opacity-5 group-hover:opacity-10 transition-opacity">⚡</span>
            <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-1">
              <span>⚡</span> הגורם המשפיע
            </h4>
            <p className="text-sm text-gray-600">איזה שלב במסלול הכי השפיע על איך שהחיה נראית ומתפקדת? מדוע?</p>
          </div>
          <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <span className="absolute -right-2 -bottom-2 text-5xl opacity-5 group-hover:opacity-10 transition-opacity">🌡️</span>
            <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-1">
              <span>🌡️</span> שינוי סביבתי
            </h4>
            <p className="text-sm text-gray-600">מה היה קורה לחיה שלכם אם הסביבה הייתה משתנה בפתאומיות?</p>
          </div>
          <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <span className="absolute -right-2 -bottom-2 text-5xl opacity-5 group-hover:opacity-10 transition-opacity">🧬</span>
            <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-1">
              <span>🧬</span> ברירה טבעית
            </h4>
            <p className="text-sm text-gray-600">האם אתם חושבים שחיה "טובה יותר" תמיד שורדת, או רק חיה ש"מתאימה יותר"?</p>
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-inner">
          <div className="absolute right-0 bottom-0 text-9xl opacity-10 select-none pointer-events-none transform translate-x-10 translate-y-10">
            🦁
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>🔬</span> זכרו את עקרונות האבולוציה:
          </h3>
          <ul className="space-y-3 relative z-10">
            <li className="flex gap-3">
              <span className="text-indigo-300">●</span>
              <span>אין לחיה "כוונה" או "רצון" להתפתח – הסביבה היא שבוררת את המתאימים ביותר.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-300">●</span>
              <span>כל תכונה היא תוצאה של לחץ סביבתי וברירה טבעית.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-300">●</span>
              <span>אין "יצור מושלם" – יש רק התאמה מיטבית לנסיבות קיימות, תמיד במחיר של פשרה.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 pt-8 border-t">
        <div className="flex gap-4">
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg"
          >
            <span>👁️</span> צפה שוב בחיה
          </button>
          <button 
            onClick={onRestart}
            className="px-10 py-3 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3"
          >
            <span>🔄</span> צור חיה חדשה
          </button>
        </div>
        <p className="text-gray-400 text-xs text-center">שימו לב: התחלת חיה חדשה תמחוק את היצור הנוכחי מהזיכרון המקומי.</p>
      </div>
    </div>
  );
};

export default Reflection;
