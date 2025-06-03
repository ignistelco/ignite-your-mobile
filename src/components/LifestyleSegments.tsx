
import { Card, CardContent } from "@/components/ui/card";

const lifestyleSegments = [
  {
    title: "Adventure Seekers",
    description: "Rugged devices and unlimited data for outdoor enthusiasts",
    image: "photo-1518495973542-4542c06a5843",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Creative Professionals", 
    description: "High-performance devices with premium storage and editing apps",
    image: "photo-1581091226825-a6a2a5aee158",
    color: "from-violet-500 to-purple-600"
  },
  {
    title: "Tech Innovators",
    description: "Latest flagship devices with early access to new features",
    image: "photo-1488590528505-98d2b5aba04b",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Fitness Enthusiasts",
    description: "Health-focused bundles with smartwatches and fitness apps",
    image: "photo-1581090464777-f3220bbe1b8b",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Business Leaders",
    description: "Enterprise-grade security with productivity-focused features",
    image: "photo-1470813740244-df37b8c1edcb",
    color: "from-slate-600 to-slate-800"
  },
  {
    title: "Content Creators",
    description: "Camera-centric devices with unlimited cloud storage",
    image: "photo-1500673922987-e212871fec22",
    color: "from-amber-500 to-orange-600"
  }
];

const LifestyleSegments = () => {
  return (
    <section id="lifestyle" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-poppins font-black mb-8 tracking-tight">
            Find Your 
            <span className="bg-ignis-gradient bg-clip-text text-transparent block mt-2"> Lifestyle </span>
            <span className="block mt-2">Match</span>
          </h2>
          <p className="text-xl lg:text-2xl font-opensans text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            We've curated eight distinct lifestyle segments, each with carefully selected device bundles 
            and plans designed to amplify your passions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {lifestyleSegments.map((segment, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 bg-white/80 backdrop-blur-sm rounded-2xl">
              <div className="relative h-56 lg:h-64 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/${segment.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={segment.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-70 group-hover:opacity-50 transition-opacity duration-700`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Floating Number */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white font-poppins font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              
              <CardContent className="p-8">
                <h3 className="text-2xl font-poppins font-bold mb-4 group-hover:text-ignis-purple transition-colors">
                  {segment.title}
                </h3>
                <p className="font-opensans text-slate-600 leading-relaxed text-lg mb-6">
                  {segment.description}
                </p>
                <div className="flex items-center text-ignis-orange font-roboto font-semibold group-hover:text-ignis-purple transition-colors cursor-pointer text-lg">
                  Explore Plans
                  <svg className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSegments;
