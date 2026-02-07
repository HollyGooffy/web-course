import React from 'react';
import styles from './SocialLinks.module.css';
import {SocialsLinksProps} from "@shared/ui/socialLinks/ui/socialsLinks-props.ts";

export const VkIcon = ({ className = '' }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M15.073 2H8.938C3.332 2 2 3.333 2 8.927v6.136C2 20.667 3.323 22 8.927 22h6.136C20.667 22 22 20.677 22 15.073V8.938C22 3.332 20.677 2 15.073 2zm3.073 14.27h-1.459c-.552 0-.718-.447-1.708-1.437-.864-.833-1.229-.937-1.448-.937-.302 0-.385.083-.385.5v1.312c0 .354-.115.562-1.042.562-1.53 0-3.082-.921-4.229-2.635-1.708-2.5-2.219-4.51-2.219-4.51 0-.26.083-.5.5-.5h1.459c.375 0 .51.167.656.552.708 2.084 1.916 3.896 2.406 3.896.188 0 .27-.083.27-.552v-2.146c-.062-.979-.582-1.062-.582-1.416a.36.36 0 0 1 .374-.334h2.292c.313 0 .417.156.417.531v2.896c0 .313.135.417.229.417.188 0 .333-.104.677-.448.98-1.062 1.687-2.687 1.687-2.687.125-.271.291-.375.552-.375h1.459c.437 0 .53.229.437.531-.24 1.166-2.49 3.708-2.49 3.708-.198.26-.292.396 0 .708.197.26.875.812 1.292 1.354.854.938 1.302 1.687 1.447 2.115.115.375-.083.594-.5.594z"/>
    </svg>
);

export const TgIcon = ({ className = '' }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.95 1.24-5.5 3.64-.52.36-1 .53-1.48.52-.49-.01-1.46-.28-2.18-.52-.88-.3-1.58-.46-1.52-.98.03-.28.4-.57 1.1-.88 4.35-1.89 7.25-3.14 8.7-3.75 4.08-1.71 4.93-2.01 5.48-2.01.12 0 .43.03.62.19.16.13.2.3.22.47.02.17.04.49.02.75z"/>
    </svg>
);

export const SocialLinks: React.FC<SocialsLinksProps> = ({
                                                            vkLink,
                                                            tgLink,
                                                            variant = 'default',
                                                            showLabels = false
                                                        }) => {
    if (!vkLink && !tgLink) {
        return null;
    }

    const socialLinks = [
        ...(vkLink ? [{
            name: 'VK',
            url: vkLink,
            icon: <VkIcon />
        }] : []),
        ...(tgLink ? [{
            name: 'Telegram',
            url: tgLink,
            icon: <TgIcon />
        }] : [])
    ];

    return (
        <div className={`${styles.socialLinks} ${styles[variant]}`}>
            {showLabels && socialLinks.length > 0 && (
                <p className={styles.label}>Мы в социальных сетях:</p>
            )}

            <div className={styles.linksContainer}>
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${link.name} группы`}
                    >
            <span className={styles.iconWrapper}>
              {link.icon}
            </span>
                        {showLabels && (
                            <span className={styles.linkText}>{link.name}</span>
                        )}
                        <span className={styles.tooltip}>Перейти в {link.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};