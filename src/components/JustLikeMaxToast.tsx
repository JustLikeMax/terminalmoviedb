import { useState, useEffect } from "react";
import Image from "next/image";

interface ToastProps {
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ onClose }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 1) {
                setCountdown(countdown - 1);
            } else {
                onClose();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, onClose]);

    return (
        <div className="fixed top-4 right-4 bg-[#000] text-[#0f0] p-4 rounded-lg max-w-md w-full border-[#0f0] border-opacity-50 border-2">
            <div className="flex items-center gap-4">
                <Image
                    src="https://cdn.discordapp.com/avatars/1187384354108874822/51d948fb30c8974725c66ed9fe80101f.webp"
                    className="rounded-full"
                    alt="pfp"
                    width={100}
                    height={100}
                />
                <div>
                    <h2 className="text-2xl font-bold mb-2">TerminalMovieDB</h2>
                    <p>Willkommen zur Film suche.</p>
                    <p>
                        Suche nach einem Film und erhalte einige Informationen
                        dazu.
                    </p>
                </div>
            </div>
            <div className="mt-4 text-sm text-center text-[#0f0] font-bold border-t border-[#0f0] pt-2 flex justify-center">
                <p>
                    Made with <span className="text-red-500"> ❤ </span>by{" "}
                    <a
                        href="https://discord.com/users/1187384354108874822"
                        target="_blank"
                    >
                        JustLikeMax
                    </a>
                </p>
            </div>

            <div className="absolute top-3 right-6 text-base text-gray-400 font-bold">
                {countdown}
            </div>
        </div>
    );
};

export default Toast;
