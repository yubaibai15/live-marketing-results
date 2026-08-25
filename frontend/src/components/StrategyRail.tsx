import { BarChart3, Bot, CarFront, Globe2, MessageSquareText } from "lucide-react";

export type StrategyName = "chat" | "website" | "vehicle" | "social";
const copy = { label: "\u7b56\u7565\u5bfc\u822a", name: "\u6c7d\u8f66\u589e\u957f\u7b56\u7565\u667a\u80fd\u4f53", owner: "\u589e\u957f\u8d1f\u8d23\u4eba", member: "\u4f01\u4e1a\u7248 \u00b7 \u670d\u52a1\u5728\u7ebf" } as const;
const items = [["chat", MessageSquareText, "\u7b56\u7565\u5bf9\u8bdd"], ["website", Globe2, "\u72ec\u7acb\u7ad9\u589e\u957f"], ["vehicle", CarFront, "\u76f4\u64ad\u9009\u54c1"], ["social", BarChart3, "\u793e\u5a92\u5185\u5bb9\u7b56\u7565"]] as const;

export function StrategyRail({ active, onSelect }: { active: StrategyName; onSelect: (name: StrategyName) => void }) {
  return <aside className="rail" aria-label={copy.label}>
    <div className="rail-brand"><span className="brand-mark"><Bot /></span><strong>{copy.name}</strong></div>
    <nav className="rail-nav">{items.map(([name, Icon, label]) => <button key={name} className={active === name ? "nav-icon active" : "nav-icon"} onClick={() => onSelect(name)}><Icon /><span>{label}</span></button>)}</nav>
    <div className="rail-spacer" />
    <div className="rail-user"><span>{copy.owner}</span><small>{copy.member}</small></div>
  </aside>;
}
