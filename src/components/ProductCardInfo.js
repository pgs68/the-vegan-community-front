import React from 'react'
import { Card, Title } from 'react-native-paper';

const ProductCardInfo = ({producto}) => {
    return (
        <Card>
            {
                producto.image_front_url &&
                <Card.Cover source={{ uri: producto.image_front_url }} />
            }
            <Card.Content>
                <Title>{producto.product_name_es || producto.product_name}</Title>
            </Card.Content>
        </Card>
    )
}

export default ProductCardInfo