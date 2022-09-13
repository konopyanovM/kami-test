import { FC } from 'react'

interface HorizontalRuleProps {
  margin?: number
  unit?: string
}

const HorizontalRule: FC<HorizontalRuleProps> = ({
  margin = 0,
  unit = 'px',
}) => {
  return <hr style={{ margin: `${margin}${unit} 0px` }} />
}

export default HorizontalRule
