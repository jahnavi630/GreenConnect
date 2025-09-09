import { Button } from "@/components/ui/button";
import { TreePine, Heart, Calendar, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Plantation Events",
      description: "Join community-driven tree plantation drives across Indian cities. From Mumbai to Delhi, Chennai to Kolkata - make your city greener.",
      cta: "View Events",
      href: "/events",
      color: "from-eco-green to-eco-forest"
    },
    {
      icon: Heart,
      title: "Adopt & Nurture",
      description: "Adopt trees in your locality and track their growth. Get reminders for watering, pruning, and care to ensure healthy tree development.",
      cta: "Adopt Now",
      href: "/adopt",
      color: "from-eco-earth to-warning"
    },
    {
      icon: TreePine,
      title: "Track Growth",
      description: "Monitor your adopted trees with photos, notes, and growth milestones. Share your tree's journey and inspire others to participate.",
      cta: "My Trees",
      href: "/dashboard",
      color: "from-eco-forest to-eco-green"
    },
    {
      icon: Coins,
      title: "Support & Donate",
      description: "Support tree maintenance, plantation drives, and NGO activities. Every contribution helps make India greener and more sustainable.",
      cta: "Donate Now",
      href: "/donate",
      color: "from-eco-mint to-eco-green"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How GreenConnect Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join India's largest tree plantation network. From planting to adoption, 
            tracking to donations - be part of the green revolution.
          </p>
        </div>

        <style>{`
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
          }
          
          .feature-item {
            background: white;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid #e5e7eb;
          }
          
          .feature-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .feature-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, #16a34a, #15803d);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            transition: transform 0.3s ease;
          }
          
          .feature-item:hover .feature-icon {
            transform: scale(1.1);
          }
          
          .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
          }
          
          .feature-description {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          
          .feature-button {
            width: 100%;
            padding: 12px 24px;
            background: transparent;
            border: 2px solid #16a34a;
            color: #16a34a;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            transition: all 0.3s ease;
          }
          
          .feature-button:hover {
            background: #16a34a;
            color: white;
          }
        `}</style>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={feature.title} className="feature-item">
              <div className="feature-icon">
                <feature.icon size={24} style={{ color: 'white' }} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <Link to={feature.href} className="feature-button">
                {feature.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;