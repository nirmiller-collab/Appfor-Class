
import React from 'react';
import { AnimalState } from '../types';

interface Props {
  animal: AnimalState;
  updateAnimal: (updates: Partial<AnimalState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TradeOff: React.FC<Props> = ({ animal, updateAnimal, onNext, onBack }) => {
  const isComplete = animal.tradeOff.length > 10;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
        <span className="text-3xl">⚖️</span> שלב 7: פשרה אבולוציונית
      </h2>
      
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
        <div className="absolute -left-4 top-0 text-8xl opacity-10 select-none pointer-events-none transform rotate-12">
          ⚖️
        </div>
        <p className="text-blue-900 mb-2 font-semibold text-lg italic relative z-10">
          "בטבע אין ארוחות חינם."
        </p>
        <p className="text-blue-800 text-sm relative z-10">
          כל תכונה שעוזרת לחיה לשרוד גובה מחיר מסוים. שריון כבד מגן עליך אך גוזל אנרגיה ומאט אותך. מהירות גבוהה עוזרת לברוח אך דורשת צריכת מזון עצומה.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
          <span className="text-2xl">🔄</span> פשרה אבולוציונית (Trade-off)
        </h3>
        <p className="text-sm text-gray-600 mb-2">איזו תכונה עוזרת לחיה שלך לשרוד, אבל גם מגבילה אותה או יוצרת חיסרון?</p>
        <textarea 
          value={animal.tradeOff}
          onChange={(e) => updateAnimal({ tradeOff: e.target.value })}
          className="w-full p-4 border border-gray-700 rounded-xl h-40 focus:ring-2 focus:ring-indigo-300 outline-none text-lg resize-none shadow-inner bg-gray-800 text-white placeholder-gray-500 transition-colors"
          placeholder="לדוגמה: 'השריון הכבד של החיה מגן עליה מטורפים, אך הוא דורש המון אנרגיה לייצור ומקשה עליה לנוע במהירות כדי להשיג מזון...'"
        />
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>יש להזין לפחות 10 תווים להמשך.</span>
          <span className={isComplete ? 'text-green-500 font-bold' : ''}>
            {animal.tradeOff.length}/10 תווים
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button 
          onClick={onBack} 
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-bold"
        >
          חזור
        </button>
        <button 
          onClick={onNext} 
          disabled={!isComplete}
          className={`px-8 py-2 rounded-lg font-bold text-white transition-all transform active:scale-95 ${isComplete ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          צור ייצוג חזותי (AI)
        </button>
      </div>
    </div>
  );
};

export default TradeOff;
