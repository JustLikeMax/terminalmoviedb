"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState, useEffect } from "react";
import getFilm from "./api/getFilm";
import { Button } from "@/components/ui/button";

import Toast from "@/components/JustLikeMaxToast";

interface Film {
    Title: string;
    Year: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Poster: string;
}

export default function Home() {
    const [isToastOpen, setIsToastOpen] = useState(true);
    const [input, setInput] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [film, setFilm] = useState(null as Film | null);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [typingText, setTypingText] = useState<string[]>([]);

    useEffect(() => {
        if (film) {
            const { Title, Released, Genre, Runtime } = film;
            const lines = [
                `Titel: ${Title}`,
                `Veröffentlicht: ${Released}`,
                `Genre: ${Genre}`,
                `Laufzeit: ${Runtime}`,
            ];

            const typingInterval = 50;
            let currentLineIndex = 0;
            let currentCharIndex = 0;

            const typingTimer = setInterval(() => {
                if (currentLineIndex < lines.length) {
                    const currentLine = lines[currentLineIndex];
                    if (currentCharIndex <= currentLine.length) {
                        setTypingText((prev) => [
                            ...prev.slice(0, currentLineIndex),
                            currentLine.slice(0, currentCharIndex),
                        ]);
                        currentCharIndex++;
                    } else {
                        currentLineIndex++;
                        currentCharIndex = 0;
                    }
                } else {
                    clearInterval(typingTimer);
                }
            }, typingInterval);

            return () => clearInterval(typingTimer);
        }
    }, [film]);

    const handleSearch = async (event: any) => {
        if (event.key === "Enter") {
            const filmData = await getFilm(input);
            if (filmData === "film not found") {
                setError("Film nicht gefunden");
                setFilm(null);
            } else {
                setFilm(filmData);
                setInput("");
                setError("");
            }
        }
    };

    const openImagePopup = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setIsPopupOpen(true);
    };

    const closeImagePopup = () => {
        setSelectedImage("");
    };

    return (
        <div className="bg-[#000] text-[#0f0] font-mono h-screen flex flex-col">
            <div className="flex-1 overflow-auto px-4 py-2">
                <div className="flex items-center">
                    <span className="mr-2">user@hacker:~$</span>
                    <div className="w-2 h-4 bg-[#0f0] animate-blink" />
                </div>
                <div className="mt-4">
                    <p className="">Willkommen zur Film suche</p>
                    <p className="">
                        Schreibe den Namen des Films den du suchst
                    </p>
                    <p>==========================================</p>

                    {typingText.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}

                    {film && (
                        <Button
                            onClick={() => setIsPopupOpen(true)}
                            className="mt-4"
                        >
                            Mehr Infos
                        </Button>
                    )}
                </div>
            </div>
            <div className="bg-[#000] px-4 py-2 border-t border-[#0f0]">
                <div className="flex items-center">
                    <span className="mr-2">user@hacker:~$</span>
                    <Input
                        type="text"
                        placeholder="Suche nach einem Film.."
                        className="bg-transparent border-none outline-none w-full "
                        onKeyDown={handleSearch}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 bg-[#000]/50 flex items-center justify-center z-10 animate-fade-in">
                    {film && (
                        <div className="bg-[#0f0] text-[#000] p-8 rounded-lg max-w-xl w-full outline border-[#6b6b6b] border-2 animate-fade-in">
                            <h2 className="text-2xl font-bold mb-4">
                                {film.Title} ({film.Year})
                            </h2>
                            <div className="flex items-center gap-4">
                                <Image
                                    src={film.Poster}
                                    alt="film image"
                                    width={150}
                                    height={150}
                                    className="rounded-lg cursor-pointer hover:scale-105 transition-transform"
                                    onClick={() => openImagePopup(film.Poster)}
                                />
                                <div className="flex-1">
                                    <p>
                                        <span className="font-bold">
                                            Veröffentlicht:
                                        </span>{" "}
                                        {film.Released}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            Laufzeit:
                                        </span>{" "}
                                        {film.Runtime}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            Genre:
                                        </span>{" "}
                                        {film.Genre}
                                    </p>
                                    <p>
                                        <span className="font-bold">
                                            Handlung:
                                        </span>{" "}
                                        {film.Plot.length > 390
                                            ? `${film.Plot.slice(0, 390)}...`
                                            : film.Plot}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="mt-4 bg-[#000] text-[#0f0] px-4 py-2 rounded"
                                onClick={() => setIsPopupOpen(false)}
                            >
                                Schließen
                            </button>
                        </div>
                    )}
                </div>
            )}
            {selectedImage && (
                <div className="fixed inset-0 bg-[#fff]/50 flex items-center justify-center z-20 animate-fade-in p-4">
                    <div className="bg-[#000] text-[#0f0] p-8 rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto">
                        <Image
                            src={selectedImage}
                            alt="film image"
                            layout="responsive"
                            width={800}
                            height={600}
                            className="rounded-lg"
                        />
                        <button
                            className="mt-4 bg-[#0f0] text-[#000] px-4 py-2 rounded"
                            onClick={closeImagePopup}
                        >
                            Schließen
                        </button>
                    </div>
                </div>
            )}
            {isToastOpen && <Toast onClose={() => setIsToastOpen(false)} />}
        </div>
    );
}
