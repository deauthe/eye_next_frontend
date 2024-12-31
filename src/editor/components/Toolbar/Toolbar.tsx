import React from 'react';
import { ViewSelector } from './sections/ViewSelector/ViewSelector';
import { DesignUpload } from './sections/DesignUpload/DesignUpload';
import { ColorPicker } from './sections/ColorPicker/ColorPicker';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

export const Toolbar: React.FC = () => {
    return (
        <div className="space-y-6">
            <ViewSelector />
            <DesignUpload />
            <ColorPicker />

            <div className="pt-4 border-t">
                <Button className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Export Design
                </Button>
            </div>
        </div>
    );
};