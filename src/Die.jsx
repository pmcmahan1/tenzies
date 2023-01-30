import React, { useState, useEffect } from 'react'

export default function Die(props) {
    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "#F5F5F5"
    }
    return (
        <div className="die" style={styles} onClick={props.holdDice}>{props.value}</div>
    )
}