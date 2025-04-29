import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Images

import CausaPet from "../assets/imgs/logos/causa_pet_logo.png";

// Utils

import bus from "../utils/bus";

const Message = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message }) => {
      setVisibility(true);
      setMessage(message);

      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  return (
    <AnimatePresence>
      {visibility && (
        <motion.div
          className="fixed z-30 bottom-10 left-3 min-w-[200] md:min-w-[400] p-3 bg-white text-primary-color border-2 text-sm sm:text-lg font-semibold border-primary-color rounded-lg shadow-lg"
          initial={{ opacity: 0, x: "-120%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-120%" }}
          transition={{ duration: 0.3 }}>
          <div className="flex flex-row justify-center items-center gap-2">
            <img src={CausaPet} className="w-6 sm:w-8" />
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
