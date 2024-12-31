"use client";

import { Editor } from '@/editor/components/Editor/Editor';

export default function EditorPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Design Editor</h1>
            <Editor />
        </div>
    );
}