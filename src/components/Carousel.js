//Utilities
import React from 'react';

//Library components
import { Card } from 'react-native-paper';
import {
    Dimensions,
    ScrollView,
} from 'react-native';

//Own components


//Actions and functions


const { width } = Dimensions.get('window');

const Carousel = ({
    images
}) => {
    return (
        <ScrollView horizontal={true}>
            {
                images.map(i => {
                    return (
                        <Card style={{ width: width, height: 'auto' }}>
                            <Card.Cover source={{ uri: i }}/>
                        </Card>
                    )
                })
            }
        </ScrollView>
    )
}

export default Carousel