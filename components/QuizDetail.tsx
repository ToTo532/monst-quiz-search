"use client";

interface Quiz {
  answer: string;
  category: string;
  hints: string[];
}

interface QuizDetailProps {
  quiz: Quiz | null;
}

export default function QuizDetail({ quiz }: QuizDetailProps) {
  // まだ何もクリックされていないときは、何も表示しない
  if (!quiz) return null;

  return (
    <div className="mt-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-lg animate-fade-in">
      <h2 className="mb-2 text-sm font-bold text-blue-400 tracking-wider">
        【クイズの答え・詳細】
      </h2>
      <h3 className="mb-6 text-2xl font-extrabold border-b border-slate-700 pb-3">
        {quiz.answer}
      </h3>

      <div>
        <h4 className="mb-3 font-bold text-slate-400 text-sm">ヒントワード一覧</h4>
        <ul className="space-y-2">
          {quiz.hints.map((hint, index) => (
            <li key={index} className="flex items-start gap-2 text-slate-200">
              <span className="text-blue-400 font-bold">•</span>
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}