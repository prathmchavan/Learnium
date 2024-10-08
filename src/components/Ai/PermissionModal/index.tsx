import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface PermissionModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    isSelected: boolean;
    setIsSelected: (value: boolean) => void;
    handleProceed: () => void;
}

const PermissionModal = ({ isOpen, onOpenChange, isSelected, setIsSelected, handleProceed }: PermissionModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="max-w-lg mx-auto "
        >
            <ModalContent>
                {(onClose) => (
                    <div className="flex flex-col h-full max-h-[80vh] no-scrollbar overflow-y-scroll">
                        <ModalHeader className="flex flex-col gap-1">Exam Declaration
                        </ModalHeader>
                        <ModalBody className="flex-grow">
                            <div className="px-5">
                                <h1 className="text-lg font-semibold mb-4">
                                    Before you begin the test, please take a moment to review the following rules and important details:
                                </h1>
                                <ul className="my-5 list-disc flex flex-col gap-3">
                                    <li>Time Limit: The exam is timed, with 20 minutes to complete all questions.</li>
                                    <li>Question Format: The test consists of:</li>
                                    <li>Multiple-Choice Questions (MCQs) with single and multiple answers.</li>
                                    <li>No negative marking, so feel free to answer every question.</li>
                                </ul>
                                <h1 className="text-lg font-semibold mb-4">Rules</h1>
                                <ul className="list-decimal flex flex-col gap-3">
                                    <li>
                                        Questions are generated automatically, and while we strive for accuracy, occasional errors may occur. Learnium is not responsible for any mistakes.
                                    </li>
                                    <li>
                                        No external material is allowed during the test. If any form of cheating is detected, the user will be suspended from the platform for 24 hours.
                                    </li>
                                    <li>Ensure a stable internet connection, as disruptions may affect your test experience.</li>
                                    <li>No test retakes are allowed if the exam time has expired.</li>
                                </ul>
                            </div>
                        </ModalBody>
                        <div className="px-5 py-3">
                            <Checkbox isSelected={isSelected} onValueChange={setIsSelected} color="success">
                                By clicking "I Agree", you acknowledge and accept these terms. Once you start, the timer will begin, and the test must be completed in one sitting.
                            </Checkbox>
                        </div>
                        <ModalFooter className="flex justify-end gap-4 px-5 py-3">
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleProceed}>
                                Proceed
                            </Button>
                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PermissionModal;
