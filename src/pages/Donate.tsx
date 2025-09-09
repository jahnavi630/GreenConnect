import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TreePine, Heart, Users, Leaf } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Donate = () => {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>('tree-plantation');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const donationOptions = [
    { amount: 100, label: '₹100', description: 'Plant 1 sapling' },
    { amount: 500, label: '₹500', description: 'Plant 5 saplings' },
    { amount: 1000, label: '₹1000', description: 'Plant 10 saplings' },
    { amount: 2500, label: '₹2500', description: 'Support tree care for 6 months' }
  ];

  const causes = [
    { id: 'tree-plantation', name: 'Tree Plantation', icon: TreePine, description: 'Support new tree plantation drives across India' },
    { id: 'tree-care', name: 'Tree Care & Maintenance', icon: Heart, description: 'Help maintain existing adopted trees' },
    { id: 'community-events', name: 'Community Events', icon: Users, description: 'Fund plantation events and workshops' },
    { id: 'ngo-support', name: 'NGO Operations', icon: Leaf, description: 'Support NGO operational costs' }
  ];

  const handleDonation = async () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;
    
    if (finalAmount < 10) {
      toast({
        title: "Invalid Amount",
        description: "Minimum donation amount is ₹10",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Replace with your Razorpay key
        amount: finalAmount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'GreenConnect',
        description: `Donation for ${causes.find(c => c.id === selectedCause)?.name}`,
        image: '/favicon.ico',
        handler: function (response: any) {
          // Payment success callback
          toast({
            title: "Donation Successful!",
            description: `Thank you for your generous donation of ₹${finalAmount}. Payment ID: ${response.razorpay_payment_id}`,
          });
          
          // Save donation record to database
          saveDonationRecord({
            amount: finalAmount,
            cause: selectedCause,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date().toISOString()
          });
          
          setIsProcessing(false);
        },
        prefill: {
          name: 'GreenConnect User',
          email: 'user@greenconnect.org',
          contact: '9999999999'
        },
        notes: {
          cause: selectedCause,
          platform: 'GreenConnect'
        },
        theme: {
          color: '#16a34a'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast({
              title: "Payment Cancelled",
              description: "Your donation was cancelled. Try again when ready.",
              variant: "destructive"
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveDonationRecord = async (donationData: any) => {
    try {
      // In a real app, this would save to your backend database
      console.log('Saving donation record:', donationData);
      
      // For demo purposes, save to localStorage
      const existingDonations = JSON.parse(localStorage.getItem('donations') || '[]');
      existingDonations.push(donationData);
      localStorage.setItem('donations', JSON.stringify(existingDonations));
      
      toast({
        title: "Record Saved",
        description: "Your donation has been recorded successfully.",
      });
    } catch (error) {
      console.error('Error saving donation:', error);
    }
  };

  return (
    <div className="donate-page">
      <style>{`
        .donate-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          padding: 80px 20px 40px;
        }
        
        .donate-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .donate-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .donate-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #15803d;
          margin-bottom: 12px;
        }
        
        .donate-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          line-height: 1.6;
        }
        
        .section {
          margin-bottom: 32px;
        }
        
        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
        }
        
        .amount-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .amount-option {
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }
        
        .amount-option:hover {
          border-color: #16a34a;
          transform: translateY(-2px);
        }
        
        .amount-option.selected {
          border-color: #16a34a;
          background: #f0fdf4;
        }
        
        .amount-label {
          font-size: 1.25rem;
          font-weight: 600;
          color: #16a34a;
          margin-bottom: 4px;
        }
        
        .amount-description {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .custom-amount-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .custom-amount-input:focus {
          outline: none;
          border-color: #16a34a;
        }
        
        .causes-list {
          display: grid;
          gap: 12px;
        }
        
        .cause-option {
          display: flex;
          align-items: center;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }
        
        .cause-option:hover {
          border-color: #16a34a;
        }
        
        .cause-option.selected {
          border-color: #16a34a;
          background: #f0fdf4;
        }
        
        .cause-icon {
          margin-right: 16px;
          color: #16a34a;
        }
        
        .cause-content {
          flex: 1;
        }
        
        .cause-name {
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }
        
        .cause-description {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .donate-button {
          width: 100%;
          padding: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .impact-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid #e5e7eb;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .donate-container {
            padding: 24px;
            margin: 0 16px;
          }
          
          .donate-title {
            font-size: 2rem;
          }
          
          .amount-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* Load Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      <div className="donate-container">
        <div className="donate-header">
          <h1 className="donate-title">Support Green India</h1>
          <p className="donate-subtitle">
            Your contribution helps plant trees, maintain green spaces, and build a sustainable future for India. 
            Every donation makes a real difference in combating climate change.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Choose Donation Amount</h2>
          <div className="amount-grid">
            {donationOptions.map((option) => (
              <div
                key={option.amount}
                className={`amount-option ${donationAmount === option.amount && !customAmount ? 'selected' : ''}`}
                onClick={() => {
                  setDonationAmount(option.amount);
                  setCustomAmount('');
                }}
              >
                <div className="amount-label">{option.label}</div>
                <div className="amount-description">{option.description}</div>
              </div>
            ))}
          </div>
          
          <input
            type="number"
            placeholder="Enter custom amount (₹)"
            className="custom-amount-input"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setDonationAmount(0);
            }}
            min="10"
          />
        </div>

        <div className="section">
          <h2 className="section-title">Select Cause</h2>
          <div className="causes-list">
            {causes.map((cause) => {
              const IconComponent = cause.icon;
              return (
                <div
                  key={cause.id}
                  className={`cause-option ${selectedCause === cause.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCause(cause.id)}
                >
                  <IconComponent size={24} className="cause-icon" />
                  <div className="cause-content">
                    <div className="cause-name">{cause.name}</div>
                    <div className="cause-description">{cause.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          onClick={handleDonation}
          disabled={isProcessing}
          className="donate-button"
          size="lg"
        >
          {isProcessing ? 'Processing...' : `Donate ₹${customAmount || donationAmount}`}
        </Button>

        <div className="impact-stats">
          <div className="stat-item">
            <div className="stat-number">12,547</div>
            <div className="stat-label">Trees Planted</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3,421</div>
            <div className="stat-label">Trees Adopted</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">156</div>
            <div className="stat-label">Active NGOs</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8,932</div>
            <div className="stat-label">Volunteers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;