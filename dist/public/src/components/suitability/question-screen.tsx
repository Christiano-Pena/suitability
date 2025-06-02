import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Question } from '@/lib/suitability-data';

interface QuestionScreenProps {
  question: Question;
  sectionName: string;
  currentQuestionIndex: number;
  totalQuestionsInSection: number;
  totalQuestions: number;
  answers: Record<number, number>;
  onSelect: (qid: number, index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  step: number;
  sections: Record<string, Question[]>;
  sectionNames: string[];
}

export default function QuestionScreen({
  question,
  sectionName,
  currentQuestionIndex,
  totalQuestionsInSection,
  totalQuestions,
  answers,
  onSelect,
  onNext,
  onPrev,
  step,
  sections,
  sectionNames
}: QuestionScreenProps) {
  const isAnswered = answers[question.id] !== undefined;
  
  // Calculate overall question number
  let questionNumber = 0;
  for (let i = 0; i < step; i++) {
    questionNumber += sections[sectionNames[i]].length;
  }
  questionNumber += currentQuestionIndex + 1;

  // Check if it's the last question
  const isLastQuestion = step === sectionNames.length - 1 && 
                         currentQuestionIndex === totalQuestionsInSection - 1;

  // Calculate section progress
  const sectionProgress = ((currentQuestionIndex + 1) / totalQuestionsInSection) * 100;

  return (
    <Card className="shadow-xl border-border/40 overflow-hidden">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Seção: {sectionName}</h2>
            <p className="text-primary-foreground/80">Pergunta {questionNumber} de {totalQuestions}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-foreground/80 mb-1">Progresso da seção</div>
            <div className="w-24 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-foreground progress-bar" 
                style={{ width: `${sectionProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Question Content */}
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold text-foreground mb-8 leading-relaxed">
          {question.text}
        </h3>
        
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === index;
            return (
              <button
                key={index}
                onClick={() => onSelect(question.id, index)}
                className={`option-card w-full border-2 p-4 rounded-xl text-center font-medium transition-all ${
                  isSelected 
                    ? 'option-selected border-primary' 
                    : 'bg-muted/50 hover:bg-muted border-border text-foreground'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!isAnswered}
            className="flex items-center space-x-2"
          >
            <span>{isLastQuestion ? 'Finalizar' : 'Próximo'}</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
