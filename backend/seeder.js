const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./models/Quiz");
const Course = require("./models/Course");

dotenv.config();

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const courses = [
  {
    title: "Fundamental Road Rules",
    description: "• Priority rules and their practical application\n• Essential road signs and signals\n• Safe driving behaviors\n• Current regulations\n• Traffic violations and penalties\n\nMaster the fundamentals for safe and responsible driving.",
    videoURL: "https://www.youtube.com/embed/_NeEF1fwT4k",
  },
  {
    title: "Mastering Road Signs",
    description: "• Types of signs: warning, prohibition, mandatory\n• Understanding shapes and colors\n• Essential road markings\n• Temporary signage\n• Environmental zones\n\nDecode the language of the road for adapted driving.",
    videoURL: "https://www.youtube.com/embed/KBTd5Vh-smw",
  },
  {
    title: "Driving in Challenging Conditions",
    description: "• Techniques for driving in rain\n• Vehicle control on snow and ice\n• Night driving and fog navigation\n• Required special equipment\n• Hazard anticipation\n\nAdapt your driving to all weather conditions.",
    videoURL: "https://www.youtube.com/embed/-VXH7F5vVC0",
  },
  {
    title: "Practical Exam Preparation",
    description: "• Essential maneuvers\n• Examiner focus points\n• Common mistakes to avoid\n• Practical exercises and tips\n• Test day stress management\n\nPrepare effectively to pass your driving test.",
    videoURL: "https://www.youtube.com/embed/vQXvyV0zIP4",
  },
  {
    title: "First Aid Essentials",
    description: "• Securing accident sites\n• Victim assessment\n• Effective emergency calls\n• Life-saving techniques\n• First aid kit usage\n\nBe prepared for road emergencies.",
    videoURL: "https://www.youtube.com/embed/NdXHzy5Diwo",
  }
];
const quizzes = [
  {
    title: "Road Code - Beginner Level",
    questions: [
      {
        questionText: "What is the maximum speed allowed in the city?",
        options: ["30 km/h", "50 km/h", "70 km/h"],
        correctAnswer: "50 km/h",
      },
      {
        questionText: "Which sign indicates a right-of-way priority?",
        options: [
          "Stop sign",
          "Yield sign",
          "Right-of-way priority sign",
        ],
        correctAnswer: "Right-of-way priority sign",
      },
    ],
  },
  {
    title: "Road Code - Advanced Level",
    questions: [
      {
        questionText: "When should you turn on your low beam headlights?",
        options: ["Only at night", "In rainy weather", "Always"],
        correctAnswer: "In rainy weather",
      },
      {
        questionText: "What does a solid line mean?",
        options: [
          "Overtaking prohibited",
          "Parking zone",
          "One-way road",
        ],
        correctAnswer: "Overtaking prohibited",
      },
    ],
  },
];


const seederDatabase = async () => {
  try {
    await Quiz.deleteMany(); // Supprime les anciens quiz
    await Quiz.insertMany(quizzes); // Insère les nouveaux quiz
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log("✅ Base de données peuplée avec succès !");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion :", error);
    mongoose.connection.close();
  }
};

seederDatabase();
