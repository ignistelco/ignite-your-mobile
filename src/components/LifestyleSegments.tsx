
import { Card, CardContent } from "@/components/ui/card";

const lifestyleSegments = [
  {
    title: "Adventure Seekers",
    description: "Rugged devices and unlimited data for outdoor enthusiasts",
    image: "photo-1518495973542-4542c06a5843",
    color: "from-green-400 to-blue-500"
  },
  {
    title: "Creative Professionals", 
    description: "High-performance devices with premium storage and editing apps",
    image: "photo-1581091226825-a6a2a5aee158",
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Tech Innovators",
    description: "Latest flagship devices with early access to new features",
    image: "photo-1488590528505-98d2b5aba04b",
    color: "from-blue-400 to-cyan-500"
  },
  {
    title: "Fitness Enthusiasts",
    description: "Health-focused bundles with smartwatches and fitness apps",
    image: "photo-1581090464777-f3220bbe1b8b",
    color: "from-orange-400 to-red-500"
  },
  {
    title: "Business Leaders",
    description: "Enterprise-grade security with productivity-focused features",
    image: "photo-1470813740244-df37b8c1edcb",
    color: "from-gray-600 to-gray-800"
  },
  {
    title: "Content Creators",
    description: "Camera-centric devices with unlimited cloud storage",
    image: "photo-1500673922987-e212871fec22",
    color: "from-yellow-400 to-orange-500"
  }
];

const LifestyleSegments = () => {
  return (
    <section id="lifestyle" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold mb-6">
            Find Your 
            <span className="bg-ignis-gradient bg-clip-text text-transparent"> Lifestyle </span>
            Match
          </h2>
          <p className="text-xl font-opensans text-gray-600 max-w-3xl mx-auto">
            We've curated eight distinct lifestyle segments, each with carefully selected device bundles 
            and plans designed to amplify your passions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lifestyleSegments.map((segment, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/${segment.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                  alt={segment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${segment.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-poppins font-bold mb-3 group-hover:text-ignis-purple transition-colors">
                  {segment.title}
                </h3>
                <p className="font-opensans text-gray-600 leading-relaxed">
                  {segment.description}
                </p>
                <div className="mt-4 flex items-center text-ignis-orange font-roboto font-medium group-hover:text-ignis-purple transition-colors cursor-pointer">
                  Explore Plans
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
