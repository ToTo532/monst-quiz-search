"use client";

import { useMemo, useState } from "react";
import quizzes from "../data/quizzes.json";
import ResultList from "../components/ResultList";

interface HintItem {
  category: string;
  text: string;
}

interface Quiz {
  answer: string;
  hints: HintItem[];
}

export default function Home() {
  const [inputWord, setInputWord] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleAddTag = () => {
    const trimmed = inputWord.trim();
    if (trimmed !== "" && !searchTags.includes(trimmed)) {
      setSearchTags([...searchTags, trimmed]);
      setInputWord("");
      setSelectedQuiz(null);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSearchTags(searchTags.filter((tag) => tag !== tagToRemove));
    setSelectedQuiz(null);
  };

  const results = useMemo(() => {
    const activeKeywords = [...searchTags];
    if (inputWord.trim() !== "") {
      activeKeywords.push(inputWord.trim());
    }

    if (activeKeywords.length === 0) {
      return quizzes as Quiz[];
    }

    return (quizzes as Quiz[]).filter((quiz) =>
      activeKeywords.every((keyword) =>
        // ★ここを修正：hint.text の中身にキーワードが含まれるかチェック
        quiz.hints.some((hint) =>
          hint.text.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
  }, [searchTags, inputWord]);

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-12">
      <div className="mx-auto max-w-2xl">
        
        <h1 className="mb-2 text-center text-3xl font-extrabold text-slate-800 tracking-wide">
          モンスト クイズDEストライク検索
        </h1>
        <p className="mb-8 text-center text-sm text-gray-500">
          ヒントワードから、クイズDEストライクの答えを検索
        </p>

        {/* 検索入力欄と条件追加ボタン */}
        <div className="flex gap-2 mb-4">
          <input
            className="w-full rounded-xl border border-gray-400 bg-white p-4 text-lg text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none transition font-medium"
            placeholder="ヒントワードを入力..."
            value={inputWord}
            onChange={(e) => {
              setInputWord(e.target.value);
              setSelectedQuiz(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTag();
            }}
          />
          <button
            onClick={handleAddTag}
            className="rounded-xl bg-blue-500 px-5 text-white font-bold hover:bg-blue-600 transition shadow-sm active:scale-95 text-sm md:text-base whitespace-nowrap"
          >
            ＋条件追加
          </button>
        </div>

        {/* 追加された検索条件（タグ一覧） */}
        {searchTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-800 shadow-sm"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full p-0.5 hover:bg-blue-200 transition text-blue-600 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 検索して見つからなかったとき */}
        {results.length === 0 && (
          <div className="rounded-xl bg-white p-6 shadow text-center text-gray-400">
            一致するキャラが見つかりませんでした。条件を変えてみてください。
          </div>
        )}

        {/* 検索結果一覧 */}
        {results.length > 0 && (
          <ResultList 
            results={results} 
            selectedQuiz={selectedQuiz} 
            onSelectQuiz={setSelectedQuiz} 
          />
        )}

      </div>
    </main>
  );
}