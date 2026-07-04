"use client";

import { useEffect } from "react";

export default function AdMaxOverlay() {
  useEffect(() => {
    // 画面が表示されたら、古い広告の残骸を念のため掃除する
    return () => {
      const overlayEl = document.getElementById("adm-overlay-89b044fcc5aabec3f13be5bbc2e0070c");
      if (overlayEl) overlayEl.remove();
    };
  }, []);

  return (
    <>
      {/* 忍者AdMaxのロボットが確実に「ここにある！」と検知できるようにする標準コード */}
      <div className="adm-89b044fcc5aabec3f13be5bbc2e0070c" style={{ display: "inline-block" }} />
      <script
        src="https://adm.shinobi.jp/s/89b044fcc5aabec3f13be5bbc2e0070c"
        async
      />
    </>
  );
}