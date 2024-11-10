import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = () => (
  <motion.div
    style={{
      width: 48,
      height: 48,
      borderRadius: "50%",
      border: "3px solid transparent",
      borderTopColor: "#14b8a6",
      borderLeftColor: "#14b8a6"
    }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateWallet = () => {
    console.log('Create wallet');
  };

  const handleConnectWallet = () => {
    console.log('Connect wallet');
  };

  // Shared animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center space-y-8"
          >
            {/* Animated Logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              className="relative"
            >
              <img
                src="/src/assets/ark-logo.jpg"
                alt="Logo"
                className="w-32 h-32 rounded-full"
              />
              {/* Animated ring around logo */}
              <motion.div
                className="absolute inset-0 border-2 border-teal-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <LoadingSpinner />
          </motion.div>
        ) : (
          <motion.div
            key="wallet"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-md space-y-8">
              <motion.div
                variants={fadeInUp}
                className="text-center"
              >
                <motion.h1 
                  className="text-3xl font-bold mb-2"
                  variants={fadeInUp}
                >
                  Welcome
                </motion.h1>
                <motion.p 
                  className="text-gray-400 mb-8"
                  variants={fadeInUp}
                >
                  Choose how you'd like to proceed
                </motion.p>
              </motion.div>

              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.button
                  variants={fadeInUp}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleCreateWallet}
                  className="w-full bg-teal-500 text-white p-4 rounded-lg font-medium 
                           transition-colors duration-300 hover:bg-teal-600"
                >
                  Create New Wallet
                </motion.button>

                <motion.button
                  variants={fadeInUp}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleConnectWallet}
                  className="w-full border border-teal-500 text-teal-500 p-4 rounded-lg font-medium 
                           transition-colors duration-300 hover:bg-teal-500/10"
                >
                  Connect Existing Wallet
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;