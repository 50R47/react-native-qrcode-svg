import React, { useMemo } from 'react'
import Svg, {
  Defs,
  G,
  Path,
  Rect,
  Image,
  ClipPath,
  LinearGradient,
  Stop
} from 'react-native-svg'
import genMatrix from './genMatrix'
import transformMatrixIntoPath from './transformMatrixIntoPath'
import transformMatrixIntoCirclePath from './transformMatrixIntoCirclePath'

const renderLogo = ({
  size,
  logo,
  logoSize,
  logoBackgroundColor,
  logoMargin,
  logoBorderRadius
}) => {
  const logoPosition = (size - logoSize - logoMargin * 2) / 2
  const logoBackgroundSize = logoSize + logoMargin * 2
  const logoBackgroundBorderRadius =
    logoBorderRadius + (logoMargin / logoSize) * logoBorderRadius

  return (
    <G x={logoPosition} y={logoPosition}>
      <Defs>
        <ClipPath id='clip-logo-background'>
          <Rect
            width={logoBackgroundSize}
            height={logoBackgroundSize}
            rx={logoBackgroundBorderRadius}
            ry={logoBackgroundBorderRadius}
          />
        </ClipPath>
        <ClipPath id='clip-logo'>
          <Rect
            width={logoSize}
            height={logoSize}
            rx={logoBorderRadius}
            ry={logoBorderRadius}
          />
        </ClipPath>
      </Defs>
      <G>
        <Rect
          width={logoBackgroundSize}
          height={logoBackgroundSize}
          fill={logoBackgroundColor}
          clipPath='url(#clip-logo-background)'
        />
      </G>
      <G x={logoMargin} y={logoMargin}>
        <Image
          width={logoSize}
          height={logoSize}
          preserveAspectRatio='xMidYMid slice'
          href={logo}
          clipPath='url(#clip-logo)'
        />
      </G>
    </G>
  )
}

const QRCode = ({
  value = 'this is a QR code',
  size = 100,
  color = 'black',
  backgroundColor = 'white',
  logo,
  logoSize = size * 0.2,
  logoBackgroundColor = 'transparent',
  logoMargin = 2,
  logoBorderRadius = 0,
  quietZone = 0,
  enableLinearGradient = false,
  gradientDirection = ['0%', '0%', '100%', '100%'],
  linearGradient = ['rgb(255,0,0)', 'rgb(0,255,255)'],
  ecl = 'M',
  mode = 'default',
  getRef,
  onError
}) => {
  const result = useMemo(() => {
    try {
      if (mode === 'default') {
        return transformMatrixIntoPath(genMatrix(value, ecl), size)
      } else {
        return transformMatrixIntoCirclePath(genMatrix(value, ecl), size)
      }
    } catch (error) {
      if (onError && typeof onError === 'function') {
        onError(error)
      } else {
        // Pass the error when no handler presented
        throw error
      }
    }
  }, [value, size, ecl])

  if (!result) {
    return null
  }

  const { path, cellSize } = result

  return (
    <Svg
      ref={getRef}
      viewBox={[
        -quietZone,
        -quietZone,
        size + quietZone * 2,
        size + quietZone * 2
      ].join(' ')}
      width={size}
      height={size}
    >
      <Defs>
        <LinearGradient
          id='grad'
          x1={gradientDirection[0]}
          y1={gradientDirection[1]}
          x2={gradientDirection[2]}
          y2={gradientDirection[3]}
        >
          <Stop offset='0' stopColor={linearGradient[0]} stopOpacity='1' />
          <Stop offset='1' stopColor={linearGradient[1]} stopOpacity='1' />
        </LinearGradient>
      </Defs>
      <G>
        <Rect
          x={-quietZone}
          y={-quietZone}
          width={size + quietZone * 2}
          height={size + quietZone * 2}
          fill={backgroundColor}
        />
      </G>
      <G>
        <Path
          d={path}
          fill={enableLinearGradient ? 'url(#grad)' : color}
          strokeLinecap='butt'
          stroke={enableLinearGradient ? 'url(#grad)' : color}
          strokeWidth={mode === 'default' ? cellSize : 0}
        />
      </G>

      <Rect
        x={0.5 * cellSize}
        y={0.5 * cellSize}
        width={6 * cellSize}
        height={6 * cellSize}
        strokeWidth={cellSize}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        stroke="rgb(255,0,0)"
      />
      <Rect
        x={2 * cellSize}
        y={2 * cellSize}
        width={3 * cellSize}
        height={3 * cellSize}
        fill="rgb(0,0,255)"
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Rect
        x={0.5 * cellSize}
        y={26.5 * cellSize}
        width={6 * cellSize}
        height={6 * cellSize}
        strokeWidth={cellSize}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        stroke="rgb(255,0,0)"
      />
      <Rect
        x={28 * cellSize}
        y={2 * cellSize}
        width={3 * cellSize}
        height={3 * cellSize}
        fill="rgb(0,0,255)"
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Rect
        x={26.5 * cellSize}
        y={0.5 * cellSize}
        width={6 * cellSize}
        height={6 * cellSize}
        strokeWidth={cellSize}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        stroke="rgb(255,0,0)"
      />
      <Rect
        x={2 * cellSize}
        y={28 * cellSize}
        width={3 * cellSize}
        height={3 * cellSize}
        fill="rgb(0,0,255)"
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Rect
        x={24.5 * cellSize}
        y={24.5 * cellSize}
        width={4 * cellSize}
        height={4 * cellSize}
        strokeWidth={cellSize}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        stroke="rgb(255,0,0)"
      />
      <Rect
        x={25.75 * cellSize}
        y={25.75 * cellSize}
        width={1.5 * cellSize}
        height={1.5 * cellSize}
        fill="rgb(0,0,255)"
      />
      {logo &&
        renderLogo({
          size,
          logo,
          logoSize,
          logoBackgroundColor,
          logoMargin,
          logoBorderRadius
        })}
    </Svg>
  )
}

export default QRCode
