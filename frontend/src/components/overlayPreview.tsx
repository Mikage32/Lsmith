import { Carousel } from '@mantine/carousel'
import { Box, Center, CloseButton, Flex, Table, Text } from '@mantine/core'
import { useState } from 'react'

import { GeneratedImage } from '~/types/generatedImage'

interface Props {
  images: GeneratedImage[]
  initialIndex: number
  onClose: () => void
}

const OverlayPreview = ({ images, initialIndex, onClose }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [currentInfo, setCurrentInfo] = useState(images[initialIndex].info)

  const onSlideChange = (index: number) => {
    setCurrentIndex(index)
    setCurrentInfo(images[index].info)
  }

  return (
    <Box
      pos={'absolute'}
      top={0}
      left={0}
      w={'100%'}
      h={'100%'}
      opacity={1}
      sx={{
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
        overflow: 'hidden',
      }}
      tabIndex={0}
      onLoad={(e) => {
        e.currentTarget.focus()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }}
    >
      <Flex h={'100vh'} w={'100%'}>
        <Carousel
          w={'100%'}
          my={'auto'}
          slideSize={'80%'}
          slideGap={'md'}
          initialSlide={initialIndex}
          withIndicators
          sx={{
            overflowY: 'hidden',
          }}
          onSlideChange={onSlideChange}
          loop
        >
          {images.map((image) => {
            return (
              <Carousel.Slide key={image.url}>
                <Center h={'100%'}>
                  <img
                    src={image.url}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Center>
              </Carousel.Slide>
            )
          })}
        </Carousel>
        <Box h={'100%'} w={'480px'} bg={'dark'}>
          <Text size={'lg'} weight={'bold'} p={'md'}>
            Information
          </Text>
          <Table horizontalSpacing={'md'} verticalSpacing={'sm'} fontSize={'md'}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(currentInfo).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{String(value) == '' ? 'none' : value}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Box>
      </Flex>
      <CloseButton
        variant={'filled'}
        title={'Close previews'}
        iconSize={16}
        pos={'absolute'}
        top={0}
        left={0}
        m={'md'}
        onClick={onClose}
      />
    </Box>
  )
}

export default OverlayPreview
