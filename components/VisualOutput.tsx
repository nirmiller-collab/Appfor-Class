
import React, { useState, useEffect, useRef } from 'react';
import { AnimalState } from '../types';
import { generateAnimalImage, getEvolutionaryFeedback } from '../services/geminiService';

interface Props {
  animal: AnimalState;
  updateAnimal: (updates: Partial<AnimalState>) => void;
  onNext: () => void;
  onBack: () => void;
}

declare var html2canvas: any;
declare var jspdf: any;

const VisualOutput: React.FC<Props> = ({ animal, updateAnimal, onNext, onBack }) => {
  const [loading, setLoading] = useState(!animal.imageUrl || !animal.evaluation);
  const [isSaving, setIsSaving] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAIContent = async () => {
      if (animal.imageUrl && animal.evaluation) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [imgUrl, evaluationData] = await Promise.all([
          generateAnimalImage(animal),
          getEvolutionaryFeedback(animal)
        ]);
        
        updateAnimal({
          imageUrl: imgUrl || undefined,
          evaluation: evaluationData || undefined
        });
      } catch (err) {
        console.error("AI Generation failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAIContent();
  }, []);

  const handleSaveAsPDF = async () => {
    if (!reportRef.current || isSaving) return;
    setIsSaving(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      
      // Calculate dimensions to maintain aspect ratio in PDF
      const imgProps = {
        width: canvas.width,
        height: canvas.height
      };
      
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Evolution_Report_${animal.name || 'Creature'}.pdf`);
    } catch (err) {
      console.error("Failed to save PDF", err);
      alert("חלה שגיאה בשמירת ה-PDF. נסה שוב או השתמש בצילום מסך.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAsImage = async () => {
    if (!reportRef.current || isSaving) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `Evolution_Report_${animal.name || 'Creature'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Failed to save image", err);
      alert("חלה שגיאה בשמירת התמונה.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerate = () => {
    if (window.confirm('האם ליצור מחדש את ההערכה והתמונה?')) {
      updateAnimal({ imageUrl: '', evaluation: undefined });
      setLoading(true);
      window.location.reload(); 
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'מצוין': return 'text-green-600 bg-green-50 border-green-200';
      case 'טוב': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'בסיסי': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'חסר': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 w-full text-right flex items-center justify-between">
        <span>שלב 8: תוצר חזותי ורובריקת הערכה</span>
        {!loading && (
          <div className="flex gap-2">
            <button 
              onClick={handleSaveAsPDF}
              disabled={isSaving}
              className={`flex items-center gap-2 text-xs px-4 py-1.5 rounded-full transition-all font-bold shadow-sm ${isSaving ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              {isSaving ? 'מעבד...' : '📄 שמור כ-PDF'}
            </button>
            <button 
              onClick={handleSaveAsImage}
              disabled={isSaving}
              className={`flex items-center gap-2 text-xs px-4 py-1.5 rounded-full transition-all font-bold shadow-sm ${isSaving ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
            >
              {isSaving ? 'מעבד...' : '🖼️ שמור כתמונה'}
            </button>
            <button 
              onClick={handleRegenerate}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-gray-600 transition font-bold"
            >
              🔄 יצירה מחדש
            </button>
          </div>
        )}
      </h2>

      {!loading && (
        <div className="w-full bg-indigo-50 border-r-4 border-indigo-500 p-4 animate-stage-enter shadow-sm flex items-center gap-3">
          <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
            <span className="text-lg">📋</span>
          </div>
          <p className="text-indigo-950 font-bold text-lg">שמרו את התוצר ושלחו את הקובץ שנוצר למורה.</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-6 w-full">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🧬</div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-indigo-600 font-bold text-xl animate-pulse">ה-AI מעריך את האבולוציה...</p>
            <p className="text-gray-500 text-sm">אנחנו מנתחים את ההתאמות וההיגיון הביולוגי של היצור שלך.</p>
          </div>
        </div>
      ) : (
        <div className="w-full space-y-8 animate-fade-in">
          {/* This container will be captured by html2canvas */}
          <div ref={reportRef} className="bg-white p-8 rounded-3xl border-2 border-indigo-50 shadow-sm overflow-hidden">
            <div className="flex justify-between items-start border-b-2 border-indigo-100 pb-6 mb-6">
              <div>
                <h1 className="text-3xl font-black text-indigo-900">{animal.name}</h1>
                <p className="text-indigo-500 font-bold">תעודת זהות אבולוציונית</p>
              </div>
              <div className="text-left text-xs text-gray-400 font-mono">
                GENERATED BY EVOLUTION LAB v5.0<br/>
                {new Date().toLocaleDateString('he-IL')}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-100 p-2">
                {animal.imageUrl ? (
                  <img 
                    src={animal.imageUrl} 
                    alt={animal.name} 
                    className="w-full h-auto rounded-xl shadow-inner" 
                    crossOrigin="anonymous" 
                  />
                ) : (
                  <div className="h-64 bg-gray-100 flex flex-col items-center justify-center text-gray-400 italic space-y-2">
                    <span className="text-4xl">🖼️</span>
                    <span>הדמיה חזותית לא זמינה</span>
                  </div>
                )}
                <div className="p-4 bg-indigo-50 text-right">
                  <h3 className="text-lg font-bold text-indigo-900 mb-1">תיאור המין</h3>
                  <p className="text-indigo-700 text-sm leading-relaxed">{animal.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="bg-indigo-900 text-white p-5 rounded-xl shadow-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-2 opacity-20 text-4xl">📊</div>
                    <h3 className="text-lg font-bold mb-1">דירוג חשיבה אבולוציונית</h3>
                    <div className="text-2xl font-black text-indigo-200">{animal.evaluation?.summaryCategory}</div>
                    <p className="text-sm mt-2 text-indigo-100 italic">"{animal.evaluation?.generalFeedback}"</p>
                 </div>

                 <div className="grid grid-cols-1 gap-3">
                   {animal.evaluation?.scores.map((score, idx) => (
                     <div key={idx} className={`p-3 rounded-lg border flex flex-col gap-1 transition-all hover:shadow-sm ${getLevelColor(score.level)}`}>
                       <div className="flex justify-between items-center">
                         <span className="font-bold text-sm">{score.criterion}</span>
                         <span className="text-xs font-black uppercase px-2 py-0.5 rounded-full border border-current">{score.level}</span>
                       </div>
                       <p className="text-xs opacity-90">{score.feedback}</p>
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h4 className="font-bold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2">
                <span>🧬</span> ניתוח מורפולוגי של {animal.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-lg border shadow-sm">
                  <div className="text-xs text-gray-500 font-bold mb-1">התאמה מבנית</div>
                  <div className="text-sm text-gray-800">{animal.structuralAdaptation}</div>
                  <div className="text-[10px] text-indigo-600 mt-1">צורך: {animal.structuralNeed}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border shadow-sm">
                  <div className="text-xs text-gray-500 font-bold mb-1">התאמה פיזיולוגית</div>
                  <div className="text-sm text-gray-800">{animal.physiologicalAdaptation}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border shadow-sm">
                  <div className="text-xs text-gray-500 font-bold mb-1">התאמה התנהגותית</div>
                  <div className="text-sm text-gray-800">{animal.behavioralAdaptation}</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 md:col-span-3">
                  <div className="text-xs text-orange-700 font-bold mb-1">פשרה אבולוציונית (Trade-off)</div>
                  <div className="text-sm text-orange-900 italic font-medium">"{animal.tradeOff}"</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4 text-[10px] font-bold text-indigo-300 uppercase tracking-widest border-t pt-4">
              <span>Evolution Lab</span>
              <span>•</span>
              <span>10th Grade Biology</span>
              <span>•</span>
              <span>Interactive Learning</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 w-full border-t mt-4 no-print">
        <button 
          onClick={onBack} 
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-bold flex items-center gap-2"
        >
          <span>⬅️</span> חזור לשינוי בחירות
        </button>
        <button 
          onClick={onNext} 
          disabled={loading}
          className={`px-8 py-2 rounded-lg font-bold text-white transition-all transform active:scale-95 flex items-center gap-2 ${!loading ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          סיום ורפלקציה <span>🏁</span>
        </button>
      </div>
    </div>
  );
};

export default VisualOutput;
