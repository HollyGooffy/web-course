import style from '../Groups.module.css';

interface GroupsCounterProps {
    visible: number;
    total: number;
}

export const GroupsCounter = ({ visible, total }: GroupsCounterProps) => {
    return (
        <div className={style.groupsCounter}>
            Показано {visible} из {total} групп
        </div>
    );
};