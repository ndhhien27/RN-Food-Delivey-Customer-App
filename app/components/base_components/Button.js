import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

import { image } from '../../constants/images'

export function Button(props) {

  const { type } = props
  return (
    <TouchableOpacity>
      <Image source={image[type]} style={{ width: 25, height: 25 }} />
    </TouchableOpacity>
  )
}