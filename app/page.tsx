'use client';

import { useState } from 'react';

const ACCENT = 'text-teal-400';
const ACCENT_BG = 'bg-teal-500';

export default function EnvironmentalImpactPage() {
  const [form, setForm] = useState({
    projectType: 'Commercial Development',
    projectName: '',
    location: '',
    size: '50 acres',
    constructionTimeline: '18 months',
    operationPhase: 'Industrial/Commercial Operations',
    affectedEcosystems: 'Wetlands, Grassland, Riparian Zone',
    mitigationMeasures: 'Erosion controls, wildlife relocation, water quality monitoring',
    description: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${ACCENT} text-sm font-medium mb-4 uppercase tracking-widest`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Environmental AI Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={ACCENT}>Environmental Impact</span> Statement Draft Generator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Generate comprehensive Environmental Impact Statement drafts with AI-powered analysis, mitigation plans, and regulatory compliance checklists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Project Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Name</label>
                <input name="projectName" type="text" value={form.projectName} onChange={handleChange}
                  placeholder="e.g. Sierra Valley Solar Farm"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Type</label>
                  <select name="projectType" value={form.projectType} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50">
                    <option>Commercial Development</option><option>Industrial Facility</option>
                    <option>Residential Subdivision</option><option>Highway/Infrastructure</option>
                    <option>Mining Operation</option><option>Renewable Energy</option>
                    <option>Water Dam/Reservoir</option><option>Pipeline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Project Size</label>
                  <input name="size" type="text" value={form.size} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Location</label>
                <input name="location" type="text" value={form.location} onChange={handleChange}
                  placeholder="e.g. Riverside County, CA - desert terrain"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Construction Timeline</label>
                  <input name="constructionTimeline" type="text" value={form.constructionTimeline} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Operation Phase</label>
                  <select name="operationPhase" value={form.operationPhase} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50">
                    <option>Industrial/Commercial Operations</option><option>Residential</option>
                    <option>Agricultural</option><option>Mixed Use</option><option>Recreational</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Affected Ecosystems</label>
                <input name="affectedEcosystems" type="text" value={form.affectedEcosystems} onChange={handleChange}
                  placeholder="e.g. Wetlands, Forest, Grassland, Riparian"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Proposed Mitigation Measures</label>
                <textarea name="mitigationMeasures" value={form.mitigationMeasures} onChange={handleChange} rows={2}
                  placeholder="e.g. Erosion controls, wildlife relocation, water quality monitoring..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Additional Notes</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={2}
                  placeholder="Existing environmental studies, stakeholder concerns, special-status species..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className={`w-full ${ACCENT_BG} hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/20`}>
                {loading ? 'Drafting Environmental Impact Statement...' : 'Generate EIS Draft'}
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Draft Environmental Impact Statement</h2>
            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-4" />
                <p>Drafting comprehensive EIS document...</p>
              </div>
            )}
            {!loading && !result && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="text-center">Enter your project details and click generate to draft a comprehensive Environmental Impact Statement.</p>
              </div>
            )}
            {result && (
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="bg-gray-900/80 rounded-xl p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap overflow-auto max-h-[600px]">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-xs">
          Powered by DeepSeek AI · Next.js 16 · Tailwind CSS
        </div>
      </div>
    </div>
  );
}
