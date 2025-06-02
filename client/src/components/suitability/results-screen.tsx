import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, TrendingUp, Activity, Star, Percent, RotateCcw, Download } from 'lucide-react';
import { profiles } from '@/lib/suitability-data';
import PortfolioChart from './portfolio-chart';

interface ResultsScreenProps {
  profileType: string;
  onRestart: () => void;
}

export default function ResultsScreen({ profileType, onRestart }: ResultsScreenProps) {
  const profile = profiles[profileType];

  if (!profile) {
    return <div>Perfil não encontrado</div>;
  }

  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Funcionalidade de download será implementada em breve!');
  };

  const metricIcons = {
    retorno: TrendingUp,
    volatilidade: Activity,
    "Índice de Sharpe": Star,
    "Performance sobre o CDI": Percent
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="shadow-xl border-border/40">
        <CardContent className="p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-6">
            <Award className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Análise Concluída!</h2>
          <p className="text-xl text-muted-foreground mb-6">Seu perfil de investidor foi identificado</p>
          
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
            <p className="text-primary-foreground/80">{profile.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {Object.entries(profile.metrics).map(([key, value]) => {
          const IconComponent = metricIcons[key as keyof typeof metricIcons] || TrendingUp;
          return (
            <Card key={key} className="metric-card">
              <CardContent className="p-6 text-center">
                <IconComponent className="text-primary mx-auto mb-3" size={32} />
                <h4 className="font-semibold text-foreground mb-1 capitalize">{key}</h4>
                <p className="text-xl font-bold text-primary">{value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Portfolio Allocation */}
      <Card className="shadow-xl border-border/40">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Alocação do Portfólio</h3>
          <PortfolioChart allocation={profile.allocation} />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRestart} size="lg" className="px-8 py-4">
            <RotateCcw className="mr-2" size={20} />
            Refazer Questionário
          </Button>
          <Button onClick={handleDownload} variant="outline" size="lg" className="px-8 py-4">
            <Download className="mr-2" size={20} />
            Baixar Relatório
          </Button>
        </div>
      </div>
    </div>
  );
}
