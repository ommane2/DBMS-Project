// import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Clock, Trophy, Users } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-violet-600 to-indigo-700 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Create and Join Interactive Quizzes
          </h1>
          <p className="mt-6 text-xl text-violet-100">
            A modern platform for creating timed quizzes, tracking results, and engaging participants
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/admin/login">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-violet-100">
                Admin Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/user/join">
              <Button size="lg" variant="outline" className="border-white text-white bg-primary hover:bg-white/10">
                Join a Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Quiz Features
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-violet-600" />}
              title="Timed Quizzes"
              description="Set start and end times for your quizzes to control when participants can join and submit answers."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-violet-600" />}
              title="Multiple Choice Questions"
              description="Create engaging multiple-choice questions with customizable options and correct answers."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-violet-600" />}
              title="Instant Results"
              description="View participant scores and performance metrics immediately after quiz completion."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-violet-600" />}
              title="Easy Participation"
              description="Users can join quizzes with just a name and quiz code - no account required."
            />
            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 text-violet-600" />}
              title="Simple Navigation"
              description="Intuitive interface for both quiz creators and participants."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-violet-600" />}
              title="Detailed Analytics"
              description="Comprehensive insights into quiz performance and participant results."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-700 p-8 text-center text-white shadow-xl sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to create your first quiz?</h2>
          <p className="mt-4 text-lg text-violet-100">
            Get started in minutes with our easy-to-use quiz creation tools.
          </p>
          <div className="mt-8">
            <Link to="/admin/login">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-violet-100">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 px-4 py-8 text-center text-gray-400 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Quiz App. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
