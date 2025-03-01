import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  FolderKanban,
  Image as LucideImage,
  Palette,
  QrCode,
  Star,
} from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Emily Johnson",
    date: "2 days ago",
    text: "This app has transformed my daily routine, making everything so much easier!",
  },
  {
    name: "Michael Lee",
    date: "1 week ago",
    text: "A must-have app! It has greatly improved my productivity and organization.",
  },
  {
    name: "Sophia Martinez",
    date: "3 days ago",
    text: "I love how intuitive and user-friendly this app is. Highly recommend it!",
  },
];

export default function LandingPage() {
  

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            <span className="text-xl font-bold">QR Code Manager</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Create QR
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="#">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="#">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className=" container mx-auto w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Simplify Your QR Code Experience
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Effortlessly create, manage, and track all your QR codes in
                    one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="#">Join us now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#">Request demo</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[600px] lg:max-w-none">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <LucideImage className="w-full h-full object-cover opacity-5 bg-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <QrCode className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Easy QR Code Generation</h3>
                <p className="text-muted-foreground">
                  Create QR codes effortlessly and access them anytime through
                  our user-friendly interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <FolderKanban className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Organization of Codes</h3>
                <p className="text-muted-foreground">
                  Easily categorize and find your QR codes and generated lists
                  with our robust system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg p-6 text-center sm:col-span-2 lg:col-span-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Customization Options</h3>
                <p className="text-muted-foreground">
                  Modify the appearance of your QR codes to suit your style and
                  needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by Users Worldwide
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers have to say about their experience with
                  QR Code Manager.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="bg-chart-3 flex items-center justify-center">
                        <AvatarFallback>{testimonial.name.charAt(0)+testimonial.name.split(" ")[1].charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500">
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Subscribe to our newsletter
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay updated with the latest features and news about QR Code
                  Manager.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Input your email"
                    type="email"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            <p className="text-sm text-muted-foreground">
              © 2024 QR Code Manager. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 md:flex md:gap-4 xl:gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    User guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Plans</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Personal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Start up
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Organization
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 flex flex-col items-center justify-between gap-4 border-t py-4 md:h-16 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            Made with ❤️ by QR Code Manager Team
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
