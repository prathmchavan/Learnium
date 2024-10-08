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
        <div className="flex flex-col px-10 justify-center align-middle w-full ">
            <div className='flex justify-between'>
                <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="mb-4 p-2 border-[#432c83] rounded text-white border-2 "
                >
                    {languages.map((lang) => (
                        <option key={lang.language} value={lang.language}>
                            {lang.language} ({lang.version})
                        </option>
                    ))}
                </select>
                <div>
                <button
                    onClick={runCode}
                    className="p-2 bg-[#432c83] text-white rounded"
                >
                    Run Code
                </button>
            </div>
            </div>

            <div className="w-full h-96  flex flex-row gap-10">
                <Editor
                    height="100%"
                    defaultLanguage={selectedLanguage}
                    defaultValue="// Write your code here"
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    className='border-2 border-[#432c83]'
                />
                <div className="w-full  p-4 rounded border-2 border-[#432c83] h-96">
                    <h3 className="text-lg font-bold mb-2 text-white text-center">Output</h3>
                    <pre>{output}</pre>
                </div>
            </div>
          
        </div>
    );
};

export default EditorComponent;
