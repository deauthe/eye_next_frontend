"use client";
import React from 'react';
import { Laptop, Tablet, Smartphone } from 'lucide-react';
import Link from 'next/link';

export const MobileWarning: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4">
                    <div className="relative">
                        <Smartphone className="w-16 h-16 text-red-500" />
                        <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-red-500 -rotate-45 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <Tablet className="w-16 h-16 text-green-500" />
                    <Laptop className="w-16 h-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Desktop View Required</h2>
                <p className="text-gray-600">
                    Our design editor requires a larger screen for the best experience.
                    Please switch to a tablet or desktop device to access all features.
                </p>
                <div className="pt-4">
                    <Link href="/" className="text-primary hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};