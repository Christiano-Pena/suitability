import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from '@/components/suitability/welcome-screen';
import QuestionScreen from '@/components/suitability/question-screen';
import ResultsScreen from '@/components/suitability/results-screen';
import { questions, calculateProfile, groupQuestionsBySection } from '@/lib/suitability-data';
import topoCapitalLogo from '@assets/TP_CAPITAL_AZUL+Degrade-Dourado.png';

const pageVariants = {
  initial: { opacity: 0, x: "100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100vw" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export default function SuitabilityPage() {
  const [step, setStep] = useState(-1); // -1: welcome, 0-2: sections, 3: results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const sections = groupQuestionsBySection();
  const sectionNames = Object.keys(sections);
  const totalSections = sectionNames.length;
  const currentSectionQuestions = sections[sectionNames[step]] || [];
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  const handleSelect = (qid: number, index: number) => {
    setAnswers({ ...answers, [qid]: index });
  };

  const calculateProfileResult = () => {
    const profileType = calculateProfile(answers);
    setResult(profileType);
    setStep(totalSections);
  };

  const nextStep = () => {
    if (currentQuestion && answers[currentQuestion.id] === undefined) {
      return;
    }

    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (step < totalSections - 1) {
      setCurrentQuestionIndex(0);
      setStep(step + 1);
    } else if (step === totalSections - 1) {
      calculateProfileResult();
    }
  };

  const prevStep = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (step > 0) {
      const prevSectionQuestions = sections[sectionNames[step - 1]];
      setCurrentQuestionIndex(prevSectionQuestions.length - 1);
      setStep(step - 1);
    } else if (step === 0 && currentQuestionIndex === 0) {
      setStep(-1);
    }
  };

  const resetQuiz = () => {
    setStep(-1);
    setAnswers({});
    setResult(null);
    setCurrentQuestionIndex(0);
  };

  const totalQuestions = questions.length;
  const answeredQuestionsCount = Object.keys(answers).length;
  const overallProgressPercentage = (answeredQuestionsCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900 font-inter flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Topo Capital logo */}
          <div className="flex items-center">
            <img 
              src={topoCapitalLogo} 
              alt="Topo Capital" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Progress indicator */}
          {step >= 0 && step < totalSections && (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm text-muted-foreground font-medium">
                {Math.round(overallProgressPercentage)}% concluído
              </span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 progress-bar" 
                  style={{ width: `${overallProgressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === -1 && (
              <motion.div
                key="welcome"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <WelcomeScreen onStart={() => setStep(0)} />
              </motion.div>
            )}

            {step >= 0 && step < totalSections && currentQuestion && (
              <motion.div
                key={`question-${step}-${currentQuestionIndex}`}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <QuestionScreen
                  question={currentQuestion}
                  sectionName={sectionNames[step]}
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestionsInSection={currentSectionQuestions.length}
                  totalQuestions={totalQuestions}
                  answers={answers}
                  onSelect={handleSelect}
                  onNext={nextStep}
                  onPrev={prevStep}
                  step={step}
                  sections={sections}
                  sectionNames={sectionNames}
                />
              </motion.div>
            )}

            {step === totalSections && result && (
              <motion.div
                key="results"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <ResultsScreen
                  profileType={result}
                  onRestart={resetQuiz}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
