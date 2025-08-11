import { motion } from 'motion/react';

interface ButtonInterface {
  classname?: string;
  children?: any;
  eventHandler?: () => void;
  disabled?: true;
  type?: any;
}

interface DivInterface {
  classname?: string;
  children?: any;
  eventHandler?: () => void;
}

export const Button = ({
  classname,
  children,
  eventHandler,
  disabled,
  type,
}: ButtonInterface) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      className={classname}
      onClick={eventHandler}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export const Div = ({ classname, children, eventHandler }: DivInterface) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      className={classname}
      onClick={eventHandler}
    >
      {children}
    </motion.div>
  );
};
