"use client";

interface HintItem {
  category: string;
  text: string;
}

interface Quiz {
  answer: string;
  hints: HintItem[];
}

interface ResultListProps {
  results: Quiz[];
  selectedQuiz: Quiz | null;
  onSelectQuiz: (quiz: Quiz | null) => void;
}

export default function ResultList({ results, selectedQuiz, onSelectQuiz }: ResultListProps) {
  
  const handleCardClick = (quiz: Quiz) => {
    if (selectedQuiz?.answer === quiz.answer) {
      onSelectQuiz(null);
    } else {
      onSelectQuiz(quiz);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        検索結果 ({results.length}件)
      </h2>

      <div className="space-y-3">
        {results.map((quiz) => {
          const isOpen = selectedQuiz?.answer === quiz.answer;

          // ★開いているとき、ヒントをカテゴリーごとにグループ分けする
          const groupedHints: { [key: string]: string[] } = {};
          if (isOpen) {
            quiz.hints.forEach((hint) => {
              if (!groupedHints[hint.category]) {
                groupedHints[hint.category] = [];
              }
              groupedHints[hint.category].push(hint.text);
            });
          }

          return (
            <div
              key={quiz.answer}
              className={`rounded-lg border transition duration-200 overflow-hidden ${
                isOpen 
                  ? "border-blue-500 bg-slate-50 shadow-sm" 
                  : "border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {/* キャラ名 */}
              <div
                onClick={() => handleCardClick(quiz)}
                className="flex items-center justify-between p-4 font-bold text-lg text-gray-700 cursor-pointer select-none"
              >
                <span>{quiz.answer}</span>
                <span className={`text-xl text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {/* パカッと開くヒント一覧（カテゴリー別見出し付き！） */}
              {isOpen && (
                <div className="border-t border-blue-200 bg-slate-900 p-6 text-white space-y-4">
                  {Object.entries(groupedHints).map(([category, texts]) => (
                    <div key={category} className="border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                      {/* カテゴリーの見出し */}
                      <h4 className="mb-2 font-bold text-blue-400 text-xs tracking-wider uppercase">
                        【{category}】
                      </h4>
                      {/* そのカテゴリーに属するヒント一覧 */}
                      <ul className="space-y-1">
                        {texts.map((text, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-slate-200">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}