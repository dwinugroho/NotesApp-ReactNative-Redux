import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Modal,
    StatusBar,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native'
import moment from 'moment';

import { connect } from 'react-redux';

import { deleteNote } from '../public/redux/action/notes'

class CardHeaderFooterExample extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: this.props.item.id
        }
    }

    handleNavigation = () => {
        this.props.navigation.navigate('EditNote', this.props.item)
    }

    deleteNote = () => {
        this.props.dispatch(deleteNote(this.state.id))
    }

    confirmButton() {
        Alert.alert(
            "Delete Note",
            "Are you sure want to delete note?",
            [
                {
                    text: "NO", onPress: () => {
                        
                    }
                },
                {
                    text: "YES", onPress: () => {
                        
                        this.deleteNote();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <TouchableOpacity 
                style={styles.parentView} 
                onPress={this.handleNavigation}
                onLongPress={() => {this.confirmButton()}}
            >

                <View style={{  
                                minHeight: 200,
                                borderRadius: 10, 
                                padding: 15,
                                backgroundColor: this.props.item.category_name == 'Work' ? '#C0EB6A' : 
                                                (this.props.item.category_name == 'Learn' ? '#2FC2DF' : 
                                                (this.props.item.category_name == 'Wishlist' ? '#FAD06C' :
                                                (this.props.item.category_name == 'Personal' ? '#FF92A9' : '#00D4AA'
                                                )))
                            }}>
                    <Text style={styles.date}>
                        {moment(this.props.item.time).format('DD MMMM')}
                    </Text>
                    <Text numberOfLines={1} style={styles.title}>
                        {this.props.item.title}
                    </Text>
                    {
                        (this.props.item.category_name == null) ? 
                        <Text numberOfLines={1} style={{color: 'black'}}>
                            category undefined
                        </Text>
                        :
                        <Text numberOfLines={1} style={styles.category}>
                            {this.props.item.category_name}
                        </Text>
                    }
                    
                    <Text numberOfLines={5} style={styles.note}>
                        {this.props.item.note}
                    </Text>

                </View>
                
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(CardHeaderFooterExample)


const styles = StyleSheet.create({
    parentView: {
        borderRadius: 10,
        flex: 1,
        margin: 15,
    },
    date: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    title: {
      color: 'white',
      fontSize: 23,
      fontWeight: 'bold',
      marginTop: 10,
    },
    category: {
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold'
    },
    note: {
        color: 'white',
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    popUp: {
        backgroundColor: 'white',
        width: '70%',
        alignSelf: 'center',
        elevation: 20,
        borderRadius: 5,
        paddingVertical: 15,
        top: '35%',
    },
    button: {
        flexDirection: 'row', 
        alignSelf: 'flex-end',
        marginTop: 20,
        right: 20,
    },
    close: {
        fontSize: 20,
        color: 'grey',
        fontWeight:'bold',
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    sure: {
        fontSize: 20,
        color: 'white',
        fontWeight:'bold',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: 'red',
        borderRadius: 10,
        marginRight: 5,
    },
    text: {
        fontSize: 20,
        padding: 25,
        fontWeight: 'bold'
    }
})