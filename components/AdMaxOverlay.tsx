"use client";

import { useEffect } from "react";

export default function AdMaxOverlay() {
  useEffect(() => {
    // 画面が読み込まれたら忍者AdMaxのスクリプトを走らせる
    const script = document.createElement("script");
    script.src = "https://adm.shinobi.jp/s/89b044fcc5aabec3f13be5bbc2e0070c";
    script.async = true;
    
    // 広告を表示したい枠（container）の中にスクリプトを入れる
    const container = document.getElementById("admax-banner-zone");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    // 検索バーの下に綺麗に収まるように中央寄せにする枠
    <div className="my-6 flex justify-center">
      <div id="admax-banner-zone" className="min-h-[250px] w-[300px] bg-slate-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-xs text-gray-400">
        {/* 広告読み込み中のプレースホルダー */}
        広告読み込み中...
      </div>
    </div>
  );
}