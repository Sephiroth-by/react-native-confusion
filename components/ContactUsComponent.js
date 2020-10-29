import React, {Component} from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class ContactUs extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {
        return(
            <Card>
                <Card.Title>Contact Information</Card.Title>
                <Card.Divider/>
                <Text>121, Clear Water Bay Road</Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Fax: +852 8765 4321</Text>
                <Text>Email:confusion@food.net</Text>
            </Card>
        );
    }
}

export default ContactUs;