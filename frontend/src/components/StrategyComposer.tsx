import { FileText, Globe2, Paperclip, SendHorizontal, Sparkles, X } from "lucide-react";
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";

export type ChatAttachment = { name: string; content_type: string; excerpt: string };

const composerText = {
  placeholder: "输入你的增长问题或目标，例如：如何提升独立站转化率？",
  label: "输入你的汽车增长问题",
  attachment: "附件", thinking: "快速回答", web: "数据边界",
  analysing: "分析中…", submit: "开始分析",
  disclosure: "附件仅用于本次分析，不会保存到服务器。支持 TXT、MD、CSV、JSON，单个文件不超过 500 KB。",
  invalid: "仅支持 TXT、MD、CSV、JSON 文件，且单个文件不能超过 500 KB。",
  limit: "一次最多添加 3 个附件。",
} as const;

const ACCEPTED = new Set(["text/plain", "text/markdown", "text/csv", "application/json"]);
const EXTENSIONS = /\.(txt|md|csv|json)$/i;
const MAX_BYTES = 500 * 1024;

export function StrategyComposer({ onSend, busy }: { onSend: (message: string, attachments: ChatAttachment[]) => void; busy: boolean }) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const addFiles = async (files: FileList | File[]) => {
    const selected = Array.from(files);
    if (attachments.length + selected.length > 3) { setNotice(composerText.limit); return; }
    const parsed: ChatAttachment[] = [];
    for (const file of selected) {
      if (file.size > MAX_BYTES || (!ACCEPTED.has(file.type) && !EXTENSIONS.test(file.name))) { setNotice(composerText.invalid); continue; }
      const raw = await file.text();
      const excerpt = raw.replace(/\u0000/g, "").trim().slice(0, 12_000);
      if (!excerpt) { setNotice(`《${file.name}》没有可读取的文本内容。`); continue; }
      parsed.push({ name: file.name.slice(0, 160), content_type: file.type || "text/plain", excerpt });
    }
    if (parsed.length) { setAttachments(previous => [...previous, ...parsed]); setNotice(""); }
  };
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => { if (event.target.files) void addFiles(event.target.files); event.target.value = ""; };
  const submit = (event: FormEvent) => { event.preventDefault(); const value = message.trim(); if (!value || busy) return; setMessage(""); onSend(value, attachments); setAttachments([]); setNotice(""); };
  const keydown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } };
  return <div className="composer-wrap"><form className="composer" onSubmit={submit} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); void addFiles(event.dataTransfer.files); }}>
    {attachments.length > 0 && <div className="attachment-list">{attachments.map((file, index) => <span key={`${file.name}-${index}`}><FileText />{file.name}<button type="button" aria-label={`移除 ${file.name}`} onClick={() => setAttachments(previous => previous.filter((_, position) => position !== index))}><X /></button></span>)}</div>}
    <textarea value={message} onChange={event => setMessage(event.target.value)} onKeyDown={keydown} maxLength={2000} placeholder={composerText.placeholder} aria-label={composerText.label} />
    <div className="composer-actions"><div><input ref={input} className="file-input" type="file" multiple accept=".txt,.md,.csv,.json,text/plain,text/markdown,text/csv,application/json" onChange={onFileChange} /><button type="button" className="tool-chip" onClick={() => input.current?.click()}><Paperclip />{composerText.attachment}</button><span className="tool-hint"><Sparkles />{composerText.thinking}</span><span className="tool-hint"><Globe2 />{composerText.web}</span></div><button className="send-button" type="submit" disabled={busy}>{busy ? composerText.analysing : <>{composerText.submit} <SendHorizontal /></>}</button></div>
  </form>{notice && <p className="composer-notice">{notice}</p>}<p>{composerText.disclosure}</p></div>;
}
