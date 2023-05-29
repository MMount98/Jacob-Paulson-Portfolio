import headshot from "../headshot.jpg";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const AboutMe = () => {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger the animation only once
        threshold: 0.1, // Percentage of the component's visibility before the callback is invoked
    });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <h1 className="text-7xl text-center mb-6">About Me</h1>
            <div className="grid grid-cols-2 gap-8 px-10 my-4">
                <motion.div
                    ref={ref}
                    className="place-self-center"
                    variants={variants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ duration: 1 }}
                >
                    <img src={headshot} alt="Music Producer Jacob Pualson" className="w-4/6 shadow-xl my-5 rounded-full"/>
                </motion.div>

                <motion.div
                    ref={ref}
                    className="text-lg space-y-4"
                    variants={variants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ duration: 1 }}
                >

          <div className=" text-base space-y-4">
            <p>
              Welcome to my portfolio! I'm Jacob Paulson, a passionate musician,
              producer, and mixing engineer hailing from the vibrant city of
              Denver. At the age of 24, I have immersed myself in the world of
              music, dedicating my craft to creating captivating sounds that
              resonate with audiences.
            </p>

            <p>
              With a versatile skill set, I thrive in crafting mesmerizing
              melodies, producing dynamic music, and creating exciting boundary
              pushing mixes. My journey in music has been fueled by a deep love
              for various genres, allowing me to explore a wide spectrum of
              styles and experiment with unique sonic landscapes.
            </p>

            <p>
              Whether I'm composing an emotive score, producing a catchy pop
              track, or engineering a powerful mix, my goal is always to evoke
              genuine emotions and create an immersive experience for listeners.
              Music is a language that transcends boundaries, and I am
              constantly inspired to push the boundaries of my creativity to
              bring captivating visions to life.
            </p>

            <p>
              This portfolio showcases a selection of my most notable works,
              highlighting my ability to collaborate with artists, translate
              their visions into reality, and deliver exceptional results. I
              believe that every project is an opportunity for growth and
              exploration, and I approach each one with unwavering dedication
              and a meticulous attention to detail.
            </p>

            <p>
              I invite you to explore my portfolio and immerse yourself in the
              world of my music. Whether you're an artist seeking a passionate
              collaborator or someone looking to discover compelling sounds, I'm
              thrilled to connect and embark on new musical journeys together.
            </p>

            <p>
              Thank you for visiting, and I look forward to sharing my passion
              for music with you.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutMe;
