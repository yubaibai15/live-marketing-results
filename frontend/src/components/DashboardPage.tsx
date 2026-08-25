import { ArrowLeft, BarChart3, Download, FileCheck2, Gauge, LineChart, MapPinned, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { decodeEscapedText } from "../decodeEscapedText";

type DashboardKind = "website" | "social" | "customer";

type Board = {
  title: string;
  subtitle: string;
  period: string;
  score: string;
  scoreLabel: string;
  kpis: Array<[string, string, string]>;
  chartTitle: string;
  chartNote: string;
  rankTitle: string;
  ranks: Array<[string, number]>;
  insightTitle: string;
  insights: string[];
  segments: Array<[string, string]>;
};

const boards: Record<DashboardKind, Board> = {
  website: {
    title: "\u72ec\u7acb\u7ad9\u589e\u957f\u5206\u6790",
    subtitle: "\u6d41\u91cf\u3001\u641c\u7d22\u673a\u4f1a\u4e0e\u8f6c\u5316\u6548\u7387\u7684\u7edf\u4e00\u5206\u6790",
    period: "\u6700\u8fd1 30 \u5929",
    score: "87",
    scoreLabel: "\u589e\u957f\u5065\u5eb7\u5ea6",
    kpis: [
      ["\u6708\u5ea6\u8bbf\u95ee", "196,420", "+18.4%"],
      ["\u6709\u6548\u7ebf\u7d22", "2,846", "+12.7%"],
      ["\u641c\u7d22\u66dd\u5149", "1.26M", "+24.1%"],
      ["\u8be2\u76d8\u8f6c\u5316\u7387", "3.8%", "+0.6pp"],
    ],
    chartTitle: "\u6d41\u91cf\u4e0e\u7ebf\u7d22\u8d8b\u52bf",
    chartNote: "\u8bbf\u95ee\u6d41\u91cf\u6301\u7eed\u589e\u957f\uff0c\u6708\u4e2d\u5185\u5bb9\u4e13\u9898\u5e26\u6765\u7ebf\u7d22\u62d0\u70b9\u3002",
    rankTitle: "\u5173\u952e\u8bcd\u673a\u4f1a\u4f18\u5148\u7ea7",
    ranks: [["carro eletrico urbano", 92], ["BYD Dolphin Brasil", 86], ["autonomia carro eletrico", 78], ["test drive eletrico", 71]],
    insightTitle: "\u672c\u671f\u5efa\u8bae",
    insights: ["\u4f18\u5148\u5b8c\u5584\u201c\u57ce\u5e02\u7eaf\u7535\u901a\u52e4\u201d\u4e13\u9898\u843d\u5730\u9875\uff0c\u627f\u63a5\u9ad8\u610f\u56fe\u641c\u7d22\u6d41\u91cf\u3002", "\u5c06\u9ad8\u8f6c\u5316\u5730\u533a\u7eb3\u5165 SEM \u5355\u72ec\u51fa\u4ef7\u5206\u7ec4\uff0c\u4fdd\u7559\u6708\u5ea6\u9884\u7b97\u7684 15% \u505a\u9a8c\u8bc1\u3002", "\u5728\u770b\u8f66\u9875\u589e\u52a0\u8bd5\u9a7e\u65f6\u95f4\u9884\u7ea6\u4e0e WhatsApp \u54a8\u8be2\u53cc\u5165\u53e3\u3002"],
    segments: [["\u81ea\u7136\u641c\u7d22", "42%"], ["\u4ed8\u8d39\u641c\u7d22", "28%"], ["\u793e\u5a92\u5f15\u6d41", "18%"], ["\u76f4\u63a5\u8bbf\u95ee", "12%"]],
  },
  social: {
    title: "\u793e\u5a92\u5185\u5bb9\u7b56\u7565\u5206\u6790",
    subtitle: "\u57fa\u4e8e\u4e92\u52a8\u8d28\u91cf\u3001\u5185\u5bb9\u5f62\u5f0f\u4e0e\u4e0a\u5347\u8d8b\u52bf\u7684\u7b56\u7565\u9762\u677f",
    period: "\u6700\u8fd1 28 \u5929",
    score: "83",
    scoreLabel: "\u5185\u5bb9\u6548\u80fd\u6307\u6570",
    kpis: [
      ["\u6709\u6548\u64ad\u653e", "3.42M", "+31.8%"],
      ["\u5e73\u5747\u4e92\u52a8\u7387", "6.7%", "+1.2pp"],
      ["\u9ad8\u6f5c\u5185\u5bb9", "18", "+5"],
      ["\u6b63\u5411\u60c5\u611f", "76%", "+8.1pp"],
    ],
    chartTitle: "\u5185\u5bb9\u4e92\u52a8\u8868\u73b0",
    chartNote: "\u77ed\u89c6\u9891\u7684\u5b8c\u64ad\u4e0e\u8f6c\u53d1\u5173\u8054\u5ea6\u6700\u9ad8\uff0c\u89e3\u8bf4\u578b\u5185\u5bb9\u6709\u7a33\u5b9a\u589e\u957f\u3002",
    rankTitle: "\u9ad8\u8868\u73b0\u5185\u5bb9\u6a21\u677f",
    ranks: [["30 \u79d2\u771f\u5b9e\u901a\u52e4\u8bb0\u5f55", 94], ["\u5145\u7535\u6210\u672c\u5b9e\u6d4b", 88], ["\u8f66\u4e3b\u4e00\u65e5 Vlog", 81], ["\u7a7a\u95f4\u7ec6\u8282\u5bf9\u6bd4", 73]],
    insightTitle: "\u672c\u671f\u5efa\u8bae",
    insights: ["\u4ee5\u201c\u4e00\u5929\u7684\u57ce\u5e02\u901a\u52e4\u6210\u672c\u201d\u4e3a\u4e3b\u9898\u63a8\u51fa\u7cfb\u5217\u77ed\u89c6\u9891\uff0c\u4f18\u5148\u4fdd\u7559\u539f\u58f0\u89e3\u8bf4\u3002", "\u5c06\u8bc4\u8bba\u533a\u9ad8\u9891\u95ee\u9898\u6574\u7406\u4e3a\u56fe\u6587\u7b54\u7591\u6a21\u677f\uff0c\u589e\u5f3a\u79c1\u4fe1\u8f6c\u5316\u3002", "\u4e0b\u671f\u4e3b\u52a8\u6d4b\u8bd5\u201c\u771f\u5b9e\u8f66\u4e3b\u201d\u4e0e\u201c\u4e13\u4e1a\u8bc4\u6d4b\u201d\u4e24\u7c7b IP \u6bd4\u4f8b\u3002"],
    segments: [["\u8f6c\u53d1\u8d21\u732e", "34%"], ["\u8bc4\u8bba\u6df1\u5ea6", "27%"], ["\u5b8c\u64ad\u7387", "23%"], ["\u70b9\u8d5e\u53cd\u9988", "16%"]],
  },
  customer: {
    title: "\u5ba2\u6237\u753b\u50cf\u4e0e\u9009\u54c1\u6d1e\u5bdf",
    subtitle: "\u5c06\u95ee\u5377\u4eba\u7fa4\u3001\u7528\u8f66\u573a\u666f\u4e0e\u8f66\u578b\u5339\u914d\u7ed3\u679c\u8f6c\u5316\u4e3a\u76f4\u64ad\u9009\u54c1\u4f9d\u636e",
    period: "\u6700\u8fd1 60 \u5929",
    score: "89",
    scoreLabel: "\u4eba\u8f66\u5339\u914d\u5ea6",
    kpis: [
      ["\u6709\u6548\u6837\u672c", "2,846", "+426"],
      ["\u4e3b\u529b\u5ba2\u7fa4", "25-35", "61.2%"],
      ["\u6d77\u9e25\u5339\u914d\u5206", "91.4", "+4.2"],
      ["\u6c49 EV \u5339\u914d\u5206", "84.7", "+2.1"],
    ],
    chartTitle: "\u4eba\u7fa4\u504f\u597d\u4e0e\u8d2d\u8f66\u610f\u5411",
    chartNote: "\u57ce\u5e02\u901a\u52e4\u3001\u5145\u7535\u4fbf\u5229\u6027\u4e0e\u603b\u62e5\u6709\u6210\u672c\u662f\u6700\u4e3b\u8981\u7684\u51b3\u7b56\u9a71\u52a8\u56e0\u7d20\u3002",
    rankTitle: "\u76f4\u64ad\u4e3b\u63a8\u8f66\u578b\u6392\u5e8f",
    ranks: [["BYD \u6d77\u9e25\uff1a\u57ce\u5e02\u901a\u52e4\u4eba\u7fa4", 91], ["\u6c49 EV\uff1a\u5bb6\u5ead\u5347\u7ea7\u4eba\u7fa4", 85], ["\u5143 PLUS\uff1a\u7a7a\u95f4\u504f\u597d\u4eba\u7fa4", 76], ["\u5b8b PLUS EV\uff1a\u51fa\u884c\u5347\u7ea7\u4eba\u7fa4", 69]],
    insightTitle: "\u672c\u671f\u5efa\u8bae",
    insights: ["\u76f4\u64ad\u9996\u4e3b\u63a8\u6d77\u9e25\uff0c\u56f4\u7ed5\u901a\u52e4\u6210\u672c\u3001\u505c\u8f66\u4fbf\u5229\u6027\u4e0e\u5145\u7535\u6548\u7387\u7ec4\u7ec7\u8bdd\u672f\u3002", "\u5c06\u6c49 EV \u653e\u5728\u7b2c\u4e8c\u65f6\u6bb5\u505a\u5bb6\u5ead\u5347\u7ea7\u4e13\u573a\uff0c\u7a81\u51fa\u5ea7\u4ed3\u3001\u7eed\u822a\u4e0e\u8212\u9002\u6027\u3002", "\u6839\u636e\u5ba2\u7fa4\u7c07\u7fa4\u5b9e\u65f6\u66f4\u65b0\u4ef7\u503c\u70b9\u6392\u5e8f\uff0c\u907f\u514d\u4e00\u5957\u8bdd\u672f\u8986\u76d6\u6240\u6709\u4eba\u3002"],
    segments: [["\u57ce\u5e02\u901a\u52e4", "39%"], ["\u5bb6\u5ead\u5347\u7ea7", "31%"], ["\u9996\u6b21\u8d2d\u8f66", "18%"], ["\u591a\u573a\u666f\u51fa\u884c", "12%"]],
  },
};

function TrendChart({ title, note }: { title: string; note: string }) {
  return <section className="report-card trend-card">
    <div className="report-card-head"><div><span className="report-label"><LineChart />{"\u8d8b\u52bf\u5206\u6790"}</span><h2>{title}</h2></div><button type="button" className="report-range">30D</button></div>
    <svg className="report-chart" viewBox="0 0 720 280" role="img" aria-label={title}>
      <defs><linearGradient id="report-blue" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity=".3" /><stop offset="100%" stopColor="#3b82f6" stopOpacity=".02" /></linearGradient></defs>
      <path className="chart-grid" d="M42 46H700M42 102H700M42 158H700M42 214H700" />
      <path className="chart-fill" d="M42 203 C86 188 105 150 148 160 S218 210 266 171 S338 104 384 132 S450 184 498 120 S558 73 600 101 S653 156 700 92 V236 H42Z" />
      <path className="chart-line" d="M42 203 C86 188 105 150 148 160 S218 210 266 171 S338 104 384 132 S450 184 498 120 S558 73 600 101 S653 156 700 92" />
      <path className="chart-line chart-line-alt" d="M42 216 C90 200 119 208 166 188 S233 148 278 166 S345 204 394 180 S462 133 509 158 S578 200 623 172 S669 141 700 151" />
      <g className="chart-axis"><text x="42" y="263">01</text><text x="174" y="263">07</text><text x="306" y="263">14</text><text x="438" y="263">21</text><text x="570" y="263">28</text><text x="682" y="263">30</text></g>
    </svg>
    <p className="report-note">{note}</p>
  </section>;
}

export function DashboardPage({ kind }: { kind: DashboardKind }) {
  const board = boards[kind];
  const pageRef = useRef<HTMLElement>(null);
  useEffect(() => { decodeEscapedText(pageRef.current); }, []);
  return <main className="report-page" ref={pageRef}>
    <header className="report-top">
      <button type="button" className="report-back" onClick={() => window.location.assign("/")}><ArrowLeft />{"\u8fd4\u56de\u9996\u9875"}</button>
      <div className="report-product"><span>{"\u6c7d\u8f66\u589e\u957f\u7b56\u7565\u667a\u80fd\u4f53"}</span><small>ANALYTICS REPORT</small></div>
      <button type="button" className="report-export" onClick={() => window.print()}><Download />{"\u5bfc\u51fa\u62a5\u544a"}</button>
    </header>
    <section className="report-shell">
      <div className="report-heading">
        <div><p className="report-eyebrow"><BarChart3 /> {"\u5b9e\u65f6\u5206\u6790\u7ed3\u679c"}</p><h1>{board.title}</h1><p>{board.subtitle}</p></div>
        <aside className="report-score"><Gauge /><div><span>{board.scoreLabel}</span><strong>{board.score}</strong><small>/ 100</small></div></aside>
      </div>
      <div className="report-meta"><span><i />{"\u6570\u636e\u72b6\u6001\uff1a\u5df2\u5b8c\u6210\u5206\u6790"}</span><span>{"\u6570\u636e\u5468\u671f\uff1a"}{board.period}</span><span>{"\u66f4\u65b0\u65f6\u95f4\uff1a\u4eca\u65e5"}</span></div>
      <section className="report-kpis">{board.kpis.map(([label, value, change]) => <article key={label}><span>{label}</span><strong>{value}</strong><small>{change}</small></article>)}</section>
      <section className="report-main-grid">
        <TrendChart title={board.chartTitle} note={board.chartNote} />
        <section className="report-card rank-card"><div className="report-card-head"><div><span className="report-label"><TrendingUp /> {"\u4f18\u5148\u7ea7\u6392\u5e8f"}</span><h2>{board.rankTitle}</h2></div></div><div className="rank-list">{board.ranks.map(([label, value], index) => <div className="rank-row" key={label}><b>0{index + 1}</b><div><span>{label}</span><i><em style={{ width: value + "%" }} /></i></div><strong>{value}</strong></div>)}</div></section>
        <section className="report-card insight-card"><div className="report-card-head"><div><span className="report-label"><FileCheck2 /> {"\u7b56\u7565\u8f93\u51fa"}</span><h2>{board.insightTitle}</h2></div></div><ol>{board.insights.map((item, index) => <li key={item}><b>0{index + 1}</b><span>{item}</span></li>)}</ol></section>
        <section className="report-card segment-card"><div className="report-card-head"><div><span className="report-label"><MapPinned /> {"\u4eba\u7fa4\u4e0e\u6e20\u9053\u7ed3\u6784"}</span><h2>{"\u5206\u5e03\u6982\u89c8"}</h2></div></div><div className="segment-donut"><div><strong>100%</strong><span>{"\u6709\u6548\u5206\u6790\u6837\u672c"}</span></div></div><ul>{board.segments.map(([label, value], index) => <li key={label}><i className={"segment-dot dot-" + index} /><span>{label}</span><b>{value}</b></li>)}</ul></section>
      </section>
      <p className="report-disclaimer">{"\u8bf4\u660e\uff1a\u5f53\u524d\u62a5\u544a\u57fa\u4e8e\u5df2\u63d0\u4ea4\u7684\u5206\u6790\u6570\u636e\u751f\u6210\uff0c\u7528\u4e8e\u63d0\u4f9b\u53ef\u6267\u884c\u7684\u7b56\u7565\u4f18\u5148\u7ea7\u53c2\u8003\u3002"}</p>
    </section>
  </main>;
}
