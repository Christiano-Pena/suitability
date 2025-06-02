import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Play, Target, GraduationCap, Scale } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <Card className="card-hover shadow-xl border-border/40">
      <CardContent className="p-12 text-center space-y-8">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto flex items-center justify-center">
            <PieChart className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-primary">Análise de Suitability</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubra qual portfólio de investimentos é mais adequado para seu perfil respondendo algumas perguntas estratégicas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 my-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
            <GraduationCap className="text-primary mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-foreground mb-2">Experiência</h3>
            <p className="text-sm text-muted-foreground">Avaliamos seu conhecimento em investimentos</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
            <Target className="text-primary mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-foreground mb-2">Objetivos</h3>
            <p className="text-sm text-muted-foreground">Entendemos suas metas financeiras</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
            <Scale className="text-primary mx-auto mb-3" size={32} />
            <h3 className="font-semibold text-foreground mb-2">Tolerância</h3>
            <p className="text-sm text-muted-foreground">Medimos sua tolerância ao risco</p>
          </div>
        </div>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="px-10 py-4 text-lg shadow-lg pulse-hover"
        >
          <Play className="mr-2" size={20} />
          Começar Agora
        </Button>
      </CardContent>
    </Card>
  );
}
