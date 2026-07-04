"use client";

import { useEffect } from "react";

export default function AdMaxOverlay() {
  useEffect(() => {
    // 画面が読み込まれたら、忍者AdMaxのスクリプトを動かす
    const script = document.createElement("script");
    script.src = "https://adm.shinobi.jp/s/89b044fcc5aabec3f13be5bbc2e0070c"; 
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 画面が切り替わるときは綺麗にお掃除する
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // 忍者AdMaxが自動生成した広告要素も残らないように削除する
      const overlayEl = document.getElementById("adm-overlay-89b044fcc5aabec3f13be5bbc2e0070c");
      if (overlayEl) overlayEl.remove();
    };
  }, []);

  // 忍者AdMaxのオーバーレイはスクリプト自体が自動で画面下部に固定配置してくれるため、
  // React側からは要素の「目印（コンテナ）」だけを置いておけばOKです！
  return (
    <div 
      className="adm-89b044fcc5aabec3f13be5bbc2e0070c" 
      style={{ display: "inline-block" }}
    />
  );
}