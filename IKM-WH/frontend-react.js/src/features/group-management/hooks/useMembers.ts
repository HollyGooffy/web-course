export const useMembers = (
    members: string[],
    onMembersChange: (members: string[]) => void
) => {
    const addMember = () => {
        onMembersChange([...members, '']);
    };

    const removeMember = (index: number) => {
        onMembersChange(members.filter((_, i) => i !== index));
    };

    const updateMember = (index: number, value: string) => {
        onMembersChange(members.map((m, i) => i === index ? value : m));
    };

    return {
        addMember,
        removeMember,
        updateMember
    };
};