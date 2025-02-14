import React from "react";
import { TeamMember } from "./team";

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 m-4">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
        <p className="text-[#D98E04] font-medium mb-2">{member.role}</p>
        <p className="text-gray-600">{member.description}</p>
      </div>
    </div>
  );
};
