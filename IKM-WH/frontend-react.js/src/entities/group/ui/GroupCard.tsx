import {GroupCardProps} from "@entities/group/ui/GroupCard-props.ts";
import {Card} from "@shared/ui/card";
import React from "react";

export const GroupCard: React.FC<GroupCardProps> = ({group}) => {

    return (
        <>
            <Card
                image={group.image}
                title={group.name}
                description={group.genre}
                modalDescription={group.description}
                buttonText="Узнать больше"
                vkLink={group.vkLink}
                tgLink={group.tgLink}
            />
        </>

    )
}