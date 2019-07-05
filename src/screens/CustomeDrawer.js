import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	StyleSheet,
	FlatList,
	Modal,
	StatusBar,
	TextInput
} from 'react-native';

import { connect } from 'react-redux';

import { getCategory, postCategory } from '../public/redux/action/category';
import { getNotes } from '../public/redux/action/notes';

// Components
import CategoryList from '../components/CategoryList'



class CustomeDrawer extends Component {
	state = {
		modalVisible: false,
		category_name: '',
		image_url: ''
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	fetchData = () => {
		this.props.dispatch(getCategory())
	}

	componentDidMount = () => {
		this.fetchData();
	}

	categoryChange = (value) => {
		this.setState({
			category_name: value
		})
	}

	imageUrlChange = (value) => {
		this.setState({
			image_url: value
		})
	}

	addCategory = () => {
		this.props.dispatch(postCategory({
			category_name: this.state.category_name,
			image_url: this.state.image_url
		}))
		this.setModalVisible(!this.state.modalVisible)
	}

	render () {
		return (
			<ScrollView>
				<Image 
					style={styles.profilePicture}
					source={require('../assets/profile-picture.jpeg')}
				/>
				<FlatList 
					data={this.props.category.data}
					style={styles.flatList}
					keyExtractor={(item) => item.id.toString()}
					refreshing={this.props.category.isLoading}
					onRefresh={this.fetchData}
					renderItem={({item}) => {
						return(
							<CategoryList navigation={this.props.navigation} item={item} />
						)
					}}
				/>
				<TouchableOpacity onPress={() => {this.setModalVisible(true)}} style={styles.addCategory}>
					<Image 
					source={require('../assets/icons/plus.png')}
					/>
					<Text style={styles.textAdd}>Add Category</Text>
				</TouchableOpacity>

				<Modal
		          animationType="fade"
		          transparent={true}
		          visible={this.state.modalVisible}
		          onRequestClose={() => {
		            this.setModalVisible(!this.state.modalVisible);
		          }}>
		          <StatusBar backgroundColor="black" barStyle="dark-content" />
		          	<View style={styles.popUp}>
		              <TextInput style={styles.categoryInput} onChangeText={this.categoryChange} placeholder="Category Name" />
		              <TextInput style={styles.categoryInput} onChangeText={this.imageUrlChange} placeholder="ImageUrl" />
		              <View style={styles.button}>
		              		<TouchableOpacity
				                onPress={this.addCategory}>
				                <Text style={styles.add}>Add</Text>
			              	</TouchableOpacity>
		              		<TouchableOpacity
				                onPress={() => {
				                  this.setModalVisible(!this.state.modalVisible);
				                }}>
				                <Text style={styles.close}>close</Text>
			              	</TouchableOpacity>
		              </View>
		            </View>
		        </Modal>

			</ScrollView>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

export default connect(mapStateToProps)(CustomeDrawer);

const styles = StyleSheet.create({
	profilePicture: {
		width: 150,
		height: 150,
		alignSelf: 'center',
		marginTop: 20,
		borderRadius: 100,
	},
	flatList: {
		marginTop: 40,
	},
	addCategory: {
		paddingLeft: 40,
		marginVertical: 15,
		flexDirection: 'row'
	},
	textAdd: {
		color: 'black',
		fontSize: 20,
		fontWeight: 'bold',
		left: 20,
		bottom: 2
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
		paddingHorizontal: 10
	},
	add: {
		fontSize: 20,
		color: 'black',
		fontWeight:'bold',
		paddingHorizontal: 10
	},
	categoryInput: {
		borderBottomWidth: 2,
		borderBottomColor: '#00D4AA',
		marginHorizontal: 40,
		fontSize: 17,
		padding: 15,
	}
})