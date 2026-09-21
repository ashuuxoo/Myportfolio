import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RevealTitle } from './ui/RevealTitle';
import {
  Terminal,
  FileCode,
  Type,
  Binary,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Code2,
} from 'lucide-react';

type ToolTab = 'json' | 'counter' | 'case' | 'base64';

export const Playground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolTab>('json');
  const [copied, setCopied] = useState<string | null>(null);

  // 1. JSON Formatter state
  const [jsonInput, setJsonInput] = useState(
    '{"name":"Ashis Kumar Das","role":"Software Developer","skills":["React","Python","AI/ML"],"available":true}'
  );
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // 2. Word & Token Counter state
  const [textCountInput, setTextCountInput] = useState(
    'Software engineering is the art of translating human intent into resilient, maintainable digital products.'
  );

  // 3. Case Converter state
  const [caseInput, setCaseInput] = useState('user authentication service');

  // 4. Base64 Encoder/Decoder state
  const [b64Input, setB64Input] = useState('Building with code, data & AI');
  const [b64Output, setB64Output] = useState('');
  const [b64Error, setB64Error] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // JSON Formatter actions
  const formatJSON = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, spaces));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
      setJsonOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON syntax');
      setJsonOutput('');
    }
  };

  // Word & Token statistics
  const wordCount = textCountInput.trim() ? textCountInput.trim().split(/\s+/).length : 0;
  const charCount = textCountInput.length;
  const charNoSpaces = textCountInput.replace(/\s/g, '').length;
  const sentenceCount = textCountInput.trim() ? (textCountInput.match(/[^.!?]+[.!?]+/g) || [1]).length : 0;
  const readingTimeMinutes = (wordCount / 200).toFixed(1);
  const estimatedTokens = Math.ceil(charCount / 4);

  // Case Converter outputs
  const toCamelCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase());

  const toSnakeCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');

  const toKebabCase = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');

  const toConstantCase = (str: string) =>
    str
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');

  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  // Base64 actions
  const encodeB64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(b64Input)));
      setB64Output(encoded);
      setB64Error(null);
    } catch (err: any) {
      setB64Error('Encoding failed: ' + err.message);
    }
  };

  const decodeB64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(b64Input)));
      setB64Output(decoded);
      setB64Error(null);
    } catch (err: any) {
      setB64Error('Invalid Base64 string for decoding');
    }
  };

  return (
    <section id="playground" className="relative py-28 bg-[#07090e] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[300px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // INTERACTIVE UTILITIES</span>
          </div>
          <RevealTitle as="h2" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Developer Playground
          </RevealTitle>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            Fully functional client-side developer micro-tools. Tested, operational, and responsive.
          </p>
        </div>

        {/* Console Container */}
        <div className="rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Console Header Tabs */}
          <div className="px-4 py-3 bg-slate-950/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('json')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'json'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>JSON Formatter</span>
              </button>

              <button
                onClick={() => setActiveTab('counter')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'counter'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Word &amp; Token Counter</span>
              </button>

              <button
                onClick={() => setActiveTab('case')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'case'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Case Converter</span>
              </button>

              <button
                onClick={() => setActiveTab('base64')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'base64'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Binary className="w-3.5 h-3.5" />
                <span>Base64 Encoder</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CONSOLE READY
            </span>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* 1. JSON FORMATTER */}
            {activeTab === 'json' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400">
                    Input raw JSON string to format, validate, or minify:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => formatJSON(2)}
                      className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-medium transition-colors cursor-pointer"
                    >
                      Prettify (2 spaces)
                    </button>
                    <button
                      onClick={minifyJSON}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
                    >
                      Minify
                    </button>
                    <button
                      onClick={() => {
                        setJsonInput('');
                        setJsonOutput('');
                        setJsonError(null);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Clear"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1.5">RAW INPUT</label>
                    <textarea
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      rows={8}
                      placeholder="Paste unformatted JSON here..."
                      className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-mono text-slate-400">PARSED RESULT</label>
                      {jsonOutput && (
                        <button
                          onClick={() => handleCopy(jsonOutput, 'json')}
                          className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        >
                          {copied === 'json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copied === 'json' ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    {jsonError ? (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs flex items-start gap-2 h-44">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>Syntax Error: {jsonError}</span>
                      </div>
                    ) : (
                      <textarea
                        readOnly
                        value={jsonOutput || '// Click "Prettify" to view formatted JSON'}
                        rows={8}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-cyan-200/90 focus:outline-none resize-y"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. WORD & TOKEN COUNTER */}
            {activeTab === 'counter' && (
              <div className="space-y-5">
                <textarea
                  value={textCountInput}
                  onChange={(e) => setTextCountInput(e.target.value)}
                  rows={4}
                  placeholder="Type or paste text to analyze length, reading time and LLM token density..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">WORDS</span>
                    <span className="text-xl font-display font-bold text-white">{wordCount}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">CHARACTERS</span>
                    <span className="text-xl font-display font-bold text-cyan-400">{charCount}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">NO SPACES</span>
                    <span className="text-xl font-display font-bold text-slate-200">{charNoSpaces}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">SENTENCES</span>
                    <span className="text-xl font-display font-bold text-indigo-300">{sentenceCount}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">EST. TOKENS</span>
                    <span className="text-xl font-display font-bold text-amber-400">~{estimatedTokens}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block">READ TIME</span>
                    <span className="text-xl font-display font-bold text-emerald-400">{readingTimeMinutes}m</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CASE CONVERTER */}
            {activeTab === 'case' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={caseInput}
                  onChange={(e) => setCaseInput(e.target.value)}
                  placeholder="Enter string to convert..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-white focus:outline-none focus:border-cyan-500/50"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { label: 'camelCase', value: toCamelCase(caseInput) },
                    { label: 'snake_case', value: toSnakeCase(caseInput) },
                    { label: 'kebab-case', value: toKebabCase(caseInput) },
                    { label: 'CONSTANT_CASE', value: toConstantCase(caseInput) },
                    { label: 'Title Case', value: toTitleCase(caseInput) },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono text-slate-500 block">{item.label}</span>
                        <span className="text-xs font-mono text-slate-200 truncate block">{item.value}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(item.value, item.label)}
                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer shrink-0"
                        title="Copy"
                      >
                        {copied === item.label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. BASE64 ENCODER/DECODER */}
            {activeTab === 'base64' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400">
                    Input ASCII text or Base64 string:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={encodeB64}
                      className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-medium transition-colors cursor-pointer"
                    >
                      Encode to Base64
                    </button>
                    <button
                      onClick={decodeB64}
                      className="px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-medium transition-colors cursor-pointer"
                    >
                      Decode from Base64
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1.5">INPUT STRING</label>
                    <textarea
                      value={b64Input}
                      onChange={(e) => setB64Input(e.target.value)}
                      rows={5}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-mono text-slate-400">RESULT STRING</label>
                      {b64Output && (
                        <button
                          onClick={() => handleCopy(b64Output, 'b64')}
                          className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        >
                          {copied === 'b64' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copied === 'b64' ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                    {b64Error ? (
                      <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs flex items-center gap-2 h-32">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{b64Error}</span>
                      </div>
                    ) : (
                      <textarea
                        readOnly
                        value={b64Output || '// Click Encode or Decode to see result'}
                        rows={5}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-cyan-200 focus:outline-none resize-y"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
