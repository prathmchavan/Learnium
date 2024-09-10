import { SparklesCore } from "@/components/ui/sparkels"

export const SparkelTitle =()=>{
    return(
        <div className=" w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
                <h1 className="md:text-xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20">
                    Projects
                </h1>
                <div className="w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-1/4" />

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={0.7}
                        particleDensity={500}
                        className="w-full h-full"
                        particleColor="#E6E6FA"
                    />

                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
    )
}