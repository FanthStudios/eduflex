import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FC, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
    children: ReactNode;
    color: "red" | "blue" | "green" | "yellow";
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ children, color, onClick }) => (
    <button
        type="button"
        className={clsx(
            "inline-flex justify-center rounded-md border border-transparent px-4 py-1 text-sm font-medium hover:scale-105 focus:outline-none text-white transition-all duration-300",
            {
                "bg-blue-500": color === "blue",
                "bg-red-500": color === "red",
                "bg-green-500": color === "green",
                "bg-yellow-500": color === "yellow",
            }
        )}
        onClick={onClick}
    >
        {children}
    </button>
);

interface TitleProps {
    children: ReactNode;
    align: "left" | "center" | "right";
}

const Title: FC<TitleProps> = ({ children, align }) => (
    <Dialog.Title
        as="h3"
        className={clsx(
            "text-lg font-medium leading-6 text-gray-900 flex items-start w-full",
            {
                "text-left justify-start": align === "left",
                "text-center justify-center": align === "center",
                "text-right justify-end": align === "right",
            }
        )}
    >
        {children}
    </Dialog.Title>
);

const Footer: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-evenly w-full">{children}</div>
);

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}

type ModalType = {
    (props: ModalProps): JSX.Element;
    Button: FC<ButtonProps>;
    Title: FC<TitleProps>;
    Footer: FC<{ children: ReactNode }>;
};

const Modal: ModalType = ({ isOpen, closeModal, children }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all gap-6 flex flex-col items-start justify-center">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

Modal.Button = Button;
Modal.Title = Title;
Modal.Footer = Footer;

export default Modal;
