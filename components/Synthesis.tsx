
import React from 'react';
import { AnimalState } from '../types';
import { EVOLUTIONARY_DATA } from '../constants';

interface Props {
  animal: AnimalState;
  updateAnimal: (updates: Partial<AnimalState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Synthesis: React.FC<Props> = ({ animal, updateAnimal, onNext, onBack }) => {
  const isComplete = animal.name && 
                     animal.description && 
                     animal.structuralAdaptation && 
                     animal.structuralNeed && 
                     animal.physiologicalAdaptation && 
                     animal.behavioralAdaptation &&
                     animal.bodyPlanJustification;

  const selectedBodyPlan = EVOLUTIONARY_DATA.bodyPlans.find(bp => bp.id === animal.bodyPlan);
  const selectedBodyPlanLabel = selectedBodyPlan?.label || 'לא נבחר';
  const selectedBodyPlanIcon = selectedBodyPlan?.icon || '🦴';

  const inputStyles = "w-full p-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none bg-gray-800 text-white placeholder-gray-500 transition-colors";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
        <span className="text-3xl">🏗️</span> שלב 6: בניית החיה
      </h2>
      
      <p className="text-gray-600">עכשיו כשהחלטתם על המאפיינים העיקריים, הגיע הזמן לתת לחיה שלכם זהות והצדקה מדעית.</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-bold mb-1 text-indigo-900 flex items-center gap-2">
              <span>🏷️</span> שם המין:
            </label>
            <input 
              type="text" 
              value={animal.name}
              onChange={(e) => updateAnimal({ name: e.target.value })}
              className={`${inputStyles} text-lg font-semibold`}
              placeholder="למשל: זחלן-ביצות מצוי"
            />
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-1 border-r-4 border-indigo-500 pr-2 flex items-center gap-2">
              <span>📝</span> תיאור החיה
            </h3>
            <p className="text-xs text-gray-500 mb-2">איך היא נראית? איך היא נעה ומשיגה מזון?</p>
            <textarea 
              value={animal.description}
              onChange={(e) => updateAnimal({ description: e.target.value })}
              className={`${inputStyles} h-24 resize-none`}
              placeholder="תארו כאן את המראה הכללי של החיה בסביבתה..."
            />
          </div>

          <div className="md:col-span-2 bg-indigo-50 p-4 rounded-xl border border-indigo-100 relative overflow-hidden">
            <div className="absolute left-4 bottom-2 text-6xl opacity-10 select-none pointer-events-none">
              {selectedBodyPlanIcon}
            </div>
            <h3 className="font-bold text-lg mb-1 border-r-4 border-indigo-500 pr-2 flex items-center gap-2 relative z-10">
              <span>{selectedBodyPlanIcon}</span> מבנה גוף נבחר: {selectedBodyPlanLabel}
            </h3>
            <p className="text-xs text-gray-500 mb-2 relative z-10">למה מבנה גוף זה מתאים למסלול שבחרת?</p>
            <textarea 
              value={animal.bodyPlanJustification}
              onChange={(e) => updateAnimal({ bodyPlanJustification: e.target.value })}
              className={`${inputStyles} h-20 relative z-10 resize-none`}
              placeholder="הסבירו את הקשר בין מבנה הגוף לסביבה ולתנועה..."
            />
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-1 border-r-4 border-orange-500 pr-2 flex items-center gap-2">
                <span>🦴</span> התאמה מבנית
              </h3>
              <p className="text-xs text-gray-500 mb-2">איבר או מבנה גוף ספציפי (למשל: סנפירים, פרווה)</p>
              <input 
                type="text" 
                value={animal.structuralAdaptation}
                onChange={(e) => updateAnimal({ structuralAdaptation: e.target.value })}
                className={inputStyles}
                placeholder="השינוי המבני..."
              />
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2 font-bold">לאיזה צורך סביבתי זה עונה?</p>
                <input 
                  type="text" 
                  value={animal.structuralNeed}
                  onChange={(e) => updateAnimal({ structuralNeed: e.target.value })}
                  className={inputStyles}
                  placeholder="הצורך הסביבתי..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-1 border-r-4 border-green-500 pr-2 flex items-center gap-2">
                <span>🧪</span> התאמה פיזיולוגית
              </h3>
              <p className="text-xs text-gray-500 mb-2">תהליך פנימי או כימי (למשל: ייצור רעל)</p>
              <input 
                type="text" 
                value={animal.physiologicalAdaptation}
                onChange={(e) => updateAnimal({ physiologicalAdaptation: e.target.value })}
                className={inputStyles}
                placeholder="התהליך הפנימי..."
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-1 border-r-4 border-blue-500 pr-2 flex items-center gap-2">
                <span>🧠</span> התאמה התנהגותית
              </h3>
              <p className="text-xs text-gray-500 mb-2">פעולה או הרגל (למשל: פעילות לילה)</p>
              <input 
                type="text" 
                value={animal.behavioralAdaptation}
                onChange={(e) => updateAnimal({ behavioralAdaptation: e.target.value })}
                className={inputStyles}
                placeholder="ההתנהגות המיוחדת..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t mt-4">
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
          המשך לפשרה האבולוציונית
        </button>
      </div>
    </div>
  );
};

export default Synthesis;
