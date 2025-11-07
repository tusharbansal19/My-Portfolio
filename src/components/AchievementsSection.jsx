import { FaAward, FaStar } from 'react-icons/fa';

const achievements = [
  { title: 'Top Performer in ST and PUTS', description: 'Recognized for outstanding performance in Batch.', icon: FaAward },
  { title: 'Infosys Web Development Certification', description: 'Successfully completed Infosys Web Development Certification.', icon: FaStar },
  { title: '50 & 100 Days LeetCode Badge', description: 'Earned 50 and 100 day badges on LeetCode in 2024.', icon: FaAward },
  { title: 'Mentorship Certificate', description: 'Received DS lecture mentorship certificate from AKGEC.', icon: FaAward },
  { title: '400+ LeetCode Questions', description: 'Solved over 400 LeetCode questions.', icon: FaAward },
];

const AchievementsSection = ({ setActiveSection, darkMode }) => {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-6 py-12 relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text animate-gradient-move">My <span className="text-purple-300">Achievements</span></h2>
      {/* Centered Top 3 Achievements */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        {achievements.slice(0, 3).map((ach, idx) => (
          <div
            key={ach.title}
            className="flex flex-col items-center p-7 rounded-3xl shadow-2xl glass-effect border-2 border-purple-700 bg-gradient-to-br from-[#2d1457]/80 via-[#a259ff]/10 to-[#18122b]/80 backdrop-blur-xl transition-transform duration-500 hover:scale-105 hover:shadow-purple-500/40 relative animate-fade-in w-full md:w-1/3 max-w-xs"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(44,20,80,0.7) 0%, rgba(162,89,255,0.12) 50%, rgba(24,18,43,0.7) 100%)'
                : 'rgba(255,255,255,0.7)',
              boxShadow: '0 8px 32px 0 rgba(162, 89, 255, 0.25)'
            }}
          >
            {ach.icon ? <ach.icon className="text-4xl text-purple-400 mb-2 animate-twinkle" /> : <FaAward className="text-4xl text-purple-400 mb-2 animate-twinkle" />}
            <h3 className="text-xl font-bold text-purple-100 mb-1 drop-shadow-glow">{ach.title}</h3>
            {ach.description && <p className="text-purple-200 text-center">{ach.description}</p>}
            <div className="absolute -inset-1 rounded-3xl border-2 border-purple-500 opacity-30 blur-lg pointer-events-none animate-glow"></div>
          </div>
        ))}
      </div>
      {/* Bottom 2 Achievements */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        {achievements.slice(3, 5).map((ach, idx) => (
          <div
            key={ach.title}
            className="flex flex-col items-center p-7 rounded-3xl shadow-2xl glass-effect border-2 border-purple-700 bg-gradient-to-br from-[#2d1457]/80 via-[#a259ff]/10 to-[#18122b]/80 backdrop-blur-xl transition-transform duration-500 hover:scale-105 hover:shadow-purple-500/40 relative animate-fade-in w-full md:w-1/2 max-w-xs"
            style={{
              background: darkMode
                ? 'linear-gradient(135deg, rgba(44,20,80,0.7) 0%, rgba(162,89,255,0.12) 50%, rgba(24,18,43,0.7) 100%)'
                : 'rgba(255,255,255,0.7)',
              boxShadow: '0 8px 32px 0 rgba(162, 89, 255, 0.25)'
            }}
          >
            {ach.icon ? <ach.icon className="text-4xl text-purple-400 mb-2 animate-twinkle" /> : <FaAward className="text-4xl text-purple-400 mb-2 animate-twinkle" />}
            <h3 className="text-xl font-bold text-purple-100 mb-1 drop-shadow-glow">{ach.title}</h3>
            {ach.description && <p className="text-purple-200 text-center">{ach.description}</p>}
            <div className="absolute -inset-1 rounded-3xl border-2 border-purple-500 opacity-30 blur-lg pointer-events-none animate-glow"></div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setActiveSection('contact')}
        className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform animate-glow-btn focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
      >
        Contact Me
      </button>
      {/* Add keyframes for animation in your global CSS or Tailwind config */}
    </section>
  );
};

export default AchievementsSection; 