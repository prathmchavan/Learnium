const RulesReguComp = () => {
    return (
        <div className="items-center flex flex-col"> 
            <h1 className="text-3xl font-bold capitalize">
                rules and regulation
            </h1>
            <div className="flex items-center flex-col mt-10">
                <h1 className="text-2xl font-semibold">Time allocation</h1>
                <p className="text-center italic my-2">
                    Each section has a predefined time limit.Make sure to manage your time effectively to answer all questions.
                </p>
            </div>
            <div className="flex items-center flex-col mt-10">
                <h1 className="text-2xl font-semibold">Single Submission</h1>
                <p className="text-center italic my-2">
                    You can only submit the test once. Ensure all Questions are answered before submitting.
                 </p>
            </div>
            <div className="flex items-center flex-col mt-10">
                <h1 className="text-2xl font-semibold">AI-Generated Analysis</h1>
                <p className="text-center italic my-2">
                    After the test, the AI will provide detailed feeback on your performance and suggest improvement areas.
                 </p>
            </div>
            <div className="flex items-center flex-col mt-10">
                <h1 className="text-2xl font-semibold">Honesty Policy</h1>
                <p className="text-center italic my-2">
                    Use only your knowledge to complete the test. Avoid external help or reference materials to ensure genuine results.
                </p>
            </div>
        </div>
    )
}

export default RulesReguComp