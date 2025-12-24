
import React, { useState, useEffect } from 'react';
import { Choice } from '../types';

interface Props {
  title: string;
  options: Choice[];
  selectedValue?: string;
  selectedValues?: string[];
  onSelect?: (val: string) => void;
  onSelectMulti?: (vals: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  multiSelect?: boolean;
  maxSelect?: number;
  renderDetails?: (choice: Choice) => React.ReactNode;
  summary?: React.ReactNode;
}

const DecisionNode: React.FC<Props> = ({
  title,
  options,
  selectedValue,
  selectedValues,
  onSelect,
  onSelectMulti,
  onNext,
  onBack,
  multiSelect,
  maxSelect,
  renderDetails,
  summary
}) => {
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const canGoNext = multiSelect ? (selectedValues?.length || 0) > 0 : !!selectedValue;

  const handleToggle = (id: string, e: React.MouseEvent) => {
    const isBecomingSelected = multiSelect 
      ? !selectedValues?.includes(id) 
      : selectedValue !== id;

    if (isBecomingSelected) {
      setAnimatingId(id);
      // Create simple particles at click location
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      }));
      setParticles(prev => [...prev, ...newParticles]);
      
      // Cleanup particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 800);

      // Reset animation class
      setTimeout(() => setAnimatingId(null), 400);
    }

    if (multiSelect && onSelectMulti && selectedValues) {
      if (selectedValues.includes(id)) {
        onSelectMulti(selectedValues.filter(v => v !== id));
      } else if (!maxSelect || selectedValues.length < maxSelect) {
        onSelectMulti([...selectedValues, id]);
      }
    } else if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div className="space-y-6">
      {summary}

      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = multiSelect 
            ? selectedValues?.includes(option.id)
            : selectedValue === option.id;
          
          const isAnimating = animatingId === option.id;

          return (
            <button
              key={option.id}
              onClick={(e) => handleToggle(option.id, e)}
              className={`p-4 rounded-xl border-2 text-right transition-all duration-300 h-full flex flex-col relative overflow-hidden group ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-indigo-300'
              } ${isAnimating ? 'animate-selection-pop' : ''}`}
            >
              {/* Particle Container */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {particles.map(p => (
                  <div 
                    key={p.id} 
                    className="particle w-2 h-2" 
                    style={{ left: p.x, top: p.y }}
                  />
                ))}
              </div>

              {option.icon && (
                <div className="absolute -left-2 -top-2 text-5xl opacity-10 select-none pointer-events-none transform -rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-0">
                  {option.icon}
                </div>
              )}

              <div className="flex justify-between items-center mb-1 relative z-10">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>
                    {option.icon && <span className="text-2xl">{option.icon}</span>}
                  </div>
                  <span className="font-bold text-lg">{option.label}</span>
                </div>
                {isSelected && (
                  <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
                    ✓
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm flex-grow relative z-10">{option.description}</p>
              
              {isSelected && renderDetails && (
                <div className="relative z-10 animate-fade-in">
                  {renderDetails(option)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button 
          onClick={onBack} 
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-bold flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">חזור</span>
        </button>
        <button 
          onClick={onNext} 
          disabled={!canGoNext}
          className={`px-8 py-2 rounded-lg font-bold text-white transition-all transform active:scale-95 ${canGoNext ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          המשך
        </button>
      </div>
    </div>
  );
};

export default DecisionNode;
