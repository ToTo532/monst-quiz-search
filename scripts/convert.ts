import * as fs from 'fs';
import * as path from 'path';
import XLSX from 'xlsx';

const excelFilePath = path.join(process.cwd(), 'data', 'quizzes.xlsx');
const jsonOutputPath = path.join(process.cwd(), 'data', 'quizzes.json');

interface QuizRow {
  答え: string;
  カテゴリー: string;
  ヒント: string;
}

// ★理想のヒントの形（カテゴリーと中身をセットにする）
interface HintItem {
  category: string;
  text: string;
}

interface FinalQuiz {
  answer: string;
  hints: HintItem[]; // 文字列の配列から、HintItemの配列に変更！
}

function convertExcelToJson() {
  try {
    console.log('🔄 新しいデータ構造でExcelファイルを読み込んでいます...');

    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = 'QuizData';
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      console.error(`❌ エラー: シート名「${sheetName}」が見つかりません。`);
      return;
    }

    const rawData = XLSX.utils.sheet_to_json<QuizRow>(worksheet);
    const quizMap: { [key: string]: FinalQuiz } = {};

    rawData.forEach((row) => {
      const answer = row['答え']?.toString().trim();
      const category = row['カテゴリー']?.toString().trim() || 'その他';
      const hint = row['ヒント']?.toString().trim();

      if (!answer || !hint) return;

      if (!quizMap[answer]) {
        quizMap[answer] = {
          answer: answer,
          hints: []
        };
      }

      // すでに同じヒント内容が登録されていなければ、カテゴリー付きで追加
      const isDuplicate = quizMap[answer].hints.some(h => h.text === hint);
      if (!isDuplicate) {
        quizMap[answer].hints.push({
          category: category,
          text: hint
        });
      }
    });

    const finalData = Object.values(quizMap);

    fs.writeFileSync(jsonOutputPath, JSON.stringify(finalData, null, 2), 'utf-8');
    console.log(`✨ 変換成功！理想の形で ${finalData.length} 件保存しました。`);

  } catch (error) {
    console.error('❌ 変換中にエラーが発生しました:', error);
  }
}

convertExcelToJson();