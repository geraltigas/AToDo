import { Close, Fullscreen, FullscreenExit, Minimize } from '@mui/icons-material';
import React from 'react';
import styles from './Head.module.css';
import { closeWindow, maximizeWindow, minimizeWindow, moveWindow, unmaximizeWindow } from '../../consumer/WindowCON';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFullscreen } from '../../state/windowSlice';
import { RootState } from '../../store/store';

let active = false;
let currentX: number;
let currentY: number;
let initialX: number;
let initialY: number;
let xOffset = 0;
let yOffset = 0;


export default function Head() {
  const minimize = () => {
    minimizeWindow();
  };

  const fullscreen = useSelector((state: RootState) => state.window.fullscreen);
  const dispatch = useDispatch();

  const maximize = () => {
    if (!fullscreen) {
      dispatch(toggleFullscreen());
      maximizeWindow();
    } else {
      dispatch(toggleFullscreen());
      unmaximizeWindow();
    }
  };

  const close = () => {
    closeWindow();
  };

  const dragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    active = true;
  };

  const dragEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    initialX = currentX;
    initialY = currentY;
    active = false;
  };

  const drag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (active) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      xOffset = currentX;
      yOffset = currentY;
      moveWindow(currentX, currentY);
    }
  };

  return (
    <div
      className={styles.header}
      onDoubleClick={maximize}
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={drag}
      onMouseLeave={dragEnd}
    >
      <div className={styles.icon} onClick={minimize}>
        <Minimize fontSize='large' color='action' />
      </div>
      <div className={styles.icon} onClick={maximize}>
        {!fullscreen ? (
          <Fullscreen fontSize='large' color='action' />
        ) : (
          <FullscreenExit fontSize='large' color='action' />
        )}
      </div>
      <div className={styles.icon} onClick={close}>
        <Close fontSize='large' color='action' />
      </div>
    </div>
  );
}
