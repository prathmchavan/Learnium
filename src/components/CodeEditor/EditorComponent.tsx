"use client"

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useOaContext } from '@/context/OaContext';

interface Runtime {
    language: string;
    version: string;
    aliases: string[];
}

const EditorComponent: React.FC = () => {


    const { setCode,
        languages,
        output,
        runCode,
        handleLanguageChange,
        selectedLanguage } = useOaContext();

    return (
        <div className="flex flex-col items-center p-4 text-black">
            <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="mb-4 p-2 border rounded "
            >
                {languages.map((lang) => (
                    <option key={lang.language} value={lang.language}>
                        {lang.language} ({lang.version})
                    </option>
                ))}
            </select>

            <div className="w-full h-96 border rounded">
                <Editor
                    height="100%"
                    defaultLanguage={selectedLanguage}
                    defaultValue="// Write your code here"
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                />
            </div>

            <button
                onClick={runCode}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
                Run Code
            </button>

            <div className="mt-4 w-full bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default EditorComponent;
