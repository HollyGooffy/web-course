import { Header } from "@/widgets";
import { Footer } from "@/widgets/footer";
import { Hero } from "@pages/home/ui/hero";
import { lazy, Suspense } from "react";
import { LoadingState } from "@shared/ui/loading-state";

// Ленивая загрузка компонентов, которые не видны сразу
const Poster = lazy(() => import("@pages/home/ui/poster").then(module => ({ default: module.Poster })));
const Groups = lazy(() => import("@pages/home/ui/groups").then(module => ({ default: module.Groups })));
const Concerts = lazy(() => import("@pages/home/ui/concerts").then(module => ({ default: module.Concerts })));
const ApplyForm = lazy(() => import("@pages/home/ui/apply-form").then(module => ({ default: module.ApplyForm })));

export const HomePage = () => {
    return (
        <>
            <Header/>
            <main>
                <Hero/>
                <Suspense fallback={<LoadingState message="Загрузка..." />}>
                    <Poster/>
                </Suspense>
                <Suspense fallback={<LoadingState message="Загрузка..." />}>
                    <Groups/>
                </Suspense>
                <Suspense fallback={<LoadingState message="Загрузка..." />}>
                    <Concerts/>
                </Suspense>
                <Suspense fallback={<LoadingState message="Загрузка..." />}>
                    <ApplyForm/>
                </Suspense>
            </main>
            <Footer/>
        </>
    )
}