import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import * as Calendar from 'expo-calendar';
import DatePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date()
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleViewRef = ref => this.view = ref;

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            'Number of guests: ' + this.state.guests + '\nSmoking: ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
            {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
            {text: 'OK', onPress: () => {this.resetForm(); this.addReservationToCalendar(this.state.date); this.presentLocalNotification()}},
            ],
            { cancelable: false }
        );
    }

    async addReservationToCalendar(date) {
      const { status } = await Calendar.requestCalendarPermissionsAsync();

      if (status === 'granted') {

        console.log(date);
        Calendar.createEventAsync(
            '1',
            {
                title: 'Con Fusion Table Reservation',
                startDate: new Date(Date.parse(date)),
                endDate: new Date(Date.parse(date) + (2 * 60 * 60 * 1000)),
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
                timeZone: 'Asia/Hong_Kong'
            }
        );     
      }
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date()
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification() {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation requested'
        });
    }
    
    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000} delay={1000} ref={this.handleViewRef}>
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    value={this.state.date}
                    format=''
                    mode="date"
                    placeholder="select date and Time"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onChange={(event, selectedDate) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </ScrollView> 
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;