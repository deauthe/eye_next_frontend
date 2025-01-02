"use client";

import { useEffect, useState } from 'react';
import { Editor } from '@/editor/components/Editor/Editor';
import { MobileWarning } from './components/Mobile_Warning';
import { EditorHeader } from './components/Editor_Header';

export default function EditorPage() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is typical tablet breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    if (isMobile) {
        return <MobileWarning />;
    }

    return (
        <>
            <EditorHeader />
            <br />
            <div className="container mx-auto py-4">
                <Editor />
            </div>
        </>
    );
}