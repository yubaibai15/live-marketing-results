import { ArrowRight } from "lucide-react";

export type PublicPage = "home" | "capabilities" | "solutions" | "cases" | "resources" | "about";

const copy = {
  name: "直播营销策划智能体",
  kicker: "DEEPSEEK V4 FLASH 驱动的直播营销策划平台",
  headline: "让每一次直播策划\n建立在可执行的内容上",
  intro: "连接巴西市场知识库、直播脚本、营销日历与发布平台；从策划洞察到直播执行，直接得到可使用的成果。",
  enter: "进入直播营销工作台",
  login: "项目资料", trial: "开始体验",
  proofA: "直播策略对话", proofB: "六类项目知识库", proofC: "成果一键打开",
  desk: "直播营销策划工作台", online: "DeepSeek 已就绪",
  leads: "目标观看人数", conversion: "平均互动率", lifetimeValue: "有效线索目标",
} as const;

const nav: Array<[Exclude<PublicPage, "home">, string]> = [
  ["capabilities", "\u4ea7\u54c1\u80fd\u529b"], ["solutions", "\u89e3\u51b3\u65b9\u6848"], ["cases", "\u6210\u529f\u6848\u4f8b"], ["resources", "\u8d44\u6e90\u4e2d\u5fc3"], ["about", "\u5173\u4e8e\u6211\u4eec"],
];

type Props = { onEnter: () => void; onNavigate: (page: PublicPage) => void };

export function PublicNav({ onEnter, onNavigate }: Props) {
  return <header className="public-nav">
    <button className="public-brand" onClick={() => onNavigate("home")}>{copy.name}</button>
    <nav>{nav.map(([page, label]) => <button key={page} onClick={() => onNavigate(page)}>{label}</button>)}</nav>
    <div className="public-actions"><button className="login-button">{copy.login}</button><button className="trial-button" onClick={onEnter}>{copy.trial}</button></div>
  </header>;
}

export function LandingPage({ onEnter, onNavigate }: Props) {
  return <main className="marketing-shell marketing-home">
    <PublicNav onEnter={onEnter} onNavigate={onNavigate} />
    <div className="home-light" />
    <section className="home-hero">
      <div className="home-copy">
        <p className="home-kicker"><i /> {copy.kicker}</p>
        <h1>{copy.headline}</h1>
        <p>{copy.intro}</p>
        <button className="primary-button" onClick={onEnter}>{copy.enter}<ArrowRight /></button>
        <div className="home-proof"><span>{copy.proofA}</span><span>{copy.proofB}</span><span>{copy.proofC}</span></div>
      </div>
      <div className="home-visual" aria-label="Automotive growth data intelligence preview">
        <div className="visual-status"><i /> {copy.desk} <span>{copy.online}</span></div>
        <div className="visual-grid"><article><small>{copy.leads}</small><b>+48%</b><div className="mini-bars" /></article><article><small>{copy.conversion}</small><b>12.6%</b><div className="mini-line" /></article><article><small>{copy.lifetimeValue}</small><b>¥28,600</b><div className="mini-bars warm" /></article></div>
        <img src="/assets/hero-apple-sedan-v1.png" alt="\u94f6\u767d\u8272\u667a\u80fd\u8f66\u4e0e\u6570\u636e\u5206\u6790\u573a\u666f" />
      </div>
    </section>
  </main>;
}
