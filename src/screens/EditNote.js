import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Picker,
	StyleSheet,
	Image,
	ScrollView
} from 'react-native'

import { connect } from 'react-redux';

import { getCategory } from '../public/redux/action/category';
import { patchNote } from '../public/redux/action/notes';


class EditNote extends Component {
	constructor (props) {
		super(props)
		this.state = {
			id: this.props.navigation.state.params.id,
			title: this.props.navigation.state.params.title,
			note: this.props.navigation.state.params.note,
			category_id: this.props.navigation.state.params.category_id,
		}
	}

	titleChange = (value) => {
		this.setState({
			title: value
		})
	}

	noteChange = (value) => {
		this.setState({
			note: value
		})
	}

	editNote = () => {
		if (this.state.category_id != null) {

			this.props.dispatch(patchNote(this.state))

			this.props.navigation.goBack()

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
						<Text style={{fontSize: 20, fontWeight: 'bold'}}>Edit Note</Text>
					</View>
					<TouchableOpacity onPress={this.editNote} style={styles.right}>
						<Image source={require('../assets/icons/checked.png')} />
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.ParentView}>
					<TextInput
						style={styles.title} 
						value={this.state.title}
						onChangeText={this.titleChange}
						placeholder="ADD TITLE ..." 
					/>
					<TextInput 
						style={styles.description}
						value={this.state.note}
						multiline= {true}
						numberOfLines={10}
						onChangeText={this.noteChange}
						placeholder="ADD DESCRIPTION ..." 
					/>
					<Picker
					  selectedValue={this.state.category_id}
					  style={{width: '100%'}}
					  onValueChange={(itemValue, itemIndex) =>
					    this.setState({
					    	category_id: itemValue,
					    })
					  }>
					  <Picker.Item key={null} label="select category..." value={null} />
					  {
					  	this.props.category.data.map((item) => {
					  		return(
					  			<Picker.Item key={item.id} label={item.category_name} value={item.id} />
					  		)
					  	})
					  }
					</Picker>
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

export default connect(mapStateToProps)(EditNote)

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