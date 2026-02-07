import {MerchCardProps} from "@entities/merch";
import {Card} from "@shared/ui/card";

export const MerchCard: React.FC<MerchCardProps> = ({merch}) => {
    const handleBuy = () => {
        // Здесь можно добавить логику покупки
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        }).format(price);
    };

    return (
        <Card
            image={merch.image}
            title={merch.title}
            description={formatPrice(merch.price)}
            buttonText="Купить"
            onButtonClick={handleBuy}
            modalDescription={`${merch.description}\n\nЦена: ${formatPrice(merch.price)}\nВ наличии: ${merch.stock} шт.`}
        />
    )
}