'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import LoginModal from "@/components/ui/LoginModal";
import { 
  FolderIcon, 
  UsersIcon, 
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await axios.get('/api/users/me');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    } else {
      setShowLoginModal(true);
    }
  };
  const features = [
    {
      icon: FolderIcon,
      title: "Smart Project Management",
      description: "AI-powered project organization with intuitive drag-and-drop interfaces and automated workflows."
    },
    {
      icon: UsersIcon,
      title: "Real-time Collaboration",
      description: "Connect your team instantly with live updates, comments, and seamless communication tools."
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "Deep insights with customizable dashboards, performance metrics, and predictive analytics."
    },
    {
      icon: CheckCircleIcon,
      title: "Intelligent Task Automation",
      description: "Automate repetitive tasks with smart workflows and AI-driven task prioritization."
    },
    {
      icon: SparklesIcon,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations and automated reporting to optimize your workflow."
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "Bank-level security with role-based access control and comprehensive audit trails."
    },
    {
      icon: ClockIcon,
      title: "Time Tracking & Billing",
      description: "Accurate time tracking with automated billing and detailed productivity reports."
    },
    {
      icon: CheckCircleIcon,
      title: "Goal Achievement",
      description: "Set and track goals with milestone management and progress visualization."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ProjectHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setShowLoginModal(true)}>Sign In</Button>
                  <Button onClick={handleGetStarted}>Get Started Free</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
            <SparklesIcon className="h-4 w-4 mr-2" />
            New: AI-Powered Project Insights Now Available
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Workflow</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            The most intuitive project management platform that adapts to your team's needs. 
            Boost productivity by 40% with AI-powered insights and seamless collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleGetStarted}
            >
              Start Free Trial
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 hover:bg-gray-50"
              onClick={() => setShowLoginModal(true)}
            >
              Watch Demo
            </Button>
          </div>
          <div className="mt-12 text-sm text-gray-500">
            ✨ No credit card required • 🚀 Setup in 2 minutes • 🔒 Enterprise-grade security
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to manage projects efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join 50,000+ teams who've increased their productivity by 40% with ProjectHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
              onClick={handleGetStarted}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
          <div className="mt-8 text-blue-100">
            💳 No credit card required • 📞 24/7 support • 🎯 30-day money-back guarantee
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                ProjectHub
              </h3>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Empowering teams worldwide to achieve more with intelligent project management.
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2024 ProjectHub. All rights reserved. Built with ❤️ for productive teams.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}