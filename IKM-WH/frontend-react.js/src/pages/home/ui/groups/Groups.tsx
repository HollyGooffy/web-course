import style from './Groups.module.css'
import { Container } from "@shared/ui/container";
import { SectionTitle } from "@shared/ui/sectionTitle";
import { LoadingState, ErrorState } from '@shared/ui';
import { useGroupsData } from '@entities/group';
import { usePagination } from '@shared/hooks/usePagination';
import { GroupsGrid } from './components/GroupsGrid';
import { LoadMoreButton } from './components/LoadMoreButton';
import { GroupsCounter } from './components/GroupsCounter';
import { GroupsEmptyState } from './components/GroupsEmptyState';

const INITIAL_GROUPS_COUNT = 6;
const LOAD_MORE_COUNT = 3;

export const Groups = () => {
    const { displayGroups, loading, error } = useGroupsData();
    const { 
        visibleCount, 
        isLoadingMore, 
        hasMoreItems, 
        nextLoadCount, 
        loadMore 
    } = usePagination({
        totalItems: displayGroups.length,
        initialCount: INITIAL_GROUPS_COUNT,
        loadMoreCount: LOAD_MORE_COUNT
    });

    const visibleGroups = displayGroups.slice(0, visibleCount);

    if (loading) {
        return (
            <section id="groups" className={style.groups}>
                <Container>
                    <SectionTitle>Наши группы</SectionTitle>
                    <LoadingState message="Загрузка групп..." />
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section id="groups" className={style.groups}>
                <Container>
                    <SectionTitle>Наши группы</SectionTitle>
                    <ErrorState message={error} title="Ошибка загрузки групп" />
                </Container>
            </section>
        );
    }

    return (
        <section id="groups" className={style.groups}>
            <Container>
                <SectionTitle>Наши группы</SectionTitle>
                {displayGroups.length === 0 ? (
                    <GroupsEmptyState />
                ) : (
                    <div className={style.groupsContainer}>
                        <GroupsGrid 
                            groups={visibleGroups} 
                            loadMoreCount={LOAD_MORE_COUNT} 
                        />
                        
                        {hasMoreItems && (
                            <LoadMoreButton
                                onClick={loadMore}
                                isLoading={isLoadingMore}
                                nextLoadCount={nextLoadCount}
                            />
                        )}

                        <GroupsCounter 
                            visible={visibleGroups.length} 
                            total={displayGroups.length} 
                        />
                    </div>
                )}
            </Container>
        </section>
    );
};