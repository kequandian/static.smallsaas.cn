import React, {useState } from 'react';


/**
 * 
 * @param {color} color 背景，边框，字体颜色
 * @param {minWidth} minWidth 最小宽度
 * @param {solid} solid 深色背景，字体白色
 * @param {outline} outline 有边框，背景半透明
 * @param {outline none} none 同outline ，没有边框线
 * @param {outline plain} plain  同outline， 背景为白色
 * @param {outline dash} dash 同outline， 边框线为虚线
 * @param {circle size} circle 圆形，(size :像素， circle的大小)
 * 
 *
 */


export default function Index(props) {

  const { children, color = '#8e72ff', minWidth,Radius, solid, outline, none, plain, dash, circle,size,onTagClick} = props;


  const bg = solid ? `${color}` :
      outline && plain ? '#ffffff' :
      (outline && none) || (outline && dash) || outline ? `${color}99` : null

  const border = dash && outline ? `2px ${color} dashed` :
    (outline && none) ? null :
      (outline && plain) || outline ? `2px ${color} solid` : null

  const colors = solid ? '#ffffff' : `${color}`

//   const Radius = circle && size  ? '50px': 0

//   const circleWidth = circle && size ? `${size}` : null

//   const circleHeight = circle && size  ? `${size}`: '100%'

    

  const baseStyle = {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '150px',
    backgroundColor: `${bg}`,
    color: `${colors}`,
    border: `${border}`,
    minWidth: `${minWidth}`,
    borderRadius:`${Radius}`,
    // width:`${circleWidth}`,
    // height:`${circleHeight}`
  }

  return (
    <div style={baseStyle} onClick={onTagClick}>
      {
        React.Children.map(children, child => (
          child
        ))
      }
    </div>
  )
}