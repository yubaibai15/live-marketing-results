import { ArrowRight } from "lucide-react";

export type PublicPage = "home" | "capabilities" | "solutions" | "cases" | "resources" | "about";

const copy = {
  name: "\u6c7d\u8f66\u589e\u957f\u7b56\u7565\u667a\u80fd\u4f53",
  kicker: "AI \u9a71\u52a8\u7684\u6c7d\u8f66\u589e\u957f\u51b3\u7b56\u5e73\u53f0",
  headline: "\u8ba9\u589e\u957f\u51b3\u7b56\n\u5efa\u7acb\u5728\u53ef\u9a8c\u8bc1\u7684\u6570\u636e\u4e0a",
  intro: "\u8fde\u63a5\u5e02\u573a\u3001\u7528\u6237\u4e0e\u7ecf\u8425\u6570\u636e\uff0c\u4ece\u6d1e\u5bdf\u3001\u7b56\u7565\u5230\u6267\u884c\uff0c\u8ba9\u6bcf\u4e00\u6b21\u6c7d\u8f66\u589e\u957f\u51b3\u7b56\u90fd\u6709\u6839\u636e\u3002",
  enter: "\u8fdb\u5165\u7b56\u7565\u5de5\u4f5c\u53f0",
  login: "\u767b\u5f55", trial: "\u5f00\u59cb\u4f53\u9a8c",
  proofA: "\u4e09\u7c7b\u589e\u957f\u7b56\u7565", proofB: "\u56db\u7c7b\u6570\u636e\u5165\u53e3", proofC: "\u7ed3\u679c\u53ef\u89e3\u91ca",
  desk: "\u589e\u957f\u7b56\u7565\u5de5\u4f5c\u53f0", online: "\u5728\u7ebf",
  leads: "\u9500\u552e\u7ebf\u7d22\u589e\u957f", conversion: "\u8bd5\u9a7e\u8f6c\u5316\u7387", lifetimeValue: "\u5355\u5ba2\u751f\u547d\u5468\u671f\u4ef7\u503c",
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
