import { CheckCircle2, Database, FileText, ShieldCheck } from "lucide-react";

const copy = {
  label: "\u672c\u6b21\u5206\u6790",
  title: "\u672c\u6b21\u5206\u6790", online: "\u670d\u52a1\u5728\u7ebf", progress: "\u5206\u6790\u8fdb\u5ea6", sources: "\u6570\u636e\u6765\u6e90", standard: "\u5df2\u6807\u51c6\u5316",
  privacy: "\u4ec5\u5904\u7406\u7528\u6237\u4e3b\u52a8\u63d0\u4f9b\u6216\u5df2\u6388\u6743\u4f7f\u7528\u7684\u4e1a\u52a1\u6570\u636e\u3002", history: "\u67e5\u770b\u5386\u53f2\u5206\u6790",
} as const;
const steps = [["\u76ee\u6807\u7406\u89e3", "\u5df2\u5b8c\u6210"], ["\u6570\u636e\u6536\u96c6", "\u5df2\u5b8c\u6210"], ["\u6570\u636e\u5206\u6790", "\u8fdb\u884c\u4e2d\u2026"], ["\u751f\u6210\u7b56\u7565\u5efa\u8bae", "\u7b49\u5f85\u4e2d"], ["\u7ed3\u679c\u6821\u9a8c", "\u7b49\u5f85\u4e2d"]] as const;
const sources = [["\u72ec\u7acb\u7ad9\u6570\u636e", "Shopify"], ["\u5e7f\u544a\u6295\u653e\u6570\u636e", "Google Ads"], ["\u793e\u5a92\u6570\u636e", "Meta"], ["\u5e02\u573a\u8d8b\u52bf\u6570\u636e", "\u516c\u5f00\u884c\u4e1a\u6570\u636e"]] as const;

export function StrategyDesk() {
  return <aside className="desk" aria-label={copy.label}>
    <div className="desk-head"><strong>{copy.title}</strong><span className="desk-online"><i />{copy.online}</span></div>
    <section className="desk-block"><h2>{copy.progress}</h2><ol className="desk-steps">{steps.map(([name, status], index) => <li className={index < 2 ? "done" : index === 2 ? "doing" : ""} key={name}><span>{index < 2 ? <CheckCircle2 /> : index + 1}</span><b>{name}</b><em>{status}</em></li>)}</ol></section>
    <section className="desk-block"><h2>{copy.sources} <small>{copy.standard}</small></h2><div className="source-grid">{sources.map(([name, from]) => <article key={name}><Database /><strong>{name}</strong><span>{from}</span></article>)}</div></section>
    <section className="desk-note"><ShieldCheck /><p>{copy.privacy}</p></section>
    <button className="history-button"><FileText />{copy.history}</button>
  </aside>;
}
