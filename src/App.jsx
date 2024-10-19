// src/App.jsx
import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import Output from './components/Output';
import executeCode from './api';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    const result = await executeCode(code, language);
    setOutput(result.stdout || result.stderr);
  };

  return (
    <div>
      <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      <CodeEditor language={language} code={code} onCodeChange={setCode} />
      <button onClick={handleRunCode}>Run Code</button>
      <Output result={output} />
    </div>
  );
};

export default App;
