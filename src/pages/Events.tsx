import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MapPinIcon, UsersIcon, TreePineIcon, SearchIcon, FilterIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "Green Mumbai Initiative",
      description: "Large-scale tree plantation drive in Aarey Colony with local NGOs and community volunteers.",
      date: "2024-01-15",
      time: "07:00 AM - 12:00 PM",
      location: "Aarey Colony, Mumbai",
      city: "mumbai",
      organizer: "Mumbai Green Foundation",
      volunteers: 150,
      maxVolunteers: 200,
      treesTarget: 500,
      species: ["Neem", "Banyan", "Peepal"],
      status: "upcoming"
    },
    {
      id: 2,
      title: "Delhi Tree Plantation Drive",
      description: "Community plantation event in Central Delhi parks focusing on native tree species for air purification.",
      date: "2024-01-20",
      time: "06:30 AM - 11:00 AM",
      location: "Lodhi Gardens, New Delhi",
      city: "delhi",
      organizer: "Delhi Environmental Society",
      volunteers: 89,
      maxVolunteers: 120,
      treesTarget: 300,
      species: ["Jamun", "Arjun", "Gulmohar"],
      status: "upcoming"
    },
    {
      id: 3,
      title: "Bangalore Green Belt Expansion",
      description: "Creating green corridors in Bangalore's IT corridors with fruit-bearing and flowering trees.",
      date: "2024-01-25",
      time: "07:00 AM - 01:00 PM",
      location: "Electronic City, Bangalore",
      city: "bangalore",
      organizer: "Karnataka Forest Department",
      volunteers: 203,
      maxVolunteers: 250,
      treesTarget: 600,
      species: ["Mango", "Jackfruit", "Jacaranda"],
      status: "upcoming"
    },
    {
      id: 4,
      title: "Chennai Coastal Plantation",
      description: "Beach-side plantation drive focusing on coastal vegetation and mangrove restoration.",
      date: "2024-02-01",
      time: "06:00 AM - 10:00 AM",
      location: "Marina Beach, Chennai",
      city: "chennai",
      organizer: "Tamil Nadu Coastal Protection",
      volunteers: 67,
      maxVolunteers: 100,
      treesTarget: 200,
      species: ["Casuarina", "Coconut", "Pandanus"],
      status: "upcoming"
    },
    {
      id: 5,
      title: "Kolkata Heritage Garden Revival",
      description: "Reviving historical gardens with traditional Bengali tree varieties and medicinal plants.",
      date: "2024-02-10",
      time: "07:30 AM - 12:30 PM",
      location: "Victoria Memorial Gardens, Kolkata",
      city: "kolkata",
      organizer: "Bengal Heritage Foundation",
      volunteers: 45,
      maxVolunteers: 80,
      treesTarget: 150,
      species: ["Kadam", "Chhatim", "Krishnachura"],
      status: "upcoming"
    }
  ];

  const cities = [
    { value: "all", label: "All Cities" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || event.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const handleRegister = (eventId: number, eventTitle: string) => {
    toast({
      title: "Registration Successful!",
      description: `You've been registered for "${eventTitle}". Check your email for details.`,
    });
  };

  return (
    <div className="events-page">
      <style>{`
        .events-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        }
        
        .events-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px 40px;
        }
        
        .events-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .events-title {
          font-size: 3rem;
          font-weight: 700;
          color: #15803d;
          margin-bottom: 16px;
        }
        
        .events-subtitle {
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
        
        .events-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .event-item {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .event-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        
        .event-header {
          display: flex;
          justify-content: between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 16px;
        }
        
        .event-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
        
        .event-organizer {
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        .event-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .event-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .badge-city {
          background: #f0fdf4;
          color: #15803d;
        }
        
        .badge-status {
          background: #16a34a;
          color: white;
        }
        
        .event-description {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .event-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        
        .detail-icon {
          color: #16a34a;
          margin-top: 2px;
        }
        
        .detail-content {
          flex: 1;
        }
        
        .detail-label {
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
          margin-bottom: 2px;
        }
        
        .detail-value {
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        .species-section {
          margin: 20px 0;
        }
        
        .species-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }
        
        .species-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .species-badge {
          padding: 4px 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #374151;
        }
        
        .register-button {
          width: 100%;
          padding: 12px 24px;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .register-button:hover:not(:disabled) {
          background: #15803d;
        }
        
        .register-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        .no-events {
          text-align: center;
          padding: 64px 20px;
        }
        
        .no-events-icon {
          color: #9ca3af;
          margin-bottom: 16px;
        }
        
        .no-events-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
        
        .no-events-text {
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .events-title {
            font-size: 2rem;
          }
          
          .filters-section {
            flex-direction: column;
          }
          
          .event-item {
            padding: 20px;
          }
          
          .event-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .event-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navigation />
      
      <div className="events-container">
        <div className="events-header">
          <h1 className="events-title">Tree Plantation Events</h1>
          <p className="events-subtitle">
            Join plantation drives across India. Every tree planted makes a difference in creating 
            a greener, more sustainable future for our cities.
          </p>
        </div>

        <div className="filters-section">
          <div className="search-wrapper">
            <SearchIcon className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search events, locations, or organizers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FilterIcon size={16} style={{ color: '#6b7280' }} />
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger style={{ width: '200px' }}>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="events-list">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-header">
                <div style={{ flex: 1 }}>
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-organizer">By {event.organizer}</p>
                </div>
                <div className="event-badges">
                  <span className="event-badge badge-city">
                    {event.city.charAt(0).toUpperCase() + event.city.slice(1)}
                  </span>
                  <span className="event-badge badge-status">
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                <div className="detail-item">
                  <CalendarIcon className="detail-icon" size={16} />
                  <div className="detail-content">
                    <div className="detail-label">Date & Time</div>
                    <div className="detail-value">{event.date}</div>
                    <div className="detail-value">{event.time}</div>
                  </div>
                </div>
                
                <div className="detail-item">
                  <MapPinIcon className="detail-icon" size={16} />
                  <div className="detail-content">
                    <div className="detail-label">Location</div>
                    <div className="detail-value">{event.location}</div>
                  </div>
                </div>
                
                <div className="detail-item">
                  <UsersIcon className="detail-icon" size={16} />
                  <div className="detail-content">
                    <div className="detail-label">Volunteers</div>
                    <div className="detail-value">{event.volunteers}/{event.maxVolunteers} Registered</div>
                  </div>
                </div>
                
                <div className="detail-item">
                  <TreePineIcon className="detail-icon" size={16} />
                  <div className="detail-content">
                    <div className="detail-label">Trees Target</div>
                    <div className="detail-value">{event.treesTarget} Trees</div>
                  </div>
                </div>
              </div>

              <div className="species-section">
                <div className="species-label">Tree Species:</div>
                <div className="species-list">
                  {event.species.map((species) => (
                    <span key={species} className="species-badge">
                      {species}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                className="register-button"
                onClick={() => handleRegister(event.id, event.title)}
                disabled={event.volunteers >= event.maxVolunteers}
              >
                {event.volunteers >= event.maxVolunteers ? "Event Full" : "Register Now"}
              </button>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <TreePineIcon className="no-events-icon" size={64} />
            <h3 className="no-events-title">No Events Found</h3>
            <p className="no-events-text">
              Try adjusting your search criteria or check back later for new events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;