import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'
import './IconButton.scss'

interface IconButtonProps {
  height: number
  width?: number
  icon?: string
  title: string
  borderRadius?: string
  boxShadow?: string
  bgColor: string
  bgIconColor?: string
  onClickHandler?: () => void
}

export default function IconButton(props: IconButtonProps) {
  return (
    <div
      className={`IconButton p-0 d-flex justify-content-start hvr-sweep-to-right`}
      style={{
        width: props.width ? props.width : '100%',
        boxShadow: props.boxShadow ? props.boxShadow : 'none',
        borderRadius: props.borderRadius ? props.borderRadius : '0px',
        backgroundColor: props.bgColor,
        height: props.height,
      }}
      onClick={() => props.onClickHandler && props.onClickHandler()}
    >
      {props.icon && (
        <div
          className="IconButton__icon d-flex justify-content-center align-items-center"
          style={{
            width: props.height*1.2,
            height: props.height,
            backgroundColor: props.bgIconColor ? props.bgIconColor : props.bgColor,
          }}
        >
          <img className="img-fluid" src={`${props.icon}`} alt={`${props.title}`} />
        </div>
      )}
      <div className="IconButton__title d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
        {props.title}
      </div>
    </div>
  )
}
