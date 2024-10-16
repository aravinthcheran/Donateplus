import React from 'react';

export default function Profile() {
  return (
    <div className="bg-gray-100 min-h-screen py-7  px-4 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-12 max-w-4xl w-full overflow-hidden">
        {/* Profile Header */}
        <div className="bg-purple-600 text-white p-6 text-center relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mx-auto absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-12">
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-purple-200">San Francisco, CA</p>
            <p className="mt-2 text-white italic">"Making the world a better place, one donation at a time!"</p>
          </div>
          <button className="mt-4 px-6 py-2 bg-white text-purple-600 font-semibold rounded-full hover:bg-purple-100 transition duration-300">
            Edit Profile
          </button>
        </div>

        {/* Donation Stats */}
        <div className="p-6 flex flex-wrap justify-around items-center bg-gray-50">
          <StatCard label="Total Donations" value="350" />
          <StatCard label="Items Donated" value="120" />
          <StatCard label="Causes Supported" value="15" />
        </div>

        {/* Recent Donations */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Recent Donations</h2>
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <DonationCard key={index} donation={donation} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Achievements</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={index} badge={achievement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Components for the Profile Page
function StatCard({ label, value }) {
  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-md w-32">
      <p className="text-xl font-bold text-purple-600">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

function DonationCard({ donation }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{donation.title}</h3>
        <p className="text-gray-600 text-sm">{donation.date}</p>
      </div>
      <p className="text-purple-600 font-bold">{donation.amount}</p>
    </div>
  );
}

function AchievementBadge({ badge }) {
  return (
    <div className="bg-purple-100 text-purple-800 p-2 rounded-full shadow-md">
      <p className="text-sm font-semibold">{badge}</p>
    </div>
  );
}

// Sample data
const recentDonations = [
  { title: 'Food for Families', date: 'Oct 10, 2024', amount: '$50' },
  { title: 'Winter Clothing Drive', date: 'Sep 21, 2024', amount: '$75' },
  { title: 'Shelter Support', date: 'Aug 15, 2024', amount: '$100' },
];

const achievements = ['Top Donor', 'Community Helper', 'Generosity Award'];
