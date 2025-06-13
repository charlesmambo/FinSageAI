import React from "react";
import {
  Brain,
  Lightbulb,
  AlertTriangle,
  Rocket,
  ChevronRight,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { mockAIInsights } from "../../utils/mockData";

export const AIInsights: React.FC = () => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "tip":
        return <Lightbulb className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "opportunity":
        return <Rocket className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "tip":
        return "bg-primary-100 text-primary-700";
      case "warning":
        return "bg-warning-100 text-warning-700";
      case "opportunity":
        return "bg-success-100 text-success-700";
      default:
        return "bg-secondary-100 text-secondary-700";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Financial Coach</h2>
            <p className="text-primary-100">
              Personalized insights and recommendations based on your financial
              behavior
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockAIInsights.map((insight) => (
          <Card key={insight.id} hover className="h-full">
            <div className="flex items-start space-x-4 h-full">
              <div className={`p-3 rounded-full ${getInsightColor(insight.type)}`}>
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    {insight.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ml-2 ${
                      insight.type === "tip"
                        ? "bg-primary-100 text-primary-700"
                        : insight.type === "warning"
                        ? "bg-warning-100 text-warning-700"
                        : "bg-success-100 text-success-700"
                    }`}
                  >
                    {insight.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                  {insight.description}
                </p>

                {/* 🧠 Suggestions block (if available) */}
                {insight.suggestions && (
                  <ul className="text-sm text-gray-600 list-disc list-inside mb-4 space-y-1">
                    {insight.suggestions.map((suggestion: string, index: number) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-0=00 capitalize">
                    {insight.category}
                  </span>
                  {insight.actionable && (
                    <Button size="sm" variant="outline">
                      Take Action
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            More Insights Coming
          </h3>
          <p className="text-gray-600 mb-4">
            Our AI is analyzing your financial patterns to provide more personalized recommendations.
          </p>
          <Button variant="primary">Refresh Insights</Button>
        </div>
      </Card>
    </div>
  );
};
