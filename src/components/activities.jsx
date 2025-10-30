import { useState } from "react";
import { motion } from "framer-motion";

const Activities = () => {
  const [activeCard, setActiveCard] = useState(null);

  const ongoingActivities = [
    {
      id: 1,
      title: "Swacch Manas",
      description: `An after-school program blending civic awareness, cleanliness, life skills, soft skills, and career counseling for holistic child development. In Mangaluru in association with Ramakrishna Mission Swacch Mangaluru Abhiyan.`,
      image: "https://i.ibb.co/4w9WBWKP/1O.jpg",
    },
    {
      id: 2,
      title: "Be & Make\n(Youth Workshop)",
      description: `In association with Mangalore University Swami Vivekananda Study Centre, this program equips youth with personality development, leadership, financial literacy, industry-based training, and nation-building spirit. It also functions as an after-college program.`,
      image: "https://i.ibb.co/90M0dGj/2O.jpg",
    },
    {
      id: 3,
      title: "Sustainability Circles",
      description: `Sustainability Circles in schools and colleges inspire and empower youth to adopt eco-sensitive living. Through interactive sessions on waste management, cleanliness, and green practices, students learn to become responsible citizens and environmental stewards, fostering a culture of sustainability and collective action for a cleaner, greener future.`,
      image: "https://i.ibb.co/8DrsvmF2/3O.jpg",
    },
  ];

  const upcomingProjects = [
    {
      id: 4,
      title: "Swachha Biligiri\n(BR Hills Cleanliness Campaign)",
      description: `This initiative of the Trust in association with VGKK and Karuna Trust promotes holistic cleanliness and sustainability in the Biligiri Rangan Hills. The program integrates regular waste collection, segregation, and processing with community empowerment. Through a dedicated livelihood centre, Soliga tribal communities create sustainable products, combining environmental conservation with economic self-reliance, making Swachha Biligiri a model for eco-living and inclusive rural development.`,
      image: "https://i.ibb.co/rGqnJ6VT/1U.jpg",
    },
    {
      id: 5,
      title: "Mandira Uttana Yojana (Temple Rejuvenation Program)",
      description: `It is dedicated to restoring the sanctity of temples and sacred spaces through cleanliness, preservation, and proper disposal of religious materials with reverence. The program also conducts spiritual awareness sessions and value-based classes for children and youth, nurturing devotion and discipline. By supporting temples with modern technology, training, and resources, the initiative promotes both cultural continuity and community participation in spiritual rejuvenation.`,
      image: "https://i.ibb.co/HLw5rggp/2U.jpg",
    },
    {
      id: 6,
      title: "Residential School (Integrated Education Model)",
      description: `A visionary initiative by Arghya Trust, the Residential School aims to offer holistic education integrating seven domains of excellence — Physical, Psychological, Emotional, Intellectual, and Spiritual, along with Self-Reliance and Contributory Personality. This model prepares children for life with inner strength, clarity, and compassion. Through experiential learning, value-based education, and community engagement, the school seeks to nurture balanced individuals capable of excellence, leadership, and purposeful living in harmony with society and nature.`,
      image: "https://i.ibb.co/v4FX57rM/3U.jpg",
    },
  ];

  return (
    <section id="activities" className="pt-12 md:pt-16 pb-8 md:pb-16">
      {/* Main Heading - Fixed mobile spacing */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a365d] mb-8 md:mb-16 text-center px-4">
        ACTIVITIES
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Ongoing Activities */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1a365d] mb-6 md:mb-10 px-2"
          >
            Ongoing Activities
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {ongoingActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 },
                }}
                viewport={{ once: true }}
                className="group relative cursor-pointer"
                onClick={() =>
                  setActiveCard(activeCard === activity.id ? null : activity.id)
                }
              >
                {/* Outer Red Glow Effect */}
                <div
                  className={`absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
                    activeCard === activity.id
                      ? "bg-red-500/20 shadow-lg shadow-red-500/30 blur-md"
                      : "group-hover:bg-red-500/10 group-hover:shadow-md group-hover:shadow-red-500/20"
                  }`}
                ></div>

                {/* Main Card */}
                <motion.div
                  animate={{
                    scale: activeCard === activity.id ? 1.02 : 1,
                    y: activeCard === activity.id ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border transition-all duration-500 flex flex-col h-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] ${
                    activeCard === activity.id
                      ? "border-red-500 shadow-2xl shadow-red-500/20"
                      : "border-[#dc2626]/20 hover:border-[#dc2626]/60 hover:shadow-xl hover:shadow-[#dc2626]/20"
                  }`}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${activity.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 sm:p-6 flex-1 overflow-auto">
                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-2 transition-colors font-serif whitespace-pre-line ${
                        activeCard === activity.id
                          ? "text-red-600"
                          : "text-[#1a365d] group-hover:text-[#dc2626]"
                      }`}
                    >
                      {activity.title}
                    </h3>
                    <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {activity.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shatachandi Maha Yagna Section */}
        <section id="SHATACHANDI MAHA YAGA"></section>
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[white]/90 py-8 sm:py-12 px-4 sm:px-8 md:px-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30"
          >
            {/* Heading */}
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[red] mb-6 md:mb-10 drop-shadow-md text-center">
              Shatachandi Maha Yagna – January 2026
            </h4>

            {/* Image + Text Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* Left - Image */}
              <div className="flex justify-center">
                <img
                  src="https://i.ibb.co/jCFSNNp/devii.jpg"
                  alt="Devi"
                  className="rounded-2xl sm:rounded-3xl shadow-xl w-full max-w-[300px] md:max-w-none md:w-[85%] h-auto object-cover border border-white/50 hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Right - Description */}
              <div>
                <div
                  className="text-[#1a365d] text-sm sm:text-base leading-relaxed text-justify space-y-3 sm:space-y-4"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  <p>
                    Arghya Trust is blessed to organize the Shatachandi Maha Yajna
                    in January 2026 at the sacred Polali Shri Rajarajeshwari Kshetra,
                    a divine seat established by King Suratha as mentioned in the
                    Durga Saptashati. According to the scripture, Suratha Maharaja,
                    after receiving Mantra Deeksha from Sumeru Rishi, installed a
                    nine-foot clay idol of Maa Rajarajeshwari and performed Chandi
                    Parayana and Chandi Homa at this very site. Through his deep
                    devotion and sacred rituals, he regained his lost kingdom and
                    attained divine blessings and prosperity.
                  </p>

                  <p>
                    Following this ancient tradition, the Shatachandi Maha Yajna will
                    be conducted with collective chanting of the Durga Saptashati
                    (700 verses) from the Markandeya Purana — a hundred times, by
                    learned Vedic scholars. This powerful anushthana invokes the
                    divine Mother's energy to purify the environment, remove
                    obstacles, and bestow strength, peace, and success upon all
                    participant devotees.
                  </p>

                  <p>
                    In parallel, Arghya Trust is also organizing a Koti Durga Japa
                    Yajna — a collective chanting of "one crore Durga mantras" by
                    millions of devotees across regions. This unified spiritual
                    effort will radiate powerful vibrations of positivity and grace,
                    uplifting individuals and the world.
                  </p>

                  <p>
                    It is a sacred opportunity for all devotees to participate, offer
                    prayers, and receive the boundless blessings of Maa Durga.
                  </p>
                </div>

                {/* Read More Button */}
                <div className="pt-4 sm:pt-6 flex justify-center md:justify-start">
                  <button className="bg-[#1a365d] text-white font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:bg-[#2d5a4d] transition duration-300 text-sm sm:text-base">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Projects */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1a365d] mb-6 md:mb-10 px-2"
          >
            Upcoming Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {upcomingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 },
                }}
                viewport={{ once: true }}
                className="group relative cursor-pointer"
                onClick={() =>
                  setActiveCard(activeCard === project.id ? null : project.id)
                }
              >
                {/* Outer Red Glow Effect */}
                <div
                  className={`absolute -inset-1 sm:-inset-2 rounded-2xl sm:rounded-3xl transition-all duration-500 ${
                    activeCard === project.id
                      ? "bg-red-500/20 shadow-lg shadow-red-500/30 blur-md"
                      : "group-hover:bg-red-500/10 group-hover:shadow-md group-hover:shadow-red-500/20"
                  }`}
                ></div>

                {/* Main Card */}
                <motion.div
                  animate={{
                    scale: activeCard === project.id ? 1.02 : 1,
                    y: activeCard === project.id ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border transition-all duration-500 flex flex-col h-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] ${
                    activeCard === project.id
                      ? "border-red-500 shadow-2xl shadow-red-500/20"
                      : "border-[#dc2626]/20 hover:border-[#dc2626]/60 hover:shadow-xl hover:shadow-[#dc2626]/20"
                  }`}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>
                  <div className="p-4 sm:p-6 flex-1 overflow-auto">
                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-2 transition-colors font-serif whitespace-pre-line ${
                        activeCard === project.id
                          ? "text-red-600"
                          : "text-[#1a365d] group-hover:text-[#dc2626]"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[#4a5568] text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;