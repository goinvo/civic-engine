'use client';

import Link from 'next/link';
import { GraduationCap, Users, ArrowRight, BookOpen, MessageSquare, Award } from 'lucide-react';

export default function EducationDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-4 border-black dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-sm font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-black dark:text-white mt-4 mb-2">
            Civic Engine Education
          </h1>
          <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium max-w-2xl">
            Interactive civic education tools for classrooms. Students explore policies, 
            form opinions, discuss with peers, and reflect on their civic identity.
          </p>
        </div>
      </div>

      {/* Demo Cards */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Demo */}
          <Link 
            href="/education/student"
            className="group bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-6 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#2F3BBD] border-2 border-black flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-black text-black dark:text-white">
                Student Demo
              </h2>
            </div>
            
            <p className="font-body text-gray-700 dark:text-gray-300 mb-6">
              Experience the full student journey: explore policies, learn about civic issues, 
              share your opinions, discuss with classmates, and build your civic profile.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#2F3BBD]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Explore age-appropriate policy content
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#2F3BBD]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Discuss and engage with peers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#2F3BBD]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Build a shareable civic profile
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-bold text-[#2F3BBD] group-hover:gap-3 transition-all">
              Try Student Demo
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* Teacher Demo */}
          <Link 
            href="/education/teacher"
            className="group bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-6 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#C91A2B] border-2 border-black flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-black text-black dark:text-white">
                Teacher Demo
              </h2>
            </div>
            
            <p className="font-body text-gray-700 dark:text-gray-300 mb-6">
              See the teacher dashboard: create classes, select policy sets for different 
              grade levels, monitor student progress, and view class analytics.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#C91A2B]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Create and manage class cohorts
                </span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#C91A2B]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select grade-appropriate policy sets
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#C91A2B]" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Share class civic profile
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-bold text-[#C91A2B] group-hover:gap-3 transition-all">
              Try Teacher Demo
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Component Showcase Link */}
        <div className="mt-8 text-center">
          <Link 
            href="/showcase"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            View Component Showcase →
          </Link>
        </div>
      </div>
    </div>
  );
}
