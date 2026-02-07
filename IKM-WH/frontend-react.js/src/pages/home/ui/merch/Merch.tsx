import { SectionTitle } from "@shared/ui/sectionTitle";
import { Container } from "@shared/ui/container";
import { LoadingState } from '@shared/ui';
import { useMerchData } from '@entities/merch';
import { MerchCarousel } from './components/MerchCarousel';
import { MerchEmptyState } from './components/MerchEmptyState';

export const Merch = () => {
    const { allItems, loading, error, hasItems, hasCards } = useMerchData();

    if (loading) {
        return (
            <section id="merch">
                <Container>
                    <SectionTitle>Мерч</SectionTitle>
                    <LoadingState message="Загрузка товаров..." />
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section id="merch">
                <Container>
                    <SectionTitle>Мерч</SectionTitle>
                    <MerchEmptyState />
                </Container>
            </section>
        );
    }

    return (
        <section id="merch">
            <Container>
                <SectionTitle>Мерч</SectionTitle>
                {!hasItems && !hasCards ? (
                    <MerchEmptyState />
                ) : (
                    <MerchCarousel items={allItems} />
                )}
            </Container>
        </section>
    );
};