import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MapPin, TreePine, Droplets, Calendar, SearchIcon, FilterIcon, Coins } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const AdoptTrees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState("all");
  const { toast } = useToast();

  const trees = [
    {
      id: 1,
      species: "Neem",
      scientificName: "Azadirachta indica",
      location: "Aarey Colony, Mumbai",
      city: "mumbai",
      age: "2 months",
      height: "45 cm",
      plantedDate: "2023-11-15",
      adoptionFee: 500,
      benefits: ["Air Purification", "Medicinal Properties", "Pest Control"],
      careLevel: "Easy",
      wateringFreq: "Twice a week",
      status: "available",
      image: "🌿"
    },
    {
      id: 2,
      species: "Banyan",
      scientificName: "Ficus benghalensis",
      location: "Central Park, Delhi",
      city: "delhi",
      age: "3 months",
      height: "62 cm",
      plantedDate: "2023-10-20",
      adoptionFee: 750,
      benefits: ["Oxygen Production", "Shade Provider", "Wildlife Habitat"],
      careLevel: "Medium",
      wateringFreq: "3 times a week",
      status: "available",
      image: "🌳"
    },
    {
      id: 3,
      species: "Mango",
      scientificName: "Mangifera indica",
      location: "Electronic City, Bangalore",
      city: "bangalore",
      age: "1 month",
      height: "30 cm",
      plantedDate: "2023-12-01",
      adoptionFee: 600,
      benefits: ["Fruit Production", "Carbon Absorption", "Soil Conservation"],
      careLevel: "Medium",
      wateringFreq: "Daily",
      status: "available",
      image: "🥭"
    },
    {
      id: 4,
      species: "Gulmohar",
      scientificName: "Delonix regia",
      location: "Marina Beach, Chennai",
      city: "chennai",
      age: "2 months",
      height: "38 cm",
      plantedDate: "2023-11-25",
      adoptionFee: 450,
      benefits: ["Beautiful Flowers", "Shade Provider", "Erosion Control"],
      careLevel: "Easy",
      wateringFreq: "Twice a week",
      status: "available",
      image: "🌺"
    },
    {
      id: 5,
      species: "Peepal",
      scientificName: "Ficus religiosa",
      location: "Victoria Memorial, Kolkata",
      city: "kolkata",
      age: "4 months",
      height: "75 cm",
      plantedDate: "2023-09-15",
      adoptionFee: 800,
      benefits: ["Sacred Tree", "24/7 Oxygen", "Cultural Significance"],
      careLevel: "Easy",
      wateringFreq: "Twice a week",
      status: "adopted",
      image: "🌳"
    },
    {
      id: 6,
      species: "Coconut",
      scientificName: "Cocos nucifera",
      location: "Kochi Backwaters, Kerala",
      city: "kochi",
      age: "6 months",
      height: "95 cm",
      plantedDate: "2023-07-20",
      adoptionFee: 900,
      benefits: ["Coastal Protection", "Multiple Uses", "Economic Value"],
      careLevel: "Medium",
      wateringFreq: "Daily",
      status: "available",
      image: "🥥"
    }
  ];

  const cities = [
    { value: "all", label: "All Cities" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "kochi", label: "Kochi" }
  ];

  const species = [
    { value: "all", label: "All Species" },
    { value: "neem", label: "Neem" },
    { value: "banyan", label: "Banyan" },
    { value: "mango", label: "Mango" },
    { value: "gulmohar", label: "Gulmohar" },
    { value: "peepal", label: "Peepal" },
    { value: "coconut", label: "Coconut" }
  ];

  const filteredTrees = trees.filter(tree => {
    const matchesSearch = tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tree.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || tree.city === selectedCity;
    const matchesSpecies = selectedSpecies === "all" || tree.species.toLowerCase() === selectedSpecies;
    return matchesSearch && matchesCity && matchesSpecies;
  });

  const handleAdopt = (treeId: number, species: string, fee: number) => {
    // This would normally redirect to payment gateway
    toast({
      title: "Redirecting to Payment",
      description: `Adopting ${species} tree for ₹${fee}. You'll be redirected to secure payment.`,
    });
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Easy": return { backgroundColor: '#d1fae5', color: '#065f46' };
      case "Medium": return { backgroundColor: '#fef3c7', color: '#92400e' };
      case "Hard": return { backgroundColor: '#fee2e2', color: '#991b1b' };
      default: return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <div className="adopt-trees-page">
      <style>{`
        .adopt-trees-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        
        .adopt-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px 40px;
        }
        
        .adopt-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .adopt-title {
          font-size: 3rem;
          font-weight: 700;
          color: #15803d;
          margin-bottom: 16px;
        }
        
        .adopt-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .filters-section {
          background: white;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .search-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }
        
        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
        }
        
        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }
        
        .trees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 24px;
        }
        
        .tree-item {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .tree-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        
        .tree-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        
        .tree-emoji {
          font-size: 3rem;
          margin-bottom: 8px;
        }
        
        .tree-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .tree-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .badge-available {
          background: #16a34a;
          color: white;
        }
        
        .badge-adopted {
          background: #9ca3af;
          color: white;
        }
        
        .tree-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }
        
        .tree-scientific {
          color: #6b7280;
          font-style: italic;
          font-size: 0.875rem;
          margin-bottom: 16px;
        }
        
        .tree-location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 16px;
        }
        
        .tree-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .info-item {
          text-align: center;
        }
        
        .info-label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
          margin-bottom: 4px;
        }
        
        .info-value {
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        .tree-care {
          display: flex;
          justify-content: space-around;
          margin-bottom: 16px;
          font-size: 0.875rem;
        }
        
        .care-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
        }
        
        .benefits-section {
          margin-bottom: 20px;
        }
        
        .benefits-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }
        
        .benefits-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .benefit-badge {
          padding: 4px 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #374151;
        }
        
        .adoption-section {
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }
        
        .adoption-fee {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        
        .fee-amount {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.25rem;
          font-weight: 700;
          color: #15803d;
        }
        
        .fee-label {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .adopt-button {
          width: 100%;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .button-available {
          background: #16a34a;
          color: white;
        }
        
        .button-available:hover {
          background: #15803d;
        }
        
        .button-adopted {
          background: #9ca3af;
          color: white;
          cursor: not-allowed;
        }
        
        .no-trees {
          text-align: center;
          padding: 64px 20px;
        }
        
        .no-trees-icon {
          color: #9ca3af;
          margin-bottom: 16px;
        }
        
        .no-trees-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
        
        .no-trees-text {
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .adopt-title {
            font-size: 2rem;
          }
          
          .filters-section {
            flex-direction: column;
          }
          
          .trees-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navigation />
      
      <div className="adopt-container">
        <div className="adopt-header">
          <h1 className="adopt-title">Adopt a Tree</h1>
          <p className="adopt-subtitle">
            Give a tree a loving home and watch it grow. Track your adopted tree's progress 
            and contribute to India's green cover expansion.
          </p>
        </div>

        <div className="filters-section">
          <div className="search-wrapper">
            <SearchIcon className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by species or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FilterIcon size={16} style={{ color: '#6b7280' }} />
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger style={{ width: '150px' }}>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
              <SelectTrigger style={{ width: '150px' }}>
                <SelectValue placeholder="Species" />
              </SelectTrigger>
              <SelectContent>
                {species.map((spec) => (
                  <SelectItem key={spec.value} value={spec.value}>
                    {spec.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="trees-grid">
          {filteredTrees.map((tree) => (
            <div key={tree.id} className="tree-item">
              <div className="tree-header">
                <div className="tree-emoji">{tree.image}</div>
                <div className="tree-badges">
                  <span className={`tree-badge ${tree.status === "available" ? "badge-available" : "badge-adopted"}`}>
                    {tree.status === "available" ? "Available" : "Adopted"}
                  </span>
                  <span className="tree-badge" style={getDifficultyColor(tree.careLevel)}>
                    {tree.careLevel}
                  </span>
                </div>
              </div>
              
              <h3 className="tree-title">{tree.species}</h3>
              <p className="tree-scientific">{tree.scientificName}</p>
              
              <div className="tree-location">
                <MapPin size={16} style={{ color: '#16a34a' }} />
                <span>{tree.location}</span>
              </div>

              <div className="tree-info">
                <div className="info-item">
                  <div className="info-label">Age</div>
                  <div className="info-value">{tree.age}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Height</div>
                  <div className="info-value">{tree.height}</div>
                </div>
              </div>

              <div className="tree-care">
                <div className="care-item">
                  <Droplets size={16} style={{ color: '#3b82f6' }} />
                  <span>{tree.wateringFreq}</span>
                </div>
                <div className="care-item">
                  <Calendar size={16} style={{ color: '#16a34a' }} />
                  <span>{tree.age} old</span>
                </div>
              </div>

              <div className="benefits-section">
                <div className="benefits-label">Benefits:</div>
                <div className="benefits-list">
                  {tree.benefits.map((benefit) => (
                    <span key={benefit} className="benefit-badge">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="adoption-section">
                <div className="adoption-fee">
                  <div className="fee-amount">
                    <Coins size={16} style={{ color: '#f59e0b' }} />
                    <span>₹{tree.adoptionFee}</span>
                  </div>
                  <span className="fee-label">Adoption Fee</span>
                </div>
                
                <button 
                  className={`adopt-button ${tree.status === "available" ? "button-available" : "button-adopted"}`}
                  onClick={() => handleAdopt(tree.id, tree.species, tree.adoptionFee)}
                  disabled={tree.status === "adopted"}
                >
                  {tree.status === "adopted" ? (
                    <>
                      <Heart size={16} style={{ fill: 'currentColor' }} />
                      Already Adopted
                    </>
                  ) : (
                    <>
                      <Heart size={16} />
                      Adopt This Tree
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTrees.length === 0 && (
          <div className="no-trees">
            <TreePine className="no-trees-icon" size={64} />
            <h3 className="no-trees-title">No Trees Found</h3>
            <p className="no-trees-text">
              Try adjusting your search criteria to find available trees for adoption.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptTrees;