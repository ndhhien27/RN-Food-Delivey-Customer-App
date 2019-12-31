import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import { image } from '../constants/images';

export default class SliderEntry extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		even: PropTypes.bool,
		parallax: PropTypes.bool,
		parallaxProps: PropTypes.object
	};

	get image() {
		const { data: { img_url }, parallax, parallaxProps, even } = this.props;

		return parallax ? (
			<ParallaxImage
				source={{ uri: img_url }}
				containerStyle={styles.imageContainer}
				style={styles.image}
				parallaxFactor={0.4}
				{...parallaxProps}
			/>
		) : (
				<Image
					source={{ uri: img_url }}
					style={styles.image}
				/>
			);
	}

	render() {
		const { data: { name, position }, even, onPress } = this.props;

		const uppercaseTitle = name ? (
			<Text
				style={styles.title}
				numberOfLines={1}
			>
				{name.toUpperCase()}
			</Text>
		) : false;

		return (
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.slideInnerContainer}
				onPress={onPress}
			>
				{/* <View style={styles.shadow} /> */}
				<View style={styles.imageContainer}>
					{this.image}
					{/* <View style={styles.radiusMask} /> */}
				</View>
				<View style={styles.textContainer}>
					{uppercaseTitle}
					<Text
						style={styles.subtitle}
						numberOfLines={1}
					>
						{position.address}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}