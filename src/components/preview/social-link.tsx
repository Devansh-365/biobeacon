import React from "react";
import { Icons } from "../icons";

interface SocialLinkProps {
  url: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ url }) => {
  const socialMediaPlatforms = [
    { platform: "GitHub", iconClass: "fab fa-github" },
    { platform: "LinkedIn", iconClass: "fab fa-linkedin" },
    { platform: "Twitter", iconClass: "fab fa-twitter" },
    // Add more platforms here as needed
  ];

  // Check if the URL matches any of the known social media platforms
  const matchingPlatform = socialMediaPlatforms.find((platform) =>
    url.includes(platform.platform.toLowerCase())
  );

  const getSocialIcon = () => {
    if (matchingPlatform) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Icons.link className="w-3 h-3" />
        </a>
      );
    } else {
      // Handle other social media links or unknown links
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-link"></i>
        </a>
      );
    }
  };

  return <div className="text-2xl bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition hover:scale-110 ease-in-out">{getSocialIcon()}</div>;
};

export default SocialLink;
