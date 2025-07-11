
const Modal = ({children, isOpen, onClose, title}) => {

    if(!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/30 bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                {/* Modal Content */}
                <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-green-100">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-green-200">
                        <h3 className="text-2xl font-bold text-green-700">
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-800 rounded-lg text-lg w-8 h-8 inline-flex justify-center items-center transition"
                            onClick={onClose}
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;