* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    line-height: 1.8; color: #333; background: #f5f6fa;
}

nav {
    background: linear-gradient(135deg, #1a1a2e, #16213e); color: white;
    padding: 14px 0; position: sticky; top: 0; z-index: 1000;
    box-shadow: 0 2px 15px rgba(0,0,0,0.3);
}
.nav-container {
    max-width: 1300px; margin: 0 auto; padding: 0 25px;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;
}
.logo { font-size: 1.35em; font-weight: bold; white-space: nowrap; }
.nav-links { display: flex; gap: 4px; flex-wrap: wrap; }
.nav-links a {
    color: #ccc; text-decoration: none; padding: 6px 14px; border-radius: 20px;
    font-size: 0.88em; transition: all 0.3s; white-space: nowrap;
}
.nav-links a:hover { color: #4ECDC4; background: rgba(255,255,255,0.1); }

header {
    text-align: center; padding: 60px 20px 45px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); color: white;
}
header h1 { font-size: 2.6em; margin-bottom: 8px; letter-spacing: 3px; }
.subtitle { font-size: 1.2em; color: #4ECDC4; margin-bottom: 6px; }
.description { color: #aaa; font-size: 0.95em; }

section { max-width: 1300px; margin: 0 auto; padding: 45px 25px; }
section h2 { text-align: center; font-size: 1.9em; margin-bottom: 8px; color: #1a1a2e; }
.section-intro { text-align: center; color: #666; margin-bottom: 30px; font-size: 1em; }

.lab-container { display: flex; gap: 28px; flex-wrap: wrap; }
.control-panel {
    flex: 0 0 340px; background: white; border-radius: 16px; padding: 26px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08); height: fit-content;
    position: sticky; top: 80px;
}
.control-panel h3 { margin-bottom: 18px; color: #1a1a2e; font-size: 1.15em; }
.param-group { margin-bottom: 16px; }
.param-group label { display: block; font-weight: 600; margin-bottom: 5px; color: #333; font-size: 0.92em; }
.param-group select {
    width: 100%; padding: 9px 10px; border: 2px solid #e0e0e0; border-radius: 8px;
    font-size: 0.9em; background: white; cursor: pointer; font-family: inherit;
}
.param-group select:focus { border-color: #4ECDC4; outline: none; }
.param-group input[type="range"] { width: 100%; accent-color: #4ECDC4; height: 5px; cursor: pointer; }
.param-hint { display: block; font-size: 0.75em; color: #999; margin-top: 3px; }

.btn-analyze {
    width: 100%; padding: 13px; background: linear-gradient(135deg, #4ECDC4, #44b3ab);
    color: #1a1a2e; border: none; border-radius: 12px; font-size: 1em; font-weight: bold;
    cursor: pointer; margin-top: 6px; font-family: inherit;
    transition: transform 0.2s, box-shadow 0.2s;
}
.btn-analyze:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(78,205,196,0.35); }

.btn-reset {
    width: 100%; padding: 10px; background: #f0f0f0; color: #555; border: none;
    border-radius: 10px; font-size: 0.9em; cursor: pointer; margin-top: 8px; font-family: inherit;
}
.btn-reset:hover { background: #e0e0e0; }

.recording-section { margin-top: 18px; padding-top: 16px; border-top: 2px dashed #e0e0e0; }
.section-divider { text-align: center; margin-bottom: 10px; position: relative; }
.section-divider span {
    background: white; padding: 0 14px; font-size: 0.95em; font-weight: bold;
    color: #1a1a2e; position: relative; z-index: 1;
}
.recording-hint { font-size: 0.8em; color: #999; text-align: center; margin-bottom: 10px; }
.record-buttons { display: flex; gap: 8px; margin-bottom: 8px; }

.btn-record {
    flex: 1; padding: 10px; background: #e74c3c; color: white; border: none;
    border-radius: 10px; font-size: 0.9em; font-weight: bold; cursor: pointer; font-family: inherit;
}
.btn-record:hover { background: #c0392b; }
.btn-record.recording { animation: pulse 1.5s infinite; background: #c0392b; }
@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(231,76,60,0.4); }
    50% { box-shadow: 0 0 0 10px rgba(231,76,60,0); }
}

.btn-stop {
    flex: 1; padding: 10px; background: #555; color: white; border: none;
    border-radius: 10px; font-size: 0.9em; font-weight: bold; cursor: pointer; font-family: inherit;
}
.btn-stop:hover { background: #333; }
.btn-stop:disabled { background: #ccc; cursor: not-allowed; }

.recording-status { text-align: center; font-size: 0.82em; color: #888; margin-bottom: 8px; min-height: 20px; }
.record-canvas-hidden { display: none; width: 100%; border-radius: 8px; background: #f8f9fa; }
.audio-player-hidden { display: none; width: 100%; margin-top: 6px; border-radius: 8px; }

.btn-analyze-real {
    width: 100%; padding: 12px; background: linear-gradient(135deg, #3498db, #2980b9);
    color: white; border: none; border-radius: 12px; font-size: 0.95em; font-weight: bold;
    cursor: pointer; margin-top: 6px; font-family: inherit;
}
.btn-analyze-real:hover { transform: translateY(-2px); }
.btn-analyze-real:disabled { background: #ccc; cursor: not-allowed; }

.hidden { display: none !important; }

.progress-container { margin-top: 8px; }
.progress-bar { width: 100%; height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden; }
.progress-fill {
    height: 100%; background: linear-gradient(90deg, #3498db, #4ECDC4);
    border-radius: 3px; width: 0%; transition: width 0.3s;
}
.progress-text { text-align: center; font-size: 0.78em; color: #888; margin-top: 4px; }

.analysis-mode {
    text-align: center; padding: 8px 16px; border-radius: 20px;
    font-size: 0.85em; margin-bottom: 12px; display: inline-block;
}
.mode-empty { background: #f5f5f5; color: #999; border: 1px solid #e0e0e0; }
.mode-simulation { background: #f0fdf9; color: #4ECDC4; border: 1px solid #4ECDC4; }
.mode-real { background: #eaf2fd; color: #3498db; border: 1px solid #3498db; }

.data-source-badge {
    text-align: center; padding: 6px 14px; background: #e8f5e9; color: #27ae60;
    border: 1px solid #27ae60; border-radius: 20px; font-size: 0.82em;
    font-weight: bold; margin-bottom: 14px;
}

.result-panel { flex: 1; min-width: 380px; }
.result-panel h3 { margin-bottom: 16px; color: #1a1a2e; }
.result-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px; margin-bottom: 22px;
}
.result-card {
    background: white; border-radius: 12px; padding: 14px 10px; text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #4ECDC4;
}
.result-card.highlight-f1 { border-left-color: #FF6B6B; }
.result-card.highlight-f2 { border-left-color: #4ECDC4; }
.result-card.highlight-f3 { border-left-color: #FFA500; }
.result-label { display: block; font-size: 0.78em; color: #888; margin-bottom: 4px; }
.result-value { display: block; font-size: 1.35em; font-weight: bold; color: #1a1a2e; }
.result-sub { display: block; font-size: 0.7em; color: #aaa; margin-top: 2px; }

.chart-container {
    background: white; border-radius: 14px; padding: 18px; margin-bottom: 18px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05); text-align: center;
}
.chart-container h4 { margin-bottom: 10px; color: #555; font-size: 0.9em; text-align: left; }
.chart-container canvas { max-width: 100%; height: auto !important; display: block; margin: 0 auto; }
.chart-note { font-size: 0.78em; color: #999; margin-top: 8px; }

.feedback-box {
    background: white; border-radius: 14px; padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 5px solid #4ECDC4;
}
.feedback-box h4 { margin-bottom: 10px; color: #1a1a2e; }
#feedbackContent { line-height: 2; font-size: 0.93em; }
#feedbackContent .good { color: #27ae60; font-weight: bold; }
#feedbackContent .warn { color: #e67e22; font-weight: bold; }
#feedbackContent .danger { color: #e74c3c; font-weight: bold; }
#feedbackContent .section-title { font-weight: bold; color: #1a1a2e; margin-top: 8px; display: block; }
#feedbackContent .hint { color: #888; font-style: italic; }

.theory-block {
    background: white; border-radius: 16px; padding: 28px; margin-bottom: 22px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.05);
}
.theory-block h3 {
    color: #1a1a2e; margin-bottom: 14px; font-size: 1.25em;
    padding-bottom: 10px; border-bottom: 2px solid #f0f0f0;
}
.theory-block h4 { color: #2c3e50; margin: 16px 0 8px; font-size: 1.05em; }
.theory-block p { margin-bottom: 10px; color: #444; }
.highlight-text { color: #4ECDC4; font-weight: bold; }
.analogy-box {
    background: #f0fdf9; border: 1px solid #4ECDC4; border-radius: 10px; padding: 14px 18px; margin: 12px 0;
}
.formula-box {
    background: #f8f9fa; border-left: 4px solid #4ECDC4; padding: 14px 18px; margin: 12px 0;
    font-family: 'Courier New', monospace; font-size: 1em; text-align: center; overflow-x: auto;
}
.formula-box.highlight { background: #fffdf0; border-left-color: #f39c12; font-size: 1.1em; font-weight: bold; }
.calculation-steps { margin: 12px 0; }
.calc-item {
    background: #f0f7ff; padding: 9px 14px; margin: 5px 0; border-radius: 8px;
    font-family: 'Courier New', monospace; font-size: 0.92em;
}
.note-text { color: #666; font-style: italic; margin-top: 8px; font-size: 0.93em; }
.formant-detail { padding: 18px; border-radius: 12px; margin: 16px 0; }
.f1-detail { background: #fff5f5; border: 1px solid #ffcccc; }
.f2-detail { background: #f0fdf9; border: 1px solid #b3ece0; }
.f3-detail { background: #fffdf5; border: 1px solid #ffe5a3; }
.formant-detail h4 { margin-top: 0; }
.formant-rule { font-size: 1.02em; color: #2c3e50; margin-bottom: 8px; }
.formant-detail ul { padding-left: 20px; }
.formant-detail li { margin: 5px 0; color: #555; font-size: 0.93em; }
.formant-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 0.88em; }
.formant-table th { background: #f5f5f5; padding: 8px 10px; text-align: left; font-size: 0.85em; }
.formant-table td { padding: 8px 10px; border-bottom: 1px solid #eee; }
.table-scroll { overflow-x: auto; }

.full-table {
    width: 100%; border-collapse: collapse; background: white; border-radius: 12px;
    overflow: hidden; margin: 12px 0; font-size: 0.88em;
}
.full-table thead { background: #1a1a2e; color: white; }
.full-table th, .full-table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #eee; }
.full-table tbody tr:hover { background: #f8f9fa; }
.col-highlight { color: #4ECDC4; font-weight: bold; }

.btn-report {
    display: block; margin: 0 auto 18px; padding: 13px 32px; background: #1a1a2e;
    color: white; border: none; border-radius: 12px; font-size: 1em; font-weight: bold;
    cursor: pointer; font-family: inherit;
}
.btn-report:hover { background: #2c3e50; }

.report-box {
    background: #1a1a2e; color: #4ECDC4; padding: 24px; border-radius: 14px;
    font-family: 'Consolas', monospace; font-size: 0.88em; line-height: 1.8;
    white-space: pre-wrap; overflow-x: auto; max-height: 500px; overflow-y: auto;
}

footer { text-align: center; padding: 30px; background: #1a1a2e; color: #aaa; font-size: 0.85em; line-height: 2; }

@media (max-width: 768px) {
    header h1 { font-size: 1.8em; }
    .lab-container { flex-direction: column; }
    .control-panel { position: static; flex: auto; }
    .result-panel { min-width: auto; }
    .nav-container { flex-direction: column; gap: 8px; }
    .nav-links { justify-content: center; }
    section { padding: 30px 15px; }
    section h2 { font-size: 1.5em; }
}
