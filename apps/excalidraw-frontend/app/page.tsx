import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="text-center py-16">
        <h1 className="text-4xl font-bold">
          Collaborative Whiteboarding
          <span className="text-blue-600 block">Made Simple</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Create, collaborate, and share diagrams. No sign-up required.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/signin">
            <Button>
              Sign in <Pencil className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="grid gap-6 px-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Share2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Real-time Collaboration</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Work together with your team instantly.
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Multiplayer Editing</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Edit the same canvas with others in real-time.
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Smart Drawing</h3>
            </div>
            <p className="mt-2 text-gray-600">
              Helps you create perfect diagrams easily.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to start creating?</h2>
        <p className="mt-4">Join thousands of users creating amazing diagrams.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="secondary">
            Open Canvas <Pencil className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="text-white border-white">
            View Gallery
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>© 2024 Excalidraw Clone. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com" className="hover:text-blue-600">
            <Github className="h-5 w-5" />
          </a>
          <a href="#">
            <Download className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
