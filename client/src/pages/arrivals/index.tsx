import Taro, { useEffect } from '@tarojs/taro'
import { View, Text, Canvas } from '@tarojs/components'
import { TagCanvas } from '@/utils/tagcanvas'

export default () => {
  useEffect(() => {
    TagCanvas.Start('myCanvas', 'tags', {
      textColour: '#ff0000',
      outlineColour: '#ff00ff',
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.05
    })
  })
  return (
    <View>
      <Text>arrivals....</Text>
      <Canvas canvasId="myCanvas">
        <Text>Anything in here will be replaced on browsers that support the canvas element</Text>
      </Canvas>
    </View>
  )
}
