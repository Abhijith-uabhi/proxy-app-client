// export const  timeAgo=(timestamp) =>{
//     const now = Date.now(); // Current time in milliseconds
//     const seconds = Math.floor((now - timestamp * 1000) / 1000); // Convert to seconds
//     console.log("THE SECONDS IS",seconds);
    
  
//     let interval = Math.floor(seconds / 31536000); // Years
//     if (interval > 1) return `${interval} years ago`;
  
//     interval = Math.floor(seconds / 2592000); // Months
//     if (interval > 1) return `${interval} months ago`;
  
//     interval = Math.floor(seconds / 86400); // Days
//     if (interval > 1) return `${interval} days ago`;
  
//     interval = Math.floor(seconds / 3600); // Hours
//     if (interval > 1) return `${interval} hours ago`;
  
//     interval = Math.floor(seconds / 60); // Minutes
//     if (interval > 1) return `${interval} minutes ago`;
  
//     return "Just now"; // Less than a minute ago
//   }
  

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

export const timeAgo = (timestamp) => {
  // Convert your timestamp to a Day.js object
  const time = dayjs.unix(timestamp); // Use .unix() for Unix timestamp in seconds
  const now = dayjs(); // Get current time as a Day.js object

  // If the timestamp is in the future
  if (time.isAfter(now)) {
    return "In the future";
  }

  // Calculate the time difference and return a human-readable string
  return time.from(now); // Example: "3 hours ago", "5 days ago"
};
