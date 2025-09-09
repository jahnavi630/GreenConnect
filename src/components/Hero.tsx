import { Button } from "@/components/ui/button";
import { ArrowRight, TreePine, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const stats = [
    { icon: TreePine, value: "50,000+", label: "Trees Planted" },
    { icon: Users, value: "25,000+", label: "Active Volunteers" },
    { icon: MapPin, value: "200+", label: "Indian Cities" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-eco-forest/80 to-eco-green/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Plant Trees,
            <br />
            <span className="text-eco-mint">Transform India</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of eco-warriors across India in our mission to create greener cities. 
            Plant trees, adopt saplings, and track their growth in your community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-eco-forest hover:bg-white/90 text-lg px-8 py-6" asChild>
              <Link to="/events">
                Start Planting Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-eco-forest text-lg px-8 py-6"
              asChild
            >
              <Link to="/adopt">Adopt a Tree</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <stat.icon className="w-8 h-8 text-eco-mint mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-eco-mint/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-eco-earth/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};

export default Hero;