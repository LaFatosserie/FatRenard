import { styled } from "@nextui-org/react";

export const IconButton = styled('button', {
  background: 'transparent',
  border: 'none',
  padding: 10,
  margin: 0,
  borderRadius: '$rounded',
  cursor: 'pointer',
  zIndex: 2,
  '&:hover': {
    opacity: 0.8,
    backgroundColor: 'LightGray'
  }
})