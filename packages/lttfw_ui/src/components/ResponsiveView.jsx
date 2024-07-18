import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

export default function ResponsiveView(props) {
  const { src, style } = props
  const scaleUp = true
  const zoomFactor = 8

  const [status, setStatus] = React.useState(null)
  const [container, setContainer] = React.useState(null)

  const [containerWidth, setContainerWidth] = React.useState(0)
  const [containerHeight, setContainerHeight] = React.useState(0)

  const [imageNaturalWidth, setImageNaturalWidth] = React.useState(0)
  const [imageNaturalHeight, setImageNaturalHeight] = React.useState(0)

  const imageScale = React.useMemo(() => {
    console.debug({
      containerWidth,
      containerHeight,
      imageNaturalWidth,
      imageNaturalHeight
    })

    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageNaturalWidth === 0 ||
      imageNaturalHeight === 0
    ) {
      return 0
    }

    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight
    )
    console.debug(scale)
    return scaleUp ? scale : Math.max(scale, 1)
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight
  ])

  const handleResize = React.useCallback(() => {
    if (container !== null) {
      const rect = container.getBoundingClientRect()
      setContainerWidth(rect.width)
      setContainerHeight(rect.height)
    } else {
      setContainerWidth(0)
      setContainerHeight(0)
    }
  }, [container])

  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const handleImageOnLoad = (image) => {
    console.debug(image)

    if (image.naturalWidth === 0 || image.naturalHeight === 0) {
      setStatus('unsupported')
    }
    setImageNaturalWidth(image.naturalWidth)
    setImageNaturalHeight(image.naturalHeight)
  }

  React.useEffect(() => {
    const image = new Image()
    image.onload = () => handleImageOnLoad(image)
    image.src = src
  }, [src])

  const laodingSX = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
  const unsupportedSX = {
    width: '100%',
    height: '100%',

    '& .bg-image': {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    }
  }
  return (
    <div style={style} ref={(el) => setContainer(el)}>
      { status === 'unsupported' ? 
        <Box sx={unsupportedSX}>
          <Box className="bg-image"style={{backgroundImage: `url(${src})`}}></Box>
        </Box> : 
        imageScale > 0 ?
        <TransformWrapper
          initialScale={imageScale}
          minScale={imageScale}
          maxScale={imageScale * zoomFactor}
          centerOnInit={true}
        >
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <img src={src} />
          </TransformComponent>
        </TransformWrapper>
       :
        <Box sx={laodingSX}>
          <CircularProgress />
        </Box>
      }
    </div>
  )
}
