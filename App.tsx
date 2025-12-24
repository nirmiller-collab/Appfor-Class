
import React, { useState, useEffect } from 'react';
import { Stage, AnimalState } from './types';
import { EVOLUTIONARY_DATA } from './constants';
import Introduction from './components/Introduction';
import DecisionNode from './components/DecisionNode';
import Synthesis from './components/Synthesis';
import TradeOff from './components/TradeOff';
import VisualOutput from './components/VisualOutput';
import Reflection from './components/Reflection';

const STORAGE_KEY_ANIMAL = 'evolution_animal_state_v5';
const STORAGE_KEY_STAGE = 'evolution_current_stage_v5';

const DEFAULT_ANIMAL: AnimalState = {
  energySource: '',
  habitat: '',
  subHabitat: '',
  movement: '',
  bodyPlan: '',
  bodyPlanJustification: '',
  defense: [],
  reproduction: '',
  name: '',
  description: '',
  structuralAdaptation: '',
  structuralNeed: '',
  physiologicalAdaptation: '',
  behavioralAdaptation: '',
  tradeOff: '',
  imageUrl: '',
  aiFeedback: '',
};

const App: React.FC = () => {
  // Persistence Initialization
  const [stage, setStage] = useState<Stage>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STAGE);
    return saved ? (parseInt(saved, 10) as Stage) : Stage.Intro;
  });

  const [animal, setAnimal] = useState<AnimalState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ANIMAL);
    try {
      return saved ? JSON.parse(saved) : DEFAULT_ANIMAL;
    } catch (e) {
      console.warn("Failed to parse saved animal state, reverting to default.");
      return DEFAULT_ANIMAL;
    }
  });

  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // Persistence Synchronizers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANIMAL, JSON.stringify(animal));
  }, [animal]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STAGE, stage.toString());
  }, [stage]);

  const nextStage = () => setStage((prev) => prev + 1);
  const prevStage = () => setStage((prev) => Math.max(0, prev - 1));
  const goToStage = (target: Stage) => {
    if (target < stage) {
      setStage(target);
      setIsSummaryExpanded(false);
    }
  };

  const updateAnimal = (updates: Partial<AnimalState>) => {
    setAnimal((prev) => ({ ...prev, ...updates }));
  };

  const handleRestart = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתחיל מחדש? כל ההתקדמות תימחק.')) {
      localStorage.removeItem(STORAGE_KEY_ANIMAL);
      localStorage.removeItem(STORAGE_KEY_STAGE);
      setAnimal(DEFAULT_ANIMAL);
      setStage(Stage.Intro);
    }
  };

  const getSelectionInfo = (targetStage: Stage) => {
    switch (targetStage) {
      case Stage.EnergySource:
        return EVOLUTIONARY_DATA.energySources.find(s => s.id === animal.energySource);
      case Stage.Habitat:
        return EVOLUTIONARY_DATA.habitats.find(h => h.id === animal.habitat);
      case Stage.SubHabitat:
        return EVOLUTIONARY_DATA.subHabitats[animal.habitat || '']?.find(sh => sh.id === animal.subHabitat);
      case Stage.Movement:
        return EVOLUTIONARY_DATA.movements.find(m => m.id === animal.movement);
      case Stage.BodyPlan:
        return EVOLUTIONARY_DATA.bodyPlans.find(bp => bp.id === animal.bodyPlan);
      case Stage.Reproduction:
        return EVOLUTIONARY_DATA.reproductionStrategies.find(r => r.id === animal.reproduction);
      default:
        return null;
    }
  };

  const summaryItem = (label: string, targetStage: Stage, icon?: string, value?: string) => {
    const isClickable = stage > targetStage;
    return (
      <button 
        onClick={() => goToStage(targetStage)}
        disabled={!isClickable}
        className={`flex flex-col items-center justify-between p-3 rounded-2xl border-2 transition-all duration-300 group ${
          isClickable 
            ? 'bg-white border-indigo-100 hover:border-indigo-500 hover:shadow-lg cursor-pointer text-indigo-900' 
            : 'bg-gray-50 border-gray-100 opacity-50 cursor-default text-gray-400'
        } min-w-[90px] aspect-square md:aspect-auto md:min-h-[110px]`}
      >
        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-wider mb-1 group-hover:text-indigo-600 transition-colors">{label}</div>
        <div className="text-3xl mb-1 transform group-hover:scale-110 transition-transform">{icon || '❓'}</div>
        <div className="text-[11px] font-bold truncate w-full text-center leading-tight h-8 flex items-center justify-center px-1">
          {value || <span className="text-gray-300 font-normal italic">טרם נבחר</span>}
        </div>
        {isClickable && (
          <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">
            עריכה
          </div>
        )}
      </button>
    );
  };

  const summary = stage > Stage.Intro && stage < Stage.Reflection && (
    <div className={`sticky top-0 z-50 mb-8 transition-all duration-500 ${isSummaryExpanded ? 'scale-100 opacity-100' : ''}`}>
      {!isSummaryExpanded ? (
        <div className="flex justify-center -mt-4 mb-4">
          <button 
            onClick={() => setIsSummaryExpanded(true)}
            className="group flex items-center gap-4 bg-white/80 backdrop-blur-md border border-indigo-100 hover:border-indigo-300 px-6 py-3 rounded-2xl text-indigo-900 transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-xl">🧬</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-black text-sm uppercase tracking-tight text-right w-full">המסלול האבולוציוני שלך</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex -space-x-2 space-x-reverse">
                  {[Stage.EnergySource, Stage.Habitat, Stage.SubHabitat, Stage.Movement, Stage.BodyPlan, Stage.Defense, Stage.Reproduction].map((s) => {
                    const info = s === Stage.Defense ? (animal.defense.length > 0 ? { icon: '🛡️' } : null) : getSelectionInfo(s);
                    return info && (
                      <div key={s} className="w-7 h-7 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center text-xs shadow-sm z-10">
                        {info.icon}
                      </div>
                    );
                  })}
                </div>
                <span className="text-[10px] font-bold text-indigo-400 mr-2 group-hover:text-indigo-600 transition-colors">לחצו לצפייה בפרטים ←</span>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="w-full bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl border-2 border-indigo-100 p-6 animate-stage-enter">
          <div className="flex justify-between items-center mb-6 border-b border-indigo-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-black text-indigo-950 text-xl tracking-tight leading-none">תמונת מצב אבולוציונית</h3>
                <p className="text-indigo-400 text-xs font-bold mt-1 uppercase tracking-widest">לחצו על תיבה כדי לחזור ולשנות בחירה</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSummaryExpanded(false)}
              className="group p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100"
              title="סגור סיכום"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {summaryItem('מקור אנרגיה', Stage.EnergySource, getSelectionInfo(Stage.EnergySource)?.icon, getSelectionInfo(Stage.EnergySource)?.label)}
            {summaryItem('סביבת מחייה', Stage.Habitat, getSelectionInfo(Stage.Habitat)?.icon, getSelectionInfo(Stage.Habitat)?.label)}
            {summaryItem('אזור מחייה', Stage.SubHabitat, getSelectionInfo(Stage.SubHabitat)?.icon, getSelectionInfo(Stage.SubHabitat)?.label)}
            {summaryItem('צורת תנועה', Stage.Movement, getSelectionInfo(Stage.Movement)?.icon, getSelectionInfo(Stage.Movement)?.label)}
            {summaryItem('מבנה גוף', Stage.BodyPlan, getSelectionInfo(Stage.BodyPlan)?.icon, getSelectionInfo(Stage.BodyPlan)?.label)}
            {summaryItem('מנגנוני הגנה', Stage.Defense, animal.defense.length > 0 ? '🛡️' : undefined, animal.defense.length > 0 ? `${animal.defense.length} מנגנונים` : undefined)}
            {summaryItem('שיטת רבייה', Stage.Reproduction, getSelectionInfo(Stage.Reproduction)?.icon, getSelectionInfo(Stage.Reproduction)?.label)}
          </div>
          
          <div className="mt-6 pt-4 border-t border-indigo-50 flex justify-center">
             <div className="bg-indigo-50 px-4 py-2 rounded-full flex items-center gap-2">
               <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
               <span className="text-[11px] font-black text-indigo-700 uppercase">החלטותיכם מעצבות את היצור בכל רגע</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStage = () => {
    switch (stage) {
      case Stage.Intro:
        return <Introduction onNext={nextStage} />;
      
      case Stage.EnergySource:
        return (
          <DecisionNode
            title="שלב 1: מקור אנרגיה"
            options={EVOLUTIONARY_DATA.energySources}
            selectedValue={animal.energySource}
            onSelect={(val) => updateAnimal({ energySource: val })}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
          />
        );

      case Stage.Habitat:
        return (
          <DecisionNode
            title="שלב 2: סביבת מחייה"
            options={EVOLUTIONARY_DATA.habitats}
            selectedValue={animal.habitat}
            onSelect={(val) => {
              updateAnimal({ habitat: val, subHabitat: '', movement: '' });
            }}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
            renderDetails={(choice) => (
              <div className="mt-2 text-sm">
                <p className="font-bold text-right">אתגרים:</p>
                <ul className="list-disc list-inside mb-1 text-right">
                  {choice.challenges?.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            )}
          />
        );

      case Stage.SubHabitat:
        return (
          <DecisionNode
            title={`שלב 2.5: בחירת ${EVOLUTIONARY_DATA.habitats.find(h => h.id === animal.habitat)?.label} ספציפי`}
            options={EVOLUTIONARY_DATA.subHabitats[animal.habitat || ''] || []}
            selectedValue={animal.subHabitat}
            onSelect={(val) => updateAnimal({ subHabitat: val })}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
          />
        );

      case Stage.Movement:
        const filteredMovements = EVOLUTIONARY_DATA.movements.filter(m => {
          if (animal.habitat === 'ocean' || animal.habitat === 'freshwater') {
            return !['walk_stable', 'run_fast', 'jump', 'land_crawl', 'climb', 'dual_land_air'].includes(m.id);
          }
          if (animal.habitat === 'land') {
            return !['swim_fins', 'swim_undulatory', 'float_currents', 'dual_water_air'].includes(m.id);
          }
          return true;
        });

        return (
          <DecisionNode
            title="שלב 3: צורת תנועה (Locomotion)"
            options={filteredMovements}
            selectedValue={animal.movement}
            onSelect={(val) => updateAnimal({ movement: val })}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
          />
        );

      case Stage.BodyPlan:
        return (
          <DecisionNode
            title="שלב 3.5: מבנה גוף (Body Plan)"
            options={EVOLUTIONARY_DATA.bodyPlans}
            selectedValue={animal.bodyPlan}
            onSelect={(val) => updateAnimal({ bodyPlan: val })}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
          />
        );

      case Stage.Defense:
        return (
          <DecisionNode
            title="שלב 4: מנגנוני הגנה (עד 2)"
            options={EVOLUTIONARY_DATA.defenseMechanisms}
            multiSelect
            selectedValues={animal.defense}
            onSelectMulti={(vals) => updateAnimal({ defense: vals })}
            maxSelect={2}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
          />
        );

      case Stage.Reproduction:
        return (
          <DecisionNode
            title="שלב 5: אסטרטגיית רבייה"
            options={EVOLUTIONARY_DATA.reproductionStrategies}
            selectedValue={animal.reproduction}
            onSelect={(val) => updateAnimal({ reproduction: val })}
            onNext={nextStage}
            onBack={prevStage}
            summary={summary}
          />
        );

      case Stage.Synthesis:
        return (
          <div className="space-y-4">
            {summary}
            <Synthesis animal={animal} updateAnimal={updateAnimal} onNext={nextStage} onBack={prevStage} />
          </div>
        );

      case Stage.TradeOff:
        return (
          <div className="space-y-4">
            {summary}
            <TradeOff animal={animal} updateAnimal={updateAnimal} onNext={nextStage} onBack={prevStage} />
          </div>
        );

      case Stage.VisualOutput:
        return (
          <div className="space-y-4">
            {summary}
            <VisualOutput animal={animal} updateAnimal={updateAnimal} onNext={nextStage} onBack={prevStage} />
          </div>
        );

      case Stage.Reflection:
        return <Reflection onRestart={handleRestart} onBack={prevStage} evaluation={animal.evaluation} />;

      default:
        return <div>שגיאה בטעינת השלב.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">החיה החדשה שלי</h1>
        <p className="text-indigo-600 font-medium">התהליך האבולוציוני שלך</p>
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-500" 
            style={{ width: `${(stage / Stage.Reflection) * 100}%` }}
          ></div>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10 relative overflow-hidden">
        <div key={stage} className="animate-stage-enter">
          {renderStage()}
        </div>
      </main>

      <footer className="mt-12 text-gray-500 text-sm">
        נוצר למטרות למידה | כיתה י'
      </footer>
    </div>
  );
};

export default App;
