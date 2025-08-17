import { motion } from 'motion/react';

interface ButtonInterface {
  classname?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: true;
  type?: 'button' | 'submit' | 'reset';
}

interface DivInterface {
  classname?: string;
  children?: React.ReactNode;
  eventHandler?: () => void;
}

export const Button = ({
  classname,
  children,
  onClick,
  disabled,
  type,
}: ButtonInterface) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      className={classname}
      onClick={onClick}
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
