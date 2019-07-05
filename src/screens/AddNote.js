import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Picker,
	StyleSheet,
	Button,
	Image,
	ScrollView
} from 'react-native'

import { connect } from 'react-redux';

import { getCategory } from '../public/redux/action/category';
import { postNote } from '../public/redux/action/notes';


class AddNote extends Component {
	constructor (props) {
		super(props)
		this.state = {
			title: '',
			note: '',
			category_id: '',
		}
	}


	componentDidMount = () => {
		this.setState({
			category: this.props.category.data
		})
	}

	titleChange = (value) => {
		this.setState({
			title: value,
		})
	}

	noteChange = (value) => {
		this.setState({
			note: value,
		})
	}

	addNote = () => {
		if (this.state.category_id != 0) {

			this.props.dispatch(postNote({
				id: 109,
				title: this.state.title,
				note: this.state.note,
				category_id: this.state.category_id
			}));

			this.props.navigation.goBack();

		} else {
			this.setState({
				validateCategory: 'PLease Select the Category First!'
			})
		}
	}

	render() {
		return(
			<View>
				<View style={styles.header}>
					<TouchableOpacity style={styles.left} onPress={() => this.props.navigation.goBack()}>
						<Image source={require('../assets/icons/left-arrow.png')} />
					</TouchableOpacity>
					<View style={styles.center}>
						<Text style={{fontSize: 20, fontWeight: 'bold'}}>Add Note</Text>
					</View>
					<TouchableOpacity style={styles.right} onPress={this.addNote}>
						<Image source={require('../assets/icons/checked.png')} />
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.ParentView}>
					<TextInput
						style={styles.title} 
						onChangeText={this.titleChange}
						placeholder="ADD TITLE ..." 
					/>
					<TextInput 
						style={styles.description}
						onChangeText={this.noteChange}
						multiline= {true}
						numberOfLines={10}
						placeholder="ADD DESCRIPTION ..." 
					/>
					<Text style={{fontSize: 18, color: 'red', marginLeft: 10}}>{this.state.validateCategory}</Text>
					<Picker
					  selectedValue={this.state.category_id}
					  style={{width: '100%'}}
					  onValueChange={(itemValue, itemIndex) =>
					    this.setState({
					    	category_id: itemValue,
					    })
					  }>
					  <Picker.Item key={0} label="select category..." value={0} />
					  {
					  	this.props.category.data.map((item) => {
					  		return(
					  			<Picker.Item key={item.id} label={item.category_name} value={item.id} />
					  		)
					  	})
					  }
					</Picker>
					<View style={{height: 100}} />
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		category: state.category
	}
}

export default connect(mapStateToProps)(AddNote)

const styles = StyleSheet.create({
	ParentView: {
		padding: 30,
	},
	title:{
		fontSize: 20,
		textAlignVertical: 'top'
	},
	description: {
		fontSize: 20,
		textAlignVertical: 'top'
	},
	picker: {
		height: 50, 
		width: 200,
		top: 10,
		borderWidth: 1,
	},
	header: {
		height: 60, 
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		backgroundColor: 'white',
		elevation: 7
	},
	center: {
		flex: 1, 
		alignItems: 'center',
	},
	left: {
		flex: 1,
	},
	right: {
		flex: 1,
		alignItems: 'flex-end',
	}
})