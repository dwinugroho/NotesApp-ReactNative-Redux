import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
	Modal,
	StatusBar
} from 'react-native'

import { connect } from 'react-redux';

import { getNotesByCategory, getNotes } from '../public/redux/action/notes';
import { deleteCategory } from '../public/redux/action/category';

class CategoryList extends Component {

	constructor () {
		super ()
		this.state = {
			modalVisible: false,
		}
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	deleteCategory = () => {

    	this.props.dispatch(deleteCategory({

    		category_id: this.props.item.id
    	}))

    	setTimeout(() => {

    		this.props.dispatch(getNotes({
    			sort: 'DESC',
    			search: '',
    		}));

    	},100)

    	this.setModalVisible(false)

    	this.props.navigation.closeDrawer();
    }

    

    getNotesByCategory = () => {
    	this.props.dispatch(getNotesByCategory({
    		category_id: this.props.item.id,
    		sort: 'DESC',
    		search: ''
    	}))
    	this.props.navigation.closeDrawer();
    }



	render() {
		return(
			<View>
				<TouchableOpacity onLongPress={() => {this.setModalVisible(true)}} onPress={this.getNotesByCategory} style={styles.parentView}>
					<Image 
						style={{width: 25, height: 25}}
						source={{uri: this.props.item.image_url}}
					/>
					<Text style={styles.text}>{this.props.item.category_name}</Text>
				</TouchableOpacity>

				<Modal
		          animationType="fade"
		          transparent={true}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            this.setModalVisible(!this.state.modalVisible);
		          }}>
		          	<View style={styles.popUp}>

		          	<Text style={styles.confirm}>Are you sure want to delete Category ?</Text>
		              
		              <View style={styles.button}>

		              		<TouchableOpacity
				                onPress={this.deleteCategory}>
				                <Text style={styles.add}>Yes</Text>
			              	</TouchableOpacity>
		              		<TouchableOpacity
				                onPress={() => {
				                  this.setModalVisible(!this.state.modalVisible);
				                }}>
				                <Text style={styles.close}>No</Text>
			              	</TouchableOpacity>
		              </View>
		            </View>
		        </Modal>

			</View>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

export default connect(mapStateToProps)(CategoryList);

const styles = StyleSheet.create({
	parentView: {
		paddingLeft: 40,
		marginVertical: 15,
		flexDirection: 'row'
	},
	text: {
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold',
		left: 20,
	},
	popUp: {
		backgroundColor: 'white',
		width: '70%',
		alignSelf: 'center',
		elevation: 20,
		borderRadius: 5,
		paddingVertical: 15,
		top: '30%',
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
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
	add: {
		fontSize: 20,
		color: 'black',
		fontWeight:'bold',
		paddingHorizontal: 20,
		paddingVertical: 5,
		backgroundColor: 'red',
		color: 'white',
		borderRadius: 10,
	},
	confirm: {
		fontSize: 20,
		paddingVertical: 30,
		paddingHorizontal: 30,
		fontWeight: 'bold'

	}
})