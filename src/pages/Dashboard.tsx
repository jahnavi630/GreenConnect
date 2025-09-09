import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TreePine, Heart, Calendar, Camera, Droplets, TrendingUp, Award, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  const userStats = {
    treesAdopted: 3,
    eventsAttended: 8,
    daysActive: 120,
    contributionRank: 15
  };

  const adoptedTrees = [
    {
      id: 1,
      species: "Neem",
      location: "Aarey Colony, Mumbai", 
      adoptedDate: "2023-11-15",
      currentHeight: "65 cm",
      initialHeight: "45 cm",
      healthStatus: "Excellent",
      lastWatered: "2 days ago",
      nextCare: "Water in 2 days",
      image: "🌿"
    },
    {
      id: 2,
      species: "Mango",
      location: "Electronic City, Bangalore",
      adoptedDate: "2023-12-01", 
      currentHeight: "48 cm",
      initialHeight: "30 cm",
      healthStatus: "Good",
      lastWatered: "1 day ago",
      nextCare: "Water tomorrow",
      image: "🥭"
    },
    {
      id: 3,
      species: "Gulmohar",
      location: "Marina Beach, Chennai",
      adoptedDate: "2023-11-25",
      currentHeight: "55 cm", 
      initialHeight: "38 cm",
      healthStatus: "Excellent",
      lastWatered: "3 days ago",
      nextCare: "Water today",
      image: "🌺"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Green Mumbai Initiative",
      date: "2024-01-15",
      location: "Aarey Colony, Mumbai",
      registered: true
    },
    {
      id: 2,
      title: "Delhi Tree Plantation Drive", 
      date: "2024-01-20",
      location: "Lodhi Gardens, New Delhi",
      registered: false
    }
  ];

  const handleCareLog = (treeId: number, species: string) => {
    toast({
      title: "Care Log Updated",
      description: `Added care entry for your ${species} tree. Keep up the great work!`,
    });
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case "Excellent": return "text-eco-green";
      case "Good": return "text-warning";
      case "Needs Attention": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Eco Warrior! 🌱
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your adopted trees and manage your environmental impact.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <TreePine className="w-8 h-8 text-eco-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.treesAdopted}</div>
              <div className="text-sm text-muted-foreground">Trees Adopted</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 text-eco-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.eventsAttended}</div>
              <div className="text-sm text-muted-foreground">Events Attended</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-eco-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{userStats.daysActive}</div>
              <div className="text-sm text-muted-foreground">Days Active</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 text-eco-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">#{userStats.contributionRank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Adopted Trees */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-eco-green" />
                  My Adopted Trees
                </CardTitle>
                <CardDescription>
                  Track the growth and health of your adopted trees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {adoptedTrees.map((tree) => {
                  const growthPercentage = ((parseInt(tree.currentHeight) - parseInt(tree.initialHeight)) / parseInt(tree.initialHeight)) * 100;
                  
                  return (
                    <div key={tree.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{tree.image}</div>
                          <div>
                            <h3 className="font-semibold">{tree.species}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {tree.location}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getHealthColor(tree.healthStatus)}
                        >
                          {tree.healthStatus}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Current Height</div>
                          <div className="text-muted-foreground">{tree.currentHeight}</div>
                        </div>
                        <div>
                          <div className="font-medium">Growth</div>
                          <div className="text-eco-green">+{growthPercentage.toFixed(1)}%</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Progress</span>
                          <span>{growthPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.min(growthPercentage, 100)} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <div className="font-medium">Next Care</div>
                          <div className="text-muted-foreground flex items-center gap-1">
                            <Droplets className="w-3 h-3" />
                            {tree.nextCare}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCareLog(tree.id, tree.species)}
                        >
                          <Camera className="w-4 h-4 mr-1" />
                          Add Care Log
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="space-y-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="text-xs text-muted-foreground">
                      <div>{event.date}</div>
                      <div>{event.location}</div>
                    </div>
                    <Badge variant={event.registered ? "default" : "outline"} className="text-xs">
                      {event.registered ? "Registered" : "Available"}
                    </Badge>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="w-full">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-eco-green hover:bg-eco-forest text-white" size="sm">
                  <TreePine className="w-4 h-4 mr-2" />
                  Adopt New Tree
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Join Event
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Tree Photo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;