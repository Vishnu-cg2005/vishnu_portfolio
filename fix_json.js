const fs = require('fs');

const data = [
  {
    "role": "Intern",
    "company": "ZOHO Corporation",
    "duration": "17th June - 18th July 2025",
    "description": "Thrilled to have completed my internship at Zoho Corporation!\nFrom 17th June to 18th July 2025, I had the incredible opportunity to learn, grow, and contribute alongside some truly inspiring minds.\n\nGrateful to the Zoho team for their mentorship, guidance, and support throughout the journey.\nThis experience has sharpened my skills and broadened my perspective on real-world problem-solving.\n\nLooking forward to applying this knowledge to future opportunities!\n\nZoho Corporation, Estancia IT Park\nPaavai Engineering College",
    "image": "intern_exp/intern1/ZOHO_intern.jpeg",
    "media": [
      "intern_exp/intern1/ZOHO1_1.jpg",
      "intern_exp/intern1/ZOHO1_2.jpg",
      "intern_exp/intern1/ZOHO_intern.jpeg"
    ],
    "skills": ["Software Development", "Problem Solving"],
    "certificate_url": "intern_exp/intern1/ZOHO_intern.jpeg"
  },
  {
    "role": "Backend Engineering Intern",
    "company": "INFYREC",
    "duration": "15 Days",
    "description": "Completed a 15-day internship in Backend Engineering, gaining hands-on experience in setting up Linux environments by installing Ubuntu and working with core system configurations. Practiced essential Linux command-line operations such as file management, navigation, and system monitoring. Also learned frontend basics using Tailwind CSS and understood the integration between frontend and backend systems.",
    "image": "intern_exp/intern1/ZOHO_intern.jpeg", 
    "skills": ["Linux", "Ubuntu", "Tailwind CSS", "Backend Engineering"],
    "certificate_url": "intern_exp/intern2/certificate.pdf"
  }
];

fs.writeFileSync('experiences.json', JSON.stringify(data, null, 2), 'utf8');
console.log('JSON updated successfully (Added INFYREC)!');
