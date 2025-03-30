import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, FileText, GraduationCap, MessageCircle, Users } from "lucide-react";

// Import HomePage types from data file
import { HomePage, HomepageSection } from "../app/api/homepage/_data";

async function getHomepageData() {
  // Define base URL based on environment
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  
  try {
    // Use relative URL to avoid CORS issues in production
    const apiUrl = baseUrl ? `${baseUrl}/api/homepage` : '/api/homepage';
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error("Failed to fetch homepage data:", res.statusText);
      throw new Error("Failed to fetch homepage data");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error in getHomepageData:", error);
    // Return mock data as fallback
    return {
      hero: {
        name: "Professor Abolaji",
        title: "Professor of Biochemistry",
        subtitle: "Welcome to my professional portfolio",
        role: "Biochemist & Researcher",
        position: "Professor & Director",
        department: "Department of Biochemistry",
        institution: "University of Ibadan",
        description: "I'm a biochemist specializing in neurosciences and toxicology, with a focus on understanding oxidative stress mechanisms in neurodegenerative disorders.",
        imageUrl: null
      },
      sections: []
    };
  }
}

export default async function Home() {
  // Fetch homepage data
  const homepageData: HomePage | null = await getHomepageData();
  
  // If no data, show a default message
  if (!homepageData) {
    return <div className="container mx-auto py-20 text-center">Failed to load homepage data</div>;
  }
  
  const { hero, sections } = homepageData;
  
  // Filter enabled sections and sort by order
  const enabledSections = sections
    .filter((section: HomepageSection) => section.enabled)
    .sort((a: HomepageSection, b: HomepageSection) => a.order - b.order);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            <div className="md:w-1/2 lg:w-2/5 flex flex-col items-center md:items-start">
              <div className="aspect-square w-full max-w-md border rounded-xl relative overflow-hidden shadow-md bg-white">
                {hero?.imageUrl ? (
                  <img 
                    src={hero.imageUrl} 
                    alt={`Professor ${hero.name}`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                  Professor Image
                </div>
                )}
              </div>
              <div className="mt-6 text-center md:text-left w-full">
                <p className="text-red-600 font-medium">{hero?.position}</p>
                <p className="text-sm text-blue-600">{hero?.department}</p>
                <p className="text-sm text-blue-600">{hero?.institution}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 lg:w-3/5 space-y-6 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">{hero?.subtitle}</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-1 text-blue-700">{hero?.title}</h1>
              </div>
              <p className="text-xl md:text-2xl uppercase font-bold text-slate-600">{hero?.role}</p>
              <p className="text-lg text-slate-600 max-w-2xl">
                {hero?.description}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/portfolio">Portfolio</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/publications">Research and Publications</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Render sections based on their type and order */}
      {enabledSections.map((section: HomepageSection) => {
        switch (section.type) {
          case 'quickLinks':
            return <QuickLinksSection key={section.id} title={section.title} />;
          case 'foundation':
            return <FoundationSection key={section.id} title={section.title} />;
          case 'newsEvents':
            return <NewsEventsSection key={section.id} title={section.title} />;
          case 'research':
            return <ResearchSection key={section.id} title={section.title} />;
          case 'about':
            return <AboutSection key={section.id} title={section.title} content={section.content} imageUrl={section.imageUrl} />;
          case 'publications':
            return <PublicationsSection key={section.id} title={section.title} sourceId={section.sourceId} />;
          case 'gallery':
            return <GallerySection key={section.id} title={section.title} />;
          case 'custom':
            return <CustomSection key={section.id} title={section.title} content={section.content} imageUrl={section.imageUrl} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

// Custom reusable section component for custom content
function CustomSection({ title, content, imageUrl }: { title: string, content?: string, imageUrl?: string }) {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="flex items-center mb-8">
          <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {imageUrl && (
            <div className="aspect-video md:aspect-square relative rounded-xl overflow-hidden shadow-md">
              <img 
                src={imageUrl}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <div className={`${imageUrl ? 'lg:col-span-2' : 'lg:col-span-3'} content-spacing`}>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content || '' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// About section imported from the About page
function AboutSection({ title, content, imageUrl }: { title: string, content?: string, imageUrl?: string }) {
  return (
    <section className="section-spacing bg-slate-50">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {imageUrl && (
            <div className="aspect-video md:aspect-square relative rounded-xl overflow-hidden shadow-md">
              <img 
                src={imageUrl}
                alt={title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <div className={`${imageUrl ? 'lg:col-span-2' : 'lg:col-span-3'} content-spacing`}>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content || '' }} />
            
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Publications section imported from Publications
function PublicationsSection({ title, sourceId }: { title: string, sourceId?: string }) {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
          </div>
          
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/research-and-publications">View All Publications</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
            <CardHeader>
              <CardTitle>Oxidative Stress in Neurodegenerative Disorders</CardTitle>
              <CardDescription>2023 • Journal of Biochemistry</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Recent findings on mechanisms of oxidative stress in Alzheimer's and Parkinson's disease models.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/research-and-publications" className="inline-flex items-center">
                  Read Publication <span className="ml-1">→</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
            <CardHeader>
              <CardTitle>Neuroprotective Effects of Natural Compounds</CardTitle>
              <CardDescription>2022 • Journal of Medicinal Chemistry</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Evaluation of natural compounds and their potential therapeutic applications in neurodegenerative disorders.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/research-and-publications" className="inline-flex items-center">
                  Read Publication <span className="ml-1">→</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
            <CardHeader>
              <CardTitle>Biochemical Markers in Environmental Toxicology</CardTitle>
              <CardDescription>2021 • Environmental Science & Technology</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Identification and validation of biomarkers for environmental toxin exposure assessment.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href="/research-and-publications" className="inline-flex items-center">
                  Read Publication <span className="ml-1">→</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Gallery section imported from Gallery page
function GallerySection({ title }: { title: string }) {
  return (
    <section className="section-spacing bg-slate-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
          </div>
          
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Laboratory Work</span>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium">Research in Progress</span>
            </div>
          </div>
          
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Conference Presentation</span>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium">International Biochemistry Conference 2023</span>
            </div>
          </div>
          
          <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-md group">
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Research Team</span>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium">Our dedicated team of researchers and students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component for Quick Links section
function QuickLinksSection({ title }: { title: string }) {
  return (
    <section className="section-spacing-sm bg-slate-50">
      <div className="container">
        <div className="flex items-center mb-8">
          <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <Link href="/about" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-full text-center transition-all hover:shadow-md hover:bg-blue-50 hover:-translate-y-1 duration-300">
                <span className="text-4xl mb-3">👨‍🔬</span>
                <span className="font-medium text-blue-600 group-hover:text-blue-700">About Me</span>
              </div>
            </Link>
            
            <Link href="/membership" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-full text-center transition-all hover:shadow-md hover:bg-blue-50 hover:-translate-y-1 duration-300">
                <span className="text-4xl mb-3">🔖</span>
                <span className="font-medium text-blue-600 group-hover:text-blue-700">Memberships</span>
              </div>
            </Link>
            
            <Link href="/cooperation" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-full text-center transition-all hover:shadow-md hover:bg-blue-50 hover:-translate-y-1 duration-300">
                <span className="text-4xl mb-3">🤝</span>
                <span className="font-medium text-blue-600 group-hover:text-blue-700">Cooperation</span>
              </div>
            </Link>
            
            <Link href="/foundation" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-full text-center transition-all hover:shadow-md hover:bg-blue-50 hover:-translate-y-1 duration-300">
                <span className="text-4xl mb-3">🏛️</span>
                <span className="font-medium text-blue-600 group-hover:text-blue-700">Foundation</span>
              </div>
            </Link>
            
            <Link href="/news-events" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-full text-center transition-all hover:shadow-md hover:bg-blue-50 hover:-translate-y-1 duration-300">
                <span className="text-4xl mb-3">📰</span>
                <span className="font-medium text-blue-600 group-hover:text-blue-700">News & Events</span>
              </div>
            </Link>
            
            <Link href="/gallery" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-full text-center transition-all hover:shadow-md hover:bg-blue-50 hover:-translate-y-1 duration-300">
                <span className="text-4xl mb-3">📸</span>
                <span className="font-medium text-blue-600 group-hover:text-blue-700">Gallery</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
  );
}
      
// Component for Foundation section
function FoundationSection({ title }: { title: string }) {
  return (
      <section className="section-spacing">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
          </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="aspect-video md:aspect-square relative rounded-xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                <span className="text-blue-400 font-medium">Foundation Image</span>
              </div>
            </div>
            
            <div className="lg:col-span-2 content-spacing">
              <h3 className="h3 text-slate-800">Bridging the Gap in Science Education</h3>
              <div className="space-y-4 text-slate-600">
                <p>
                  The Abolaji Foundation is committed to advancing science education and 
                  research opportunities in Nigeria and across Africa. We believe that scientific knowledge 
                  and innovation are powerful tools for addressing societal challenges and improving lives.
                </p>
                <p>
                  Our initiatives focus on enhancing science education in underserved 
                  communities, supporting promising young scientists through scholarships and mentorship, 
                  and promoting public understanding of science through community engagement.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">5,000+</div>
                  <div className="text-sm text-slate-600">Students Reached</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">75+</div>
                  <div className="text-sm text-slate-600">Scholarships Awarded</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">25+</div>
                  <div className="text-sm text-slate-600">Communities Served</div>
                </div>
              </div>
              
              <Button asChild size="lg">
                <Link href="/foundation">Learn More About the Foundation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
  );
}
      
// Component for News & Events section
function NewsEventsSection({ title }: { title: string }) {
  return (
      <section className="section-spacing bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4">
            <div>
              <div className="text-blue-200 text-sm font-medium mb-1">Stay Updated</div>
            <h2 className="h2">{title}</h2>
            </div>
            <Button asChild variant="secondary" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full">
              <Link href="/news-events">View All News & Events</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm text-white border-none hover:bg-white/15 transition-colors hover:shadow-lg">
              <CardHeader>
                <CardTitle>Latest Research Grant Awarded</CardTitle>
                <CardDescription className="text-blue-100">March 15, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Professor Abolaji has been awarded a prestigious research grant to continue his groundbreaking work on Drosophila melanogaster models for neurodegenerative disorders.</p>
              </CardContent>
              <CardFooter>
                <Link href="/news-events" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  Read more <span className="ml-1">→</span>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm text-white border-none hover:bg-white/15 transition-colors hover:shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Conference Presentation</CardTitle>
                <CardDescription className="text-blue-100">April 2, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Professor Abolaji will be presenting his latest findings at the International Conference on Biochemistry and Molecular Biology in London.</p>
              </CardContent>
              <CardFooter>
                <Link href="/news-events" className="text-blue-200 hover:text-white transition-colors inline-flex items-center">
                  Read more <span className="ml-1">→</span>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
  );
}
      
// Component for Research Highlights section
function ResearchSection({ title }: { title: string }) {
  return (
      <section className="section-spacing bg-slate-50">
        <div className="container">
          <div className="flex items-center mb-8">
            <div className="bg-orange-200 py-3 px-6 rounded-sm shadow-sm">
            <h2 className="h2 text-slate-800">{title}</h2>
          </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle>Neurodegenerative Disorders</CardTitle>
                <CardDescription>Exploring biochemical mechanisms and therapeutic targets</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Investigating the roles of oxidative stress and mitochondrial dysfunction 
                  in the pathogenesis of neurodegenerative diseases, with a focus on 
                  developing novel therapeutic approaches.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio" className="inline-flex items-center">
                    View Research <span className="ml-1">→</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle>Natural Product Pharmacology</CardTitle>
                <CardDescription>Harnessing nature's potential for medicine</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Screening and characterizing bioactive compounds from African medicinal 
                  plants with potential applications in the treatment of oxidative 
                stress-related disorders and neurodegenerative diseases.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio" className="inline-flex items-center">
                    View Research <span className="ml-1">→</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle>Environmental Toxicology</CardTitle>
              <CardDescription>Assessing health impacts of environmental toxins</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                Evaluating the biochemical and molecular mechanisms underlying the toxicity 
                of environmental pollutants and their potential role in the development of 
                neurological disorders and other health conditions.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio" className="inline-flex items-center">
                    View Research <span className="ml-1">→</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
  );
}
