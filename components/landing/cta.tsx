'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Badge variant="secondary" className="mb-8 bg-white/20 text-white border-white/30">
          <Sparkles className="w-4 h-4 mr-2" />
          Join 10,000+ users building better habits
        </Badge>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
          Ready to build habits
          <br />
          that actually stick?
        </h2>
        
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Start your journey today with the most intuitive habit tracker. 
          No credit card required, free forever.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={onGetStarted}
            size="lg"
            variant="secondary"
            className="group px-8 py-4 bg-white text-primary hover:bg-white/90 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start building habits
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>No credit card needed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Setup in 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}