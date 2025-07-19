"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"; // Fixed import
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return (
    <motion.div
      initial={{ opacity: 0, x: -90 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <button
        className={cn(
          "syledButton mx-auto block w-fit font-semibold text-black hover:text-white sm:mx-0",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
    </motion.div>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useModal(); // Combined `useModal` calls

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [open]);

  const modalRef = useRef<HTMLDivElement | null>(null); // No changes needed here
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    open && ( // Conditional rendering for AnimatePresence
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]"
          role="dialog" // Added accessibility attribute
          aria-modal="true" // Added accessibility attribute
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "relative z-50 mx-3 flex max-h-[90%] min-h-[10%] max-w-fit flex-1 flex-col overflow-hidden border border-transparent bg-white md:rounded-2xl dark:border-neutral-800 dark:bg-neutral-900/90",
              className,
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-1 flex-col p-8 md:p-10", className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-end bg-gray-100 p-4 dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`bg-opacity-50 fixed inset-0 z-50 h-full w-full bg-black ${className}`}
    ></motion.div>
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="group absolute top-4 right-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 cursor-pointer text-black transition duration-200 group-hover:scale-125 group-hover:rotate-3 dark:text-white"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>, // Allow null in the type
  callback: (event: MouseEvent | TouchEvent) => void, // Explicitly define the callback type
) => {
  const { setOpen, open } = useModal();

  const escClose = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen],
  );
  useEffect(() => {
    if (open) document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, [open, escClose]);
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event); // Call the callback with the event
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]); // Proper dependency array
};
