import React, {useState} from 'react';
import style from "./Card.module.css";
import {CardProps} from "@shared/ui/card/ui/card-props.ts";
import {Button} from "@shared/ui/button/ui";
import {Modal} from "@shared/ui/modal/ui/Modal";
import {SocialLinks} from "@shared/ui/socialLinks";

export const Card: React.FC<CardProps> = ({
                                              image,
                                              title,
                                              description,
                                              buttonText,
                                              modalDescription,
                                              onButtonClick,
                                              vkLink,
                                              tgLink
                                          }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
        setIsModalOpen(true);
        onButtonClick?.();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={style.card}>
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className={style.cardImage}
                    />
                )}
                <div className={style.cardContent}>
                    <h3 className={style.cardTitle}>{title}</h3>
                    <p className={style.cardDescription}>{description}</p>

                    <SocialLinks
                        vkLink={vkLink}
                        tgLink={tgLink}
                        variant="minimal"
                        showLabels={false}
                    />

                    {buttonText && (
                        <Button variant="primary" onClick={handleButtonClick}>
                            {buttonText}
                        </Button>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={title}
                image={image}
                vkLink={vkLink}
                tgLink={tgLink}
            >
                <p>{modalDescription || description}</p>

            </Modal>
        </>
    );
};