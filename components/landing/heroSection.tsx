"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, CheckCircle, Play } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-primary/40 rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-primary/50 rounded-full animate-pulse" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <Badge
          variant="secondary"
          className="mb-8 animate-fade-in px-4 py-2 text-sm"
        >
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          Trusted by 10,000+ users worldwide
        </Badge>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-slide-in-up">
          Build habits that
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            actually stick
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          The most intuitive habit tracker that helps you build consistency,
          track progress, and transform your daily routine.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="group px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start building habits
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Social proof */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground animate-slide-in-up mb-20"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Setup in 30 seconds</span>
          </div>
        </div>

        {/* App preview mockup */}
        <div className="animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Card className="shadow-lg border">
                {/* Mock browser header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center">
                    <Badge variant="outline" className="text-xs">
                      dailydone.app
                    </Badge>
                  </div>
                </div>

                {/* Mock app content */}
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg" />
                      <div>
                        <div className="w-20 h-4 bg-muted rounded animate-pulse" />
                        <div className="w-16 h-3 bg-muted/60 rounded mt-1 animate-pulse" />
                      </div>
                    </div>
                    <Button size="sm">Add Habit</Button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mt-6">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="text-center">
                        <div className="w-full h-3 bg-muted rounded mb-2 animate-pulse" />
                        <div className="w-8 h-8 bg-green-100 border-2 border-green-200 rounded-full mx-auto animate-pulse" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mt-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-primary rounded-full" />
                          <div className="flex-1 h-4 bg-muted rounded animate-pulse" />
                          <div className="w-12 h-4 bg-muted rounded animate-pulse" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
