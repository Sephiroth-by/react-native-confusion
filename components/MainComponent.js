import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';
import { DISHES } from '../shared/dishes';

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
},
{
  initialRouteName: 'Menu'
}
);

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
});

const ContactUsNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs }
});

const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs }
});


const MainNavigator = createDrawerNavigator({
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
      }
    },
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu'
      }, 
    },
  ContactUs: 
    { screen: ContactUsNavigator,
      navigationOptions: {
        title: 'Contact Us',
        drawerLabel: 'Contact Us'
    }
    },
    AboutUs: 
    { screen: AboutUsNavigator,
      navigationOptions: {
        title: 'About Us',
        drawerLabel: 'About Us'
    }
    },
  }, {
drawerBackgroundColor: '#D1C4E9'
});

const App = createAppContainer(MainNavigator);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  render() {
 
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <App />
      </View>
    );
  }
}
  
export default Main;