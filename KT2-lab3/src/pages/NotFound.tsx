import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Rocket} from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[var(--chart-3)/10]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-2xl">
                <motion.h1
                    className="text-[12rem] md:text-[20rem] font-extrabold bg-gradient-to-r from-[var(--chart-3)] to-[var(--chart-1)]
                    bg-clip-text text-transparent mb-[-4rem]"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{
                        duration: 0.6,
                        ease: "backOut"
                    }}
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{y: 50, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{
                        delay: 0.2,
                        duration: 0.5
                    }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Ой! Кажется, мы потерялись в космосе
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
                        Страница, которую вы ищете, могла быть удалена, переименована или временно недоступна.
                    </p>
                </motion.div>

                <motion.div
                    initial={{y: 100, opacity: 0, rotate: -45}}
                    animate={{y: 0, opacity: 1, rotate: 0}}
                    transition={{
                        delay: 0.4,
                        duration: 0.8,
                        type: "spring",
                        bounce: 0.5
                    }}
                >
                    <div className="relative w-16 h-32 mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-40 h-40 rounded-full bg-[var(--chart-3)/10] flex items-center justify-center">
                                <div
                                    className="w-36 h-36 rounded-full bg-[var(--chart-3)/20] flex items-center justify-center">
                                    <Rocket
                                        className="text-[var(--chart-3)] w-24 h-24"
                                        strokeWidth={1.5}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{y: 50, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{
                        delay: 0.6,
                        duration: 0.5
                    }}
                >
                    <Button
                        asChild
                        className="group bg-gradient-to-r from-[var(--chart-3)] to-[var(--chart-1)]
                        hover:from-[var(--chart-3)/90] hover:to-[var(--chart-1)/90] transform transition-all duration-300 hover:scale-105
                        text-primary-foreground text-lg font-medium py-7 px-10 rounded-2xl shadow-lg "
                    >
                        <Link to="/" className="">
                            Вернуться на главную
                        </Link>
                    </Button>
                </motion.div>

            </div>
        </div>
    );
};

export default NotFound;