import React, { Component } from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	TextInput,
	FlatList,
	TouchableOpacity,
	Image,
	Modal,
	StatusBar,
	ActivityIndicator
} from 'react-native';

import _ from 'lodash'

import { connect } from 'react-redux';

import { getNotes, getMoreNotes, getNotesByCategory } from '../public/redux/action/notes';

// Components
import NoteCard from '../components/card';


class Home extends Component {

	constructor() {
		super()

		this.state = {
			modalVisible: false,
			sort: 'DESC',
			search: '',
		}

	}

	setModalVisible(visible) {

	    this.setState({
	    	modalVisible: visible
	    });

	}

	handleNavigation = () => {

		this.props.navigation.navigate('AddNote')

	}

	

	refresh = () => {

		this.setState({
			sort: 'DESC',
			page: 1,
		})

		setTimeout(() => {this.fetchData()}, 100)
	}

	componentDidMount = () => {

		this.fetchData();

	}

	fetchData = () => {

		this.props.dispatch(getNotes({
			sort: this.state.sort,
			search: this.state.search,
			page: 1
		}))

	}

	fetchDataByCategory = () => {

		this.props.dispatch(getNotesByCategory({

			category_id: this.props.notes.category_id,
			sort: this.state.sort,
			search: this.state.search,

		}))
	}


	search = (value) => {

		this.setState({
			search: value
		})

		if (this.props.notes.category_id == null) {

			this.fetchData();
		} else {

			this.fetchDataByCategory();
		}

	}

	getMoreNotes = () => {

		if (this.props.notes.category_id == null) {

			if (this.props.notes.info.page < this.props.notes.info.totalPage) {

				setTimeout(() => {
					this.props.dispatch(getMoreNotes({
						sort: this.state.sort,
						search: this.state.search,
						page: this.props.notes.info.page + 1
					}))
				}, 50)

			} 

		} else {

			this.fetchDataByCategory();
		}

	}

	changeSort = (sort) => {

		this.setState({
			sort: sort,
		})

		if (this.props.notes.category_id == null) {

			setTimeout(() => {this.fetchData()}, 100)

		} else {

			setTimeout(() => {this.fetchDataByCategory()}, 100)
		}

		this.setModalVisible(!this.state.modalVisible)

	}

	bottomLoading = () => {
		return(
			<View>
				{
					(this.props.notes.info.page < this.props.notes.info.totalPage) ?

						<ActivityIndicator size="large" color="green" />
					:

					<View />
				}
			</View>
		)
	}

	render () {
		return (
			<View style={styles.parentView}>

				<StatusBar backgroundColor="white" barStyle="dark-content" />
				<View style={styles.header}>
					<TouchableOpacity style={styles.left} onPress={() => {this.props.navigation.openDrawer()}}>
						<Image
							style={styles.profilePicture} 
							source={require('../assets/profile-picture.jpeg')}
						/>
					</TouchableOpacity>
					<View style={styles.center}>
						<Text style={{fontSize: 20, fontWeight: 'bold'}}>Notes-App</Text>
					</View>
					<View style={styles.right}>
						<TouchableOpacity 
				    		style={{marginRight: 15}}
				    		onPress={() => {this.setModalVisible(true)}}
				    		>
				    		<Image 
				    			source={require('../assets/icons/download.png')}
				    		/>
				    	</TouchableOpacity>
					</View>
				</View>

				
				<TextInput 
					style={styles.search}
					onChangeText={_.debounce(this.search, 400)}
					placeholder="search..."
				/>
				{
					this.props.notes.isError ?
						
						<Text style={{fontSize: 20, alignSelf: 'center', top: 20}}>Try Again Later!</Text>

					:

					<FlatList 
						style={styles.flatList}
						data={this.state.search == '' ? this.props.notes.data : this.props.notes.searchResult}
						numColumns={2}
						keyExtractor={(item) => item.id.toString()}
						refreshing={this.props.notes.isLoading}
						onRefresh={this.refresh}
						onEndReachedThreshold={0.2}
						onEndReached={this.getMoreNotes}
						ListFooterComponent={this.bottomLoading}
						renderItem={({item}) => {
							return(
								<NoteCard item={item} navigation={this.props.navigation} />
							)
						}}
					/>

				}
				<TouchableOpacity 
					style={styles.actionButton}
					onPress={this.handleNavigation}
				>
					<Text style={styles.actionButtonLogo}>+</Text>
				</TouchableOpacity>


				<Modal
			          animationType="fade"
			          transparent={true}
			          visible={this.state.modalVisible}
			          onRequestClose={() => {
			            this.setModalVisible(!this.state.modalVisible);
			          }}>
			          <View style={styles.popUp}>
			          		<StatusBar backgroundColor="black" barStyle="dark-content" />
			              <TouchableOpacity
			                onPress={() => {
			                  this.changeSort('ASC')
			                }}>
			                <Text style={styles.text}>ASCENDING</Text>
			              </TouchableOpacity>

			              <TouchableOpacity
			                onPress={() => {
			                  this.changeSort('DESC')
			                }}>
			                <Text style={styles.text}>DESCENDING</Text>
			              </TouchableOpacity>

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

export default connect(mapStateToProps)(Home);



const styles = StyleSheet.create({
	parentView: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		position: 'relative'
	},
	search: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 30,
		backgroundColor: 'white',
		elevation: 4,
		borderRadius: 50,
		paddingHorizontal: 25,
		fontSize: 20,
	},
	flatList: {
		marginTop: 20,
	},
	actionButton: {
		width: 70,
		height: 70,
		backgroundColor: 'white',
		borderRadius: 100, 
		position: 'absolute',
		elevation: 10,
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 30,
		right: 30
	},
	actionButtonLogo: {
		fontSize: 30,
		fontWeight:'bold'
	},
	isLoading: {
		marginTop: 100,
	},
	isError: {
		alignSelf: 'center',
		fontSize: 20,
		marginTop: 100,
	},
	header: {
		height: 60, 
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 0,
		backgroundColor: 'white',
		elevation: 7
	},
	profilePicture: {
		width: 35,
		height: 35,
		borderRadius: 100,
		marginLeft: 15,
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
	},
	popUp: {
		backgroundColor: 'white',
		width: 'auto',
		top: 50,
		right: 20,
		elevation: 10,
		alignSelf: 'flex-end',
		borderRadius: 5,
		paddingVertical: 15
	},
	text: {
		fontSize: 20,
		color: 'black',
		marginHorizontal: 20,
		marginVertical: 10
	}
})